using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitoringSystem.Model
{
	public class AuthUserErrors
	{
		public string LoginError { get; set; } = string.Empty;
		public string PasswordError { get; set; } = string.Empty;
	}
}
