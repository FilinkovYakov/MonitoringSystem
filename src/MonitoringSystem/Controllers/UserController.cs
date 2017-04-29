using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonitoringSystem.Model;
using Microsoft.AspNetCore.Authorization;

namespace MonitoringSystem.Controllers
{
	[Route("api/[controller]")]
	public class UserController : Controller
	{
		UserRepository _rep = UserRepository.Instance();

		// GET: api/values
		[HttpGet]
		[Authorize]
		public IEnumerable<UserVM> GetAll()
		{
			IList<UserVM> usersVM = new List<UserVM>();
			foreach (var problem in _rep.GetAll())
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
			return ConvertToUserVM(_rep.GetById(id));
		}

		// POST api/values
		[HttpPost]
		public string Registration([FromBody]User user)
		{
			if(_rep.GetByLogin(user.Login) == null) 
			{
				_rep.Add(user);
				return "Success";
			}

			return "Login have used";
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}

		public UserVM ConvertToUserVM(User user)
		{
			return new UserVM()
			{
				Id = user.Id,
				Login = user.Login,
				Name = user.Name
			};
		}
	}
}
