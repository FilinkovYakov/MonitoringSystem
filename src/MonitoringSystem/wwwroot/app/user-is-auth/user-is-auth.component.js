(function () {
	'use strict';

	angular
		 .module('userIsAuth')
		 .component('userIsAuth', {
		 	templateUrl: 'app/user-is-auth/user-is-auth.template.html',
		 	controller: ['$location', 'User', function ProblemListController($location, User) {
		 		/* jshint validthis:true */
		 		var vm = this;

		 		activate();

		 		function activate() {
		 			User.isAuth().then(function (response) {
		 				if (response.data === true && ($location.path() === '/auth' || $location.path() === '/isAuth')) {
		 					$location.path("/inDevProblems");
		 				} else if (response.data === false) {
		 					$location.path("/auth");
		 				}
		 			});
		 		}

		 	}]
		 });
})();
