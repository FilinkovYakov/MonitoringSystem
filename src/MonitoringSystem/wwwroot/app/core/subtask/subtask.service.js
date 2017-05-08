(function () {
	'use strict';

	angular
        .module('core.subtask')
        .factory('Subtask', subtask);

	subtask.$inject = ['$http'];

	function subtask($http) {
		var service = {
			get: get,
			getByProblemId: getByProblemId,
			getByAssigneeId: getByAssigneeId,
			add: add,
			edit: edit,
			remove: remove
		};

		return service;

		function get(id) {
			return $http.get('/api/subtask/' + id);
		}

		function getByProblemId(problemId) {
			return $http.get('/api/subtask/problemId/' + problemId);
		}

		function getByAssigneeId(assigneeId) {
			return $http.get('/api/subtask/assigneeId/' + assigneeId);
		}

		function add(problemId, subtask) {
			return $http.post('/api/subtask/' + problemId, subtask);
		}

		function edit(id, subtask) {
			return $http.put('/api/subtask/' + id, subtask);
		}

		function remove(id) {
			return $http.delete('/api/subtask/' + id);
		}
	}
})();
