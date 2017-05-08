(function () {
	'use strict';

	angular
		.module('userDetail')
		.component('userDetail',
		{
			templateUrl: 'app/user-detail/user-detail.template.html',
			controller: [
				'$routeParams', 'User',
				function UserDetailController($routeParams, User) {
					var vm = this;

					activate();

					function activate() {
						User.get($routeParams.id)
							.then(function (response) {
								vm.user = response.data;
							});
					}
				}
			]
		});
})();
