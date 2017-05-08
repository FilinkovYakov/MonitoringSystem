(function () {
	'use strict';

	angular
		 .module('problemClosedList')
		 .component('problemClosedList', {
		 	templateUrl: 'app/problem-list/problem-list.template.html',
		 	controller: ['Problem', function ProblemInDevListController(Problem) {
		 		/* jshint validthis:true */
		 		var vm = this;
		 		vm.title = "Closed problems";

		 		activate();

		 		function activate() {
		 			Problem.getClosedProblems().then(function (response) {
		 				vm.problems = response.data;
		 			});
		 		}
		 	}]
		 });
})();