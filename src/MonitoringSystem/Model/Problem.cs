using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitoringSystem.Model
{
	public class Problem
	{
		public int Id { get; set; }
		public string Summary { get; set; }
		public string Description { get; set; }
		public int ReporterId { get; set; }
		public int AssigneeId { get; set; }
		public Status Status { get; set; }
	}
}
