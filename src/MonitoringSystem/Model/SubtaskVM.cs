﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitoringSystem.Model
{
    public class SubtaskVM
    {
		public int Id { get; set; }
		public int ProblemId { get; set; }
		public string Problem { get; set; }
		public string Summary { get; set; }
		public string Description { get; set; }
		public string Reporter { get; set; }
		public int AssigneeId { get; set; }
		public string Assignee { get; set; }
		public double EstimatedTime { get; set; }
		public double RemainingTime { get; set; }
	}
}
