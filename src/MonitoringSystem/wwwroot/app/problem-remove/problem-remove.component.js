(function () {
	 'use strict';

	 angular
		  .module('problemRemove')
		  .component('problemRemove', {
				templateUrl: 'app/problem-remove/problem-remove.template.html',
				controller: ['$location', 'Problem',
					 function ProblemAddController($location, Problem) {
						  /* jshint validthis:true */
						  var vm = this;

						  vm.remove = function remove() {
								Problem.remove($routeParams.id).then(function (responce) {
									 $location.path('/problems');
								});
						  }

						  activate();

						  function activate() {
								Problem.get($routeParams.id).then(function (response) {
									 vm.problem = response.data;
								});
						  }
					 }]
		  });
})();