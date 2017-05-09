(function () {
	'use strict';

	angular
		 .module('problemAdd')
		 .component('problemAdd', {
		 	templateUrl: 'app/problem-add/problem-add.template.html',
		 	controller: ['$location', 'Problem', 'User',
				 function ProblemAddController($location, Problem, User) {
				 	/* jshint validthis:true */
				 	var vm = this;
				 	vm.errors = {};

				 	vm.add = function add() {
				 		if (isValid()) {
				 			vm.problem.assigneeId = vm.problem.assignee.id;
				 			Problem.add(vm.problem)
								.then(function (responce) {
									$location.path('/openProblems');
								});
				 		}
				 	}

				 	activate();

				 	function activate() {
				 		User.getAll().then(function (responce) {
				 			vm.users = responce.data;
				 			vm.problem = {};
				 			vm.problem.assignee = vm.users[0];
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