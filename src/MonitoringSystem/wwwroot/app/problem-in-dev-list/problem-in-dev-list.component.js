(function () {
	'use strict';

	angular
		 .module('problemInDevList')
		 .component('problemInDevList', {
		 	templateUrl: 'app/problem-list/problem-list.template.html',
		 	controller: ['Problem', function ProblemInDevListController(Problem) {
		 		/* jshint validthis:true */
		 		var vm = this;
		 		vm.title = "Problems in development";

		 		activate();

		 		function activate() {
		 			Problem.getInDevProblems().then(function (response) {
		 				vm.problems = response.data;
		 			});
		 		}
		 	}]
		 });
})();