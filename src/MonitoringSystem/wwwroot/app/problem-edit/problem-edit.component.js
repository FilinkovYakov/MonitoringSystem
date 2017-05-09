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
				 	vm.errors = {};
				 	vm.problemId = $routeParams.id;

				 	vm.edit = function edit() {
				 		if (isValid()) {
				 			vm.problem.assigneeId = vm.problem.assignee.id;
				 			Problem.edit(vm.problemId, vm.problem)
								.then(function (responce) {
									$location.path('/problem/' + vm.problemId);
								});
				 		}
				 	}

				 	activate();

				 	function activate() {
				 		Problem.get(vm.problemId).then(function (response) {
				 			vm.problem = response.data;
				 			User.getAll().then(function (responce) {
				 				vm.users = responce.data;
				 				vm.problem.assignee = lodash.find(vm.users, function (user) { return user.id === vm.problem.assigneeId; });
				 			});
				 		});
				 	}

				 	function isValid() {
				 		var isvalid = true;

				 		if (vm.problem) {
				 			if (!vm.problem.summary) {
				 				vm.errors.summary = "Summary is required";
				 				isvalid = false;
				 			} else {
				 				vm.errors.summary = "";
				 			}

				 			if (!vm.problem.description) {
				 				vm.errors.description = "Description is required";
				 				isvalid = false;
				 			} else {
				 				vm.errors.description = "";
				 			}

				 			return isvalid;
				 		}

				 		vm.errors.summary = "Summary is required";
				 		vm.errors.description = "Description is required";
				 		return false;
				 	}
				 }]
		 });
})();