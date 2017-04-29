using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitoringSystem.Model
{
    public class ProblemVM
    {
		public int Id { get; set; }
		public string Summary { get; set; }
		public string Description { get; set; }
		public string Reporter { get; set; }
		public string Assignee { get; set; }
	}
}
