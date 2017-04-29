(function () {
	 'use strict';

	 angular
		  .module('problemEdit')
		  .component('problemEdit', {
				templateUrl: 'app/problem-edit/problem-edit.template.html',
				controller: ['$routeParams', '$location', 'Problem', 'User',
					 function ProblemEditController($routeParams, $location, Problem, User) {
						  /* jshint validthis:true */
						  var vm = this;

						  vm.edit = function edit() {
								Problem.edit($routeParams.id, vm.problem).then(function (responce) {
									 $location.path('/problems');
								});
						  }

						  activate();

						  function activate() {
								Problem.get($routeParams.id).then(function (response) {
									 vm.problem = response.data;
								});

								User.getAll().then(function (responce) {
									 vm.users = responce.data;
								});
						  }
					 }]
		  });
})();