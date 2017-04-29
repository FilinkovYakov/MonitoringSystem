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

						  vm.regist = function () {
								User.regist(vm.user).then(function (responce) {
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
