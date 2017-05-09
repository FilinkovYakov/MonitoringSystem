(function () {
	'use strict';

	angular
		 .module('userAuth')
		 .component('userAuth', {
		 	templateUrl: 'app/user-auth/user-auth.template.html',
		 	controller: ['$location', 'User', function ProblemListController($location, User) {
		 		/* jshint validthis:true */
		 		var vm = this;
		 		vm.errors = {};

		 		vm.auth = function auth() {
		 			if (isValid()) {
		 				User.auth(vm.user)
							.then(function (responce) {
								if (responce.data.isSuccess) {
									$location.path("/inDevProblems");
								} else {
									vm.errors.password = responce.data.errors.passwordError;
									vm.errors.login = responce.data.errors.loginError;
								}
							});
		 			}
		 		}

		 		activate();

		 		function activate() {
		 			User.isAuth().then(function (response) {
		 				if (response.data === true && $location.path() === '/auth') {
		 					$location.path("/inDevProblems");
		 				}
		 			});
		 		}

		 		function isValid() {
		 			var isvalid = true;

					 if (vm.user) {
						 if (!vm.user.login) {
							 vm.errors.login = "Login is require";
							 isvalid = false;
						 } else {
						 	vm.errors.login = "";
						 }

						 if (!vm.user.password) {
							 vm.errors.password = "Password is require";
							 isvalid = false;
						 } else {
						 	vm.errors.password = "";
						 }

						 return isvalid;
					 }

					 vm.errors.login = "Login is require";
					 vm.errors.password = "Password is require";
					 return false;
				 }
		 	}]
		 });
})();
