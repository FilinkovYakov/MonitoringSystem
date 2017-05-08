(function () {
	'use strict';

	angular
		  .module('subtaskListByUser')
		  .component('subtaskListByUser', {
		  	templateUrl: 'app/subtask-list-by-user/subtask-list-by-user.template.html',
		  	controller: ['$routeParams', 'Subtask',
			function SubtaskListByUserController($routeParams, Subtask) {
				/* jshint validthis:true */
				var vm = this;

				activate();

				function activate() {
					Subtask.getByAssigneeId($routeParams.id).then(function (response) {
						vm.subtasks = response.data;
					});
				}
			}]
		  });
})();
