(function () {
	 'use strict';

	 angular
		  .module('problemDetail')
		  .component('problemDetail', {
				templateUrl: 'app/problem-detail/problem-detail.template.html',
				controller: ['$routeParams', 'Problem',
					 function ProblemDetailController($routeParams, Problem) {
					 var vm = this;

					 activate();

					 function activate() {
						  Problem.get($routeParams.id).then(function (response) {
								vm.problem = response.data;
						  });
					 }
				}]
		  })
})();
