(function () {
	'use strict';

	angular.module('monitoringSystem')
		 .config(['$provide', '$locationProvider', '$routeProvider',
			   function config($provide, $locationProvider, $routeProvider) {

			   	$routeProvider.
					 when('/auth', {
					 	template: '<user-auth></user-auth>'
					 }).
					 when('/user', {
					 	template: '<user-regist></user-regist>'
					 }).
					 when('/users', {
					 	template: '<user-list></user-list>'
					 }).
					 when('/user/:id', {
					 	template: '<user-detail></user-detail>'
					 }).
					 when('/problems', {
					 	template: '<problem-list></problem-list>'
					 }).
					 when('/problem/add', {
					 	template: '<problem-add></problem-add>'
					 }).
					 when('/problem/edit/:id', {
					 	template: '<problem-edit></problem-edit>'
					 }).
					 when('/problem/remove/:id', {
					 	template: '<problem-remove></problem-remove>'
					 }).
					 when('/problem/:id', {
					 	template: '<problem-detail></problem-detail>'
					 }).
					 when('/subtask/:id', {
					 	template: '<subtask-detail></subtask-detail>'
					 }).
					 when('/subtask/add/:problemId', {
					 	template: '<subtask-add></subtask-add>'
					 }).
					 when('/subtask/edit/:id', {
					 	template: '<subtask-edit></subtask-edit>'
					 }).
					 when('/subtask/remove/:id', {
					 	template: '<subtask-remove></subtask-remove>'
					 }).
					 otherwise({ redirectTo: '/auth' });
			   }
		 ])
		 .run(['$rootScope', '$location', 'User', function ($rootScope, $location, User) {
		 	$rootScope.$on('$locationChangeStart', function (event, next, current) {
		 		var isAuth = false;
		 		User.isAuth().then(function (response) {
		 			isAuth = response.data === true;
		 			if ($location.path() !== '/auth' && $location.path() !== '/user' && !isAuth) {
		 				$location.path('/auth');
		 			}
		 		});
		 	});
		 }]);
})();