using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MonitoringSystem.Model;
using Microsoft.AspNetCore.Http.Authentication;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MonitoringSystem.Controllers
{
	[Route("api/[controller]")]
	public class AuthController : Controller
	{
		UserRepository _rep = UserRepository.Instance();

		[HttpGet]
		public bool IsAuth()
		{
			return HttpContext.User.Identity.IsAuthenticated;
		}

		[HttpDelete]
		public async Task SignOutAsync()
		{
			await HttpContext.Authentication.SignOutAsync("Cookies");
		}

		// POST api/values
		[HttpPost]
		public async Task<string> SignInAsync([FromBody]AuthUser user)
		{
			User userDB = _rep.GetByLogin(user.Login);
			if (userDB != null)
			{
				if (userDB.Password.CompareTo(user.Password) == 0)
				{
					await Authenticate(user.Login);
					return "Success";
				}

				return "Password is invalid";
			}

			return "Login is invalid";
		}

		private async Task Authenticate(string login)
		{
			// создаем один claim
			var claims = new List<Claim>
			{
				new Claim(ClaimsIdentity.DefaultNameClaimType, login)
			};
			// создаем объект ClaimsIdentity
			ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
				ClaimsIdentity.DefaultRoleClaimType);
			// установка аутентификационных куки
			await HttpContext.Authentication.SignInAsync("Cookies", new ClaimsPrincipal(id), new AuthenticationProperties
			{
				ExpiresUtc = DateTime.UtcNow.AddMinutes(20)
			});
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/values/5
		//[HttpDelete("{id}")]
		//public void Delete(int id)
		//{
		//}
	}
}
