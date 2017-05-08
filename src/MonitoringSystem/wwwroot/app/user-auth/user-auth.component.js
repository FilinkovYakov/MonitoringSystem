(function () {
    'use strict';

	 angular
		  .module('userAuth')
		  .component('userAuth', {
				templateUrl: 'app/user-auth/user-auth.template.html',
				controller: ['$location', 'User', function ProblemListController($location, User) {
					 /* jshint validthis:true */
					 var vm = this;

					 vm.auth = function auth() {
						  User.auth(vm.user).then(function (responce) {
								if (responce.data === "Success") {
									 $location.path("/problems");
								} else {
									 vm.error = responce.data;
								}
						  });
					 }

					 activate();

					 function activate() {
						  User.isAuth().then(function (response) {
								if (response.data === true) {
									 $location.path("/problems");
								}
						  });
					 }
				}]
		  });
})();
