(function () {
	'use strict';

	angular
		.module('subtaskDetail')
		.component('subtaskDetail',
		{
			templateUrl: 'app/subtask-detail/subtask-detail.template.html',
			controller: [
				'$routeParams', 'Subtask',
				function SubtaskDetailController($routeParams, Subtask) {
					var vm = this;

					activate();

					function activate() {
						Subtask.get($routeParams.id)
							.then(function (response) {
								vm.subtask = response.data;
							});
					}
				}
			]
		});
})();
