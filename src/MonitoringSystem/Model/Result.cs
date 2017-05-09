using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitoringSystem.Model
{
	public class Result<T> where T: new()
	{
		public bool IsSuccess { get; set; }
		public T Errors { get; set; } = new T();
	}
}
