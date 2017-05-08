using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonitoringSystem.Model;

namespace MonitoringSystem.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	public class SubtaskController : Controller
	{
		SubtaskRepository _subtaskRep = SubtaskRepository.Instance();
		ProblemRepository _problemRep = ProblemRepository.Instance();
		UserRepository _userRep = UserRepository.Instance();

		// GET api/values
		[HttpGet("problemId/{problemId}")]
		public IEnumerable<SubtaskVM> GetByProblemId(int problemId)
		{
			IList<SubtaskVM> subtasksVM = new List<SubtaskVM>();
			foreach (var subtask in _subtaskRep.GetByProblemId(problemId))
			{
				subtasksVM.Add(ConvertToSubtaskVM(subtask));
			}

			return subtasksVM;
		}

		[HttpGet("assigneeId/{assigneeId}")]
		public IEnumerable<SubtaskVM> GetByAssigneeId(int assigneeId)
		{
			IList<SubtaskVM> subtasksVM = new List<SubtaskVM>();
			foreach (var subtask in _subtaskRep.GetByAssigneeId(assigneeId))
			{
				subtasksVM.Add(ConvertToSubtaskVM(subtask));
			}

			return subtasksVM;
		}

		// GET api/values/5
		[HttpGet("{id}")]
		public SubtaskVM Get(int id)
		{
			return ConvertToSubtaskVM(_subtaskRep.Get(id));
		}

		// POST api/values
		[HttpPost("{problemId}")]
		public void Post(int problemId, [FromBody]Subtask value)
		{
			value.ProblemId = problemId;
			value.ReporterId = _userRep.GetByLogin(User.Identity.Name).Id;
			_subtaskRep.Add(value);
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]Subtask value)
		{
			Subtask subtask = _subtaskRep.Get(id);
			subtask.Summary = value.Summary;
			subtask.Description = value.Description;
			subtask.AssigneeId = value.AssigneeId;
			subtask.RemainingTime = value.RemainingTime;
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_subtaskRep.Delete(id);
		}

		private SubtaskVM ConvertToSubtaskVM(Subtask subtask)
		{
			return new SubtaskVM()
			{
				Id = subtask.Id,
				ProblemId = subtask.ProblemId,
				Problem = _problemRep.Get(subtask.ProblemId).Summary,
				Summary = subtask.Summary,
				Description = subtask.Description,
				Reporter = _userRep.GetById(subtask.ReporterId).Name,
				AssigneeId = subtask.AssigneeId,
				Assignee = _userRep.GetById(subtask.AssigneeId).Name,
				EstimatedTime = subtask.EstimatedTime,
				RemainingTime = subtask.RemainingTime
			};
		}
	}
}
