using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MonitoringSystem.Model;
using Microsoft.AspNetCore.Http.Authentication;
using MonitoringSystem.Hashcomputer;

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
		public async Task<Result<AuthUserErrors>> SignInAsync([FromBody]AuthUser user)
		{
			User userDB = _rep.GetByLogin(user.Login);
			Result<AuthUserErrors> results = new Result<AuthUserErrors>();
			if (userDB != null)
			{
				if (string.Compare(userDB.Password, HashcomputerSHA512.GetHash(user.Password), StringComparison.Ordinal) == 0)
				{
					await Authenticate(user.Login);
					results.IsSuccess = true;
					return results;
				}

				results.Errors.PasswordError = "Password is invalid";
				return results;
			}

			results.Errors.LoginError = "Login is invalid";
			return results;
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
	}
}
