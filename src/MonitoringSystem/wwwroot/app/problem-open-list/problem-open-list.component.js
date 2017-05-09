(function () {
	'use strict';

	angular
		 .module('problemOpenList')
		 .component('problemOpenList', {
		 	templateUrl: 'app/problem-list/problem-list.template.html',
		 	controller: ['$location', 'Problem',
			function ProblemOpenListController($location, Problem) {
				/* jshint validthis:true */
				var vm = this;
				vm.title = "Open problems";

				vm.changeStatus = function changeStatus(id) {
					Problem.changeStatus(id).then(function (response) {
						$location.path('/inDevProblems');
					});
				};

				activate();

				function activate() {
					Problem.getOpenProblems().then(function (response) {
						vm.problems = response.data;
					});
				}
			}]
		 });
})();