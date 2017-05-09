(function () {
	'use strict';

	angular
		 .module('subtaskEdit')
		 .component('subtaskEdit', {
		 	templateUrl: 'app/subtask-edit/subtask-edit.template.html',
		 	controller: ['$routeParams', '$location', 'lodash', 'Subtask', 'User',
				 function SubtaskEditController($routeParams, $location, lodash, Subtask, User) {
				 	/* jshint validthis:true */
				 	var vm = this;
				 	vm.subtaskId = $routeParams.id;
				 	vm.errors = {};

				 	vm.edit = function edit() {
				 		if (isValid()) {
				 			vm.subtask.assigneeId = vm.subtask.assignee.id;
				 			Subtask.edit(vm.subtaskId, vm.subtask)
								.then(function (responce) {
									$location.path('/problem/' + vm.subtask.problemId);
								});
				 		}
				 	}

				 	activate();

				 	function activate() {
				 		Subtask.get(vm.subtaskId).then(function (response) {
				 			vm.subtask = response.data;
				 			User.getAll().then(function (responce) {
				 				vm.users = responce.data;
				 				vm.subtask.assignee = lodash.find(vm.users, function (user) { return user.id === vm.subtask.assigneeId; });
				 			});
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
				 		vm.errors.remainingTime = "Remaining time is required";
				 		return false;
				 	}
				 }]
		 });
})();