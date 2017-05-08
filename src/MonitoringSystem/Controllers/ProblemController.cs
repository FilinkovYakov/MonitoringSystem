using System.Collections.Generic;
using System.Linq;
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
		SubtaskRepository _subtaskRep = SubtaskRepository.Instance();

		// GET api/values
		[HttpGet("openProblems")]
		public IEnumerable<ProblemVM> GetOpenProblems()
		{
			IList<ProblemVM> problemsVM = new List<ProblemVM>();
			foreach (var problem in _problemRep.GetByStatus(Status.Open))
			{
				problemsVM.Add(ConvertToProblemVM(problem));
			}

			return problemsVM;
		}

		[HttpGet("inDevProblems")]
		public IEnumerable<ProblemVM> GetInDevProblems()
		{
			IList<ProblemVM> problemsVM = new List<ProblemVM>();
			foreach (var problem in _problemRep.GetByStatus(Status.InDev))
			{
				problemsVM.Add(ConvertToProblemVM(problem));
			}

			return problemsVM;
		}

		[HttpGet("closedProblems")]
		public IEnumerable<ProblemVM> GetClosedProblems()
		{
			IList<ProblemVM> problemsVM = new List<ProblemVM>();
			foreach (var problem in _problemRep.GetByStatus(Status.Open))
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
			value.Status = Status.Open;
			_problemRep.Add(value);
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]Problem value)
		{
			Problem problem = _problemRep.Get(id);
			problem.Summary = value.Summary;
			problem.Description = value.Description;
			problem.AssigneeId = value.AssigneeId;
			problem.Status = value.Status;
		}

		[HttpPut("changeStatus/{id}")]
		public void ChangeStatus(int id)
		{
			Problem problem = _problemRep.Get(id);
			switch (problem.Status)
			{
				case Status.Open:
					{
						problem.Status = Status.InDev;
						break;
					}
				case Status.InDev:
					{
						problem.Status = Status.Closed;
						break;
					}
				case Status.Closed:
					{
						problem.Status = Status.Open;
						break;
					}
				default: { break; }
			}
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_problemRep.Delete(id);
			_subtaskRep.DeleteByProblemId(id);
		}

		private ProblemVM ConvertToProblemVM(Problem problem)
		{
			return new ProblemVM()
			{
				Id = problem.Id,
				Summary = problem.Summary,
				Description = problem.Description,
				Reporter = _userRep.GetById(problem.ReporterId).Name,
				AssigneeId = problem.AssigneeId,
				Assignee = _userRep.GetById(problem.AssigneeId).Name,
				RemainingTime = _subtaskRep.GetByProblemId(problem.Id).Sum(subtask => subtask.RemainingTime),
				EstimatedTime = _subtaskRep.GetByProblemId(problem.Id).Sum(subtask => subtask.EstimatedTime),
				Status = problem.Status
			};
		}
	}
}