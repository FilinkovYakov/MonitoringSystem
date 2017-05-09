using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonitoringSystem.Model;
using Microsoft.AspNetCore.Authorization;
using MonitoringSystem.Hashcomputer;

namespace MonitoringSystem.Controllers
{
	[Route("api/[controller]")]
	public class UserController : Controller
	{
		UserRepository _userRep = UserRepository.Instance();
		SubtaskRepository _subtaskRep = SubtaskRepository.Instance();

		// GET: api/values
		[HttpGet]
		[Authorize]
		public IEnumerable<UserVM> GetAll()
		{
			IList<UserVM> usersVM = new List<UserVM>();
			foreach (var problem in _userRep.GetAll())
			{
				usersVM.Add(ConvertToUserVM(problem));
			}

			return usersVM;
		}

		// GET api/values/5
		[HttpGet("{id}")]
		[Authorize]
		public UserVM Get(int id)
		{
			return ConvertToUserVM(_userRep.GetById(id));
		}

		// POST api/values
		[HttpPost]
		public Result<UserErrors> Registration([FromBody]User user)
		{
			Result<UserErrors> results = new Result<UserErrors>();
			if (_userRep.GetByLogin(user.Login) == null)
			{
				user.Password = HashcomputerSHA512.GetHash(user.Password);
				_userRep.Add(user);
				results.IsSuccess = true;
				return results;
			}

			results.Errors.LoginError = "Login have used";
			return results;
		}

		private UserVM ConvertToUserVM(User user)
		{
			return new UserVM()
			{
				Id = user.Id,
				Login = user.Login,
				Name = user.Name,
				TotalRemainingTime = _subtaskRep.GetAll().Where(subtask => subtask.AssigneeId == user.Id).Sum(subtask => subtask.RemainingTime),
				TotalEstimatedTime = _subtaskRep.GetAll().Where(subtask => subtask.AssigneeId == user.Id).Sum(subtask => subtask.EstimatedTime)
			};
		}
	}
}
