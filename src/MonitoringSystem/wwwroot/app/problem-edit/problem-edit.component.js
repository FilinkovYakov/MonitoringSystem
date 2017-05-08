(function () {
	'use strict';

	angular
		 .module('problemEdit')
		 .component('problemEdit', {
		 	templateUrl: 'app/problem-edit/problem-edit.template.html',
		 	controller: ['$routeParams', '$location', 'lodash', 'Problem', 'User',
				 function ProblemEditController($routeParams, $location, lodash, Problem, User) {
				 	/* jshint validthis:true */
				 	var vm = this;

				 	vm.edit = function edit() {
				 		vm.problem.assigneeId = vm.problem.assignee.id;
				 		Problem.edit($routeParams.id, vm.problem).then(function (responce) {
				 			$location.path('/problems');
				 		});
				 	}

				 	activate();

				 	function activate() {
				 		Problem.get($routeParams.id).then(function (response) {
				 			vm.problem = response.data;
				 			User.getAll().then(function (responce) {
				 				vm.users = responce.data;
				 				vm.problem.assignee = lodash.find(vm.users, function (user) { return user.id === vm.problem.assigneeId; });
				 			});
				 		});
				 	}
				 }]
		 });
})();