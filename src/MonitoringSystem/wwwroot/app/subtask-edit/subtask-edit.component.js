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

				 	vm.edit = function edit() {
				 		vm.subtask.assigneeId = vm.subtask.assignee.id;
				 		Subtask.edit($routeParams.id, vm.subtask).then(function (responce) {
				 			$location.path('/problem/' + vm.subtask.problemId);
				 		});
				 	}

				 	activate();

				 	function activate() {
				 		Subtask.get($routeParams.id).then(function (response) {
				 			vm.subtask = response.data;
				 			User.getAll().then(function (responce) {
				 				vm.users = responce.data;
				 				vm.subtask.assignee = lodash.find(vm.users, function (user) { return user.id === vm.subtask.assigneeId; });
				 			});
				 		});
				 	}
				 }]
		 });
})();