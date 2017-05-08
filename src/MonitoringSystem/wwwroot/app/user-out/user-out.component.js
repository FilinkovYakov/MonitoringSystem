(function () {
	'use strict';

	angular
		 .module('userOut')
		 .component('userOut', {
		 	templateUrl: 'app/user-out/user-out.template.html',
		 	controller: ['$location', '$rootScope', 'User',
				 function UserOutController($location, $rootScope, User) {
				 	/* jshint validthis:true */
				 	var vm = this;
				 	vm.isAuth = false;

				 	vm.out = function () {
				 		User.out().then(function (responce) {
				 			$location.path('/auth');
				 			vm.isAuth = false;
				 		});
				 	}

				 	activate();

				 	$rootScope.$on('$locationChangeSuccess',
						function (event, toState, toParams, fromState, fromParams) {
							activate();
						});

				 	function activate() {
				 		User.isAuth().then(function (response) {
				 			vm.isAuth = response.data === true;
				 		});
				 	}
				 }]
		 });
})();
