(function () {
	 'use strict';

	 angular
		  .module('problemList')
		  .component('problemList', {
				templateUrl: 'app/problem-list/problem-list.template.html',
				controller: ['Problem', function ProblemListController(Problem) {
					 /* jshint validthis:true */
					 var vm = this;

					 activate();

					 function activate() {
						  Problem.getAll().then(function (response) {
								vm.problems = response.data;
						  });
					 }
				}]
		  });
})();