(function () {
    'use strict';

    angular
		  .module('subtaskListByProblem')
		  .component('subtaskListByProblem', {
		  	templateUrl: 'app/subtask-list-by-problem/subtask-list-by-problem.template.html',
		  	controller: ['$routeParams', 'Subtask',
			function SubtaskListByProblemController($routeParams, Subtask) {
		  		/* jshint validthis:true */
				var vm = this;
				vm.problemId = $routeParams.id;

		  		activate();

		  		function activate() {
		  			Subtask.getByProblemId(vm.problemId).then(function (response) {
		  				vm.subtasks = response.data;
		  			});
		  		}
		  	}]
		  });
})();
