
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonitoringSystem.Model;
using Microsoft.AspNetCore.Authorization;

namespace MonitoringSystem.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	public class ProblemController : Controller
	{
		ProblemRepository _problemRep = ProblemRepository.Instance();
		UserRepository _userRep = UserRepository.Instance();

		// GET api/values
		[HttpGet]
		public IEnumerable<ProblemVM> Get()
		{
			IList<ProblemVM> problemsVM = new List<ProblemVM>();
			foreach (var problem in _problemRep.GetAll())
			{
				problemsVM.Add(ConvertToProblemVM(problem));
			}

			return problemsVM;
		}

		// GET api/values/5
		[HttpGet("{id}")]
		public ProblemVM Get(int id)
		{
			return ConvertToProblemVM(_problemRep.Get(id));
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody]Problem value)
		{
			value.ReporterId = _userRep.GetByLogin(User.Identity.Name).Id;
			_problemRep.Add(value);
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]Problem value)
		{
			Problem problem  = _problemRep.Get(id);
			problem.Summary = value.Summary;
			problem.Description = value.Description;
			problem.AssegneeId = value.AssegneeId;
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_problemRep.Delete(id);
		}

		public ProblemVM ConvertToProblemVM(Problem problem) 
		{
			return new ProblemVM()
			{
				Id = problem.Id,
				Summary = problem.Summary,
				Description = problem.Description,
				Reporter = _userRep.GetById(problem.ReporterId).Name,
				Assignee = _userRep.GetById(problem.AssegneeId).Name
			};
		}
	}
}
