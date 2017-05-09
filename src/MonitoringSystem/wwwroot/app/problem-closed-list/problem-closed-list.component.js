(function () {
	'use strict';

	angular
		 .module('problemClosedList')
		 .component('problemClosedList', {
		 	templateUrl: 'app/problem-list/problem-list.template.html',
		 	controller: ['$location', 'Problem',
			function ProblemInDevListController($location, Problem) {
				/* jshint validthis:true */
				var vm = this;
				vm.title = "Closed problems";

				vm.changeStatus = function changeStatus(id) {
					Problem.changeStatus(id).then(function (response) {
						$location.path('/openProblems');
					});
				};

				activate();

				function activate() {
					Problem.getClosedProblems().then(function (response) {
						vm.problems = response.data;
					});
				}
			}]
		 });
})();