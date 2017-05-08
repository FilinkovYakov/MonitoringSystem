(function () {
	'use strict';

	angular
		  .module('userList')
		  .component('userList', {
		  	templateUrl: 'app/user-list/user-list.template.html',
		  	controller: ['User', function UserListController(User) {
		  		/* jshint validthis:true */
		  		var vm = this;

		  		activate();

		  		function activate() {
		  			User.getAll().then(function (response) {
		  				vm.users = response.data;
		  			});
		  		}
		  	}]
		  });
})();