(function () {
    'use strict';

    angular
		  .module('core.problem')
        .factory('Problem', problem);

    problem.$inject = ['$http'];

    function problem($http) {
        var service = {
				getAll: getAll,
				get: get,
				add: add,
				edit: edit,
				remove: remove
        };

        return service;

		  function add(problem) {
				return $http.post('/api/problem', problem);
		  }

		  function getAll() {
				return $http.get('/api/problem');
		  }

		  function edit(id, problem) {
				return $http.put('/api/problem/' + id, problem);
		  }

		  function get(id) {
				return $http.get('/api/problem/' + id);
		  }

		  function remove(id) {
				return $http.delete('/api/problem/' + id)
		  }
    }
})();