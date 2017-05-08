(function () {
	 'use strict';

	 angular.module('monitoringSystem', [
		  // Angular modules 
		  'ngRoute',
		  'ngLodash',
		  'core.problem',
		  'core.user',
		  'core.subtask',
		  'problemList',
		  'problemDetail',
		  'problemAdd',
		  'problemEdit',
		  'problemRemove',
		  'userAuth',
		  'userOut',
		  'userRegist',
		  'userList',
		  'userDetail',
		  'subtaskDetail',
		  'subtaskListByProblem',
		  'subtaskListByUser',
		  'subtaskAdd',
		  'subtaskEdit',
		  'subtaskRemove'
		  // Custom modules 

		  // 3rd Party Modules

	 ]);
})();