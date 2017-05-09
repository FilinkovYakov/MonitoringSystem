(function () {
	'use strict';

	angular
		  .module('subtaskAdd')
		  .component('subtaskAdd', {
		  	templateUrl: 'app/subtask-add/subtask-add.template.html',
		  	controller: ['$routeParams', '$location', 'Subtask', 'User',
				 function SubtaskAddController($routeParams, $location, Subtask, User) {
				 	/* jshint validthis:true */
				 	var vm = this;
				 	vm.problemId = $routeParams.problemId;
				 	vm.errors = {};

				 	vm.add = function add() {
				 		if (isValid()) {
				 			vm.subtask.assigneeId = vm.subtask.assignee.id;
				 			Subtask.add(vm.problemId, vm.subtask)
								.then(function (responce) {
									$location.path('/problem/' + vm.problemId);
								});
				 		}
				 	}

				 	activate();

				 	function activate() {
				 		User.getAll().then(function (responce) {
				 			vm.users = responce.data;
				 			vm.subtask = {};
				 			vm.subtask.assignee = vm.users[0];
				 		});
				 	}

				 	function isValid() {
				 		var isvalid = true;

				 		if (vm.subtask) {
				 			if (!vm.subtask.summary) {
				 				vm.errors.summary = "Summary is required";
				 				isvalid = false;
				 			} else {
				 				vm.errors.summary = "";
				 			}

				 			if (!vm.subtask.description) {
				 				vm.errors.description = "Description is required";
				 				isvalid = false;
				 			} else {
				 				vm.errors.description = "";
				 			}

				 			if (!vm.subtask.estimatedTime && vm.subtask.estimatedTime !== 0) {
				 				vm.errors.estimatedTime = "Estimated time is required";
				 				isvalid = false;
				 			} else {
				 				vm.errors.estimatedTime = "";
				 			}

				 			if (!vm.subtask.remainingTime && vm.subtask.remainingTime !== 0) {
				 				vm.errors.remainingTime = "Remaining time is required";
				 				isvalid = false;
				 			} else {
				 				vm.errors.remainingTime = "";
				 			}

				 			return isvalid;
				 		}

				 		vm.errors.summary = "Summary is required";
				 		vm.errors.description = "Description is required";
				 		vm.errors.estimatedTime = "Estimated time is required";
				 		vm.errors.remainingTime = "Remaining time is required";
				 		return false;
				 	}
				 }]
		  });
})();