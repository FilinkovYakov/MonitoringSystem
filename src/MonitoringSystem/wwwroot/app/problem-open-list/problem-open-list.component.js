(function () {
	 'use strict';

	 angular
		  .module('problemOpenList')
		  .component('problemOpenList', {
				templateUrl: 'app/problem-list/problem-list.template.html',
				controller: ['Problem', function ProblemOpenListController(Problem) {
					 /* jshint validthis:true */
					 var vm = this;
					vm.title = "Open problems";

					 activate();

					 function activate() {
					 	Problem.getOpenProblems().then(function (response) {
								vm.problems = response.data;
						  });
					 }
				}]
		  });
})();