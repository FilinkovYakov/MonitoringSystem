using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitoringSystem.Model
{
	public class SubtaskRepository
	{
		private static SubtaskRepository _singelton;
		private List<Subtask> _rep;
		private int counter;

		private SubtaskRepository()
		{
			_rep = new List<Subtask>()
			{
				new Subtask()
				{
					Id = 1,
					ProblemId = 1,
					Summary = "Summary task 1",
					Description = "Description task 1",
					ReporterId = 1,
					AssigneeId = 1
				},
				new Subtask()
				{
					Id = 2,
					ProblemId = 1,
					Summary = "Summary task 1",
					Description = "Description task 1",
					ReporterId = 1,
					AssigneeId = 1
				}
			};

			counter = _rep.Count;
		}

		public static SubtaskRepository Instance()
		{
			if (_singelton == null)
			{
				_singelton = new SubtaskRepository();
			}

			return _singelton;
		}

		public void Add(Subtask subtask)
		{
			counter++;
			subtask.Id = counter;
			_rep.Add(subtask);
		}

		public Subtask Get(int id)
		{
			return _rep.FirstOrDefault(subtask => subtask.Id == id);
		}

		public IEnumerable<Subtask> GetByProblemId(int problemId)
		{
			foreach (var subtask in _rep.Where(innerSubtask => innerSubtask.ProblemId == problemId))
			{
				yield return subtask;
			}
		}

		public IEnumerable<Subtask> GetByAssigneeId(int assigneeId)
		{
			foreach (var subtask in _rep.Where(innerSubtask => innerSubtask.AssigneeId == assigneeId))
			{
				yield return subtask;
			}
		}

		public void Delete(int id)
		{
			_rep.RemoveAll(subtask => subtask.Id == id);
		}

		public void DeleteByProblemId(int problemId)
		{
			_rep.RemoveAll(subtask => subtask.ProblemId == problemId);
		}

		public IEnumerable<Subtask> GetAll()
		{
			foreach (var subtask in _rep)
			{
				yield return subtask;
			}
		}
	}
}