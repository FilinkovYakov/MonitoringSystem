(function () {
	'use strict';

	angular
		 .module('userRegist')
		 .component('userRegist', {
		 	templateUrl: 'app/user-regist/user-regist.template.html',
		 	controller: ['$location', 'User',
				 function UserOutController($location, User) {
				 	/* jshint validthis:true */
				 	var vm = this;
				 	vm.errors = {};

				 	vm.regist = function () {
				 		if (isValid()) {
				 			User.regist(vm.user)
								.then(function (responce) {
									if (responce.data.isSuccess) {
										$location.path("/inDevProblems");
									} else {
										vm.errors.login = responce.data.errors.loginError;
									}
								});
				 		}
				 	}

				 	activate();

				 	function activate() {
				 		User.isAuth().then(function (response) {
				 			if (response.data === true) {
				 				$location.path("/inDevProblems");
				 			}
				 		});
				 	}

				 	function isValid() {
				 		var isvalid = true;

				 		if (vm.user) {
				 			if (!vm.user.login) {
				 				vm.errors.login = "Login is required";
				 				isvalid = false;
				 			} else {
				 				vm.errors.login = "";
				 			}

				 			if (!vm.user.name) {
				 				vm.errors.name = "Name is required";
				 				isvalid = false;
				 			} else {
				 				vm.errors.name = "";
				 			}

				 			if (!vm.user.password) {
				 				vm.errors.password = "Password is required";
				 				isvalid = false;
				 			} else {
				 				vm.errors.password = "";
				 			}

				 			return isvalid;
				 		}

				 		vm.errors.name = "Name is require";
				 		vm.errors.login = "Login is require";
				 		vm.errors.password = "Password is require";
				 		return false;
				 	}
				 }]
		 });
})();
