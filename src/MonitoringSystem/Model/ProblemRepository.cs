using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Razor.Chunks.Generators;

namespace MonitoringSystem.Model
{
	public class ProblemRepository
	{
		private static ProblemRepository _singelton;
		private List<Problem> _rep;
		private int counter;

		private ProblemRepository()
		{
			_rep = new List<Problem>()
			{
				new Problem()
				{
					Id = 1,
					Summary = "Summary task 1",
					Description = "Description task 1",
					ReporterId = 1,
					AssigneeId = 1
				},
				new Problem()
				{
					Id = 2,
					Summary = "Summary task 1",
					Description = "Description task 1",
					ReporterId = 1,
					AssigneeId = 1
				}
			};

			counter = _rep.Count;
		}

		public static ProblemRepository Instance() 
		{
			if (_singelton == null)
			{
				_singelton = new ProblemRepository();
			}

			return _singelton;
		}

		public void Add(Problem problem)
		{
			counter++;
			problem.Id = counter;
			_rep.Add(problem);
		}

		public Problem Get(int id)
		{
			return _rep.FirstOrDefault(problem => problem.Id == id);
		}

		public void Delete(int id)
		{
			_rep.RemoveAll(problem => problem.Id == id);
		}

		public IEnumerable<Problem> GetAll()
		{
			foreach (var problem in _rep)
			{
				yield return problem;
			}
		}

		public IEnumerable<Problem> GetByStatus(Status status)
		{
			return _rep.Where(problem => problem.Status == status);
			;
		}
	}
}
