(function () {
	'use strict';

	angular
		  .module('core.problem')
        .factory('Problem', problem);

	problem.$inject = ['$http'];

	function problem($http) {
		var service = {
			getOpenProblems: getOpenProblems,
			getInDevProblems: getInDevProblems,
			getClosedProblems: getClosedProblems,
			get: get,
			add: add,
			edit: edit,
			changeStatus: changeStatus,
			remove: remove
		};

		return service;

		function add(problem) {
			return $http.post('/api/problem', problem);
		}

		function getOpenProblems() {
			return $http.get('/api/problem/openProblems');
		}

		function getInDevProblems() {
			return $http.get('/api/problem/inDevProblems');
		}

		function getClosedProblems() {
			return $http.get('/api/problem/closedProblems');
		}

		function edit(id, problem) {
			return $http.put('/api/problem/' + id, problem);
		}

		function changeStatus(id) {
			return $http.put('/api/problem/changeStatus/' + id);
		}

		function get(id) {
			return $http.get('/api/problem/' + id);
		}

		function remove(id) {
			return $http.delete('/api/problem/' + id);
		}
	}
})();