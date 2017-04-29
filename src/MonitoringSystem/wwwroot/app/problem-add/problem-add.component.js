(function () {
	 'use strict';

	 angular
		  .module('problemAdd')
		  .component('problemAdd', {
				templateUrl: 'app/problem-add/problem-add.template.html',
				controller: ['$location', 'Problem', 'User',
					 function ProblemAddController($location, Problem, User) {
						  /* jshint validthis:true */
						  var vm = this;

						  vm.add = function add() {
								Problem.add(vm.problem).then(function (responce) {
									 $location.path('/problems');
								});
						  }

						  activate();

						  function activate() {
								User.getAll().then(function (responce) {
									 vm.users = responce.data;
								});
						  }
					 }]
		  });
})();