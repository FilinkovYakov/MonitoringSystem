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

				 	vm.add = function add() {
				 		vm.subtask.assigneeId = vm.subtask.assignee.id;
				 		Subtask.add(vm.problemId, vm.subtask).then(function (responce) {
				 			$location.path('/problem/' + vm.problemId);
				 		});
				 	}

				 	activate();

				 	function activate() {
				 		User.getAll().then(function (responce) {
				 			vm.users = responce.data;
				 			vm.subtask = {};
				 			vm.subtask.assignee = vm.users[0];
				 		});
				 	}
				 }]
		  });
})();