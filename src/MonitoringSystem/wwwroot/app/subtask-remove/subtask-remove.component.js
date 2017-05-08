(function () {
    'use strict';

    angular
		.module('subtaskRemove')
		.component('subtaskRemove',
		{
			templateUrl: 'app/subtask-remove/subtask-remove.template.html',
			controller: [
				'$routeParams', '$location', 'Subtask',
				function SubtaskRemoveController($routeParams, $location, Subtask) {
					var vm = this;

					vm.remove = function remove() {
						Subtask.remove($routeParams.id).then(function (responce) {
							$location.path('/problem/' + vm.subtask.problemId);
						});
					}

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