using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitoringSystem.Model
{
    public class Subtask
    {
		public int Id { get; set; }
		public int ProblemId { get; set; }
		public string Summary { get; set; }
		public string Description { get; set; }
		public int ReporterId { get; set; }
		public int AssigneeId { get; set; }
		public double EstimatedTime { get; set; }
		public double RemainingTime { get; set; }
	}
}
