(function () {
	'use strict';

	angular
        .module('core.user')
        .factory('User', user);

	user.$inject = ['$http'];

	function user($http) {
		var service = {
			auth: auth,
			regist: regist,
			isAuth: isAuth,
			out: out,
			get: get,
			getAll: getAll
		};

		return service;

		function out() {
			return $http.delete('/api/auth');
		}

		function auth(user) {
			return $http.post('/api/auth', user);
		}

		function get(id) {
			return $http.get('/api/user/' + id);
		}

		function getAll() {
			return $http.get('/api/user');
		}

		function isAuth() {
			return $http.get('/api/auth');
		}

		function regist(user) {
			return $http.post('/api/user', user);
		}
	}
})();