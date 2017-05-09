(function () {
	'use strict';

	angular
		 .module('problemInDevList')
		 .component('problemInDevList', {
		 	templateUrl: 'app/problem-list/problem-list.template.html',
		 	controller: ['$location', 'Problem',
			function ProblemInDevListController($location, Problem) {
		 		/* jshint validthis:true */
		 		var vm = this;
		 		vm.title = "Problems in development";

		 		vm.changeStatus = function changeStatus(id) {
		 			Problem.changeStatus(id).then(function (response) {
		 				$location.path('/closedProblems');
		 			});
		 		};

		 		activate();

		 		function activate() {
		 			Problem.getInDevProblems().then(function (response) {
		 				vm.problems = response.data;
		 			});
		 		}
		 	}]
		 });
})();