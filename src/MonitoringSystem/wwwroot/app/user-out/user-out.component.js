(function () {
    'use strict';

	 angular
		  .module('userOut')
		  .component('userOut', {
				templateUrl: 'app/user-out/user-out.template.html',
				controller: ['$location', 'User',
					 function UserOutController($location, User) {
						  /* jshint validthis:true */
						  var vm = this;
						  vm.isAuth = false;

						  vm.out = function() {
								User.out().then(function (responce) {
									 $location.path('/auth');
								});
						  }

						  activate();

						  function activate() {
								User.isAuth().then(function (response) {
									 vm.isAuth = response.data === true;
								});
						  }
					 }]
		  });
})();
