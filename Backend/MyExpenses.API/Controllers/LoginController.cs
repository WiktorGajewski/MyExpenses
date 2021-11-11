using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MyExpenses.API.Security.Handlers;
using MyExpenses.API.Security.Wrappers;
using System;
using System.Threading.Tasks;

namespace MyExpenses.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/auth")]
    public class LoginController : Controller
    {
        private readonly IAuthHandler _authHandler;
        private readonly IConfiguration _configuration;

        public LoginController(IAuthHandler authHandler, IConfiguration configuration)
        {
            this._authHandler = authHandler;
            this._configuration = configuration;
        }

        [HttpPost("google")]
        [AllowAnonymous]
        [Consumes("application/json", "application/xml")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<AuthenticationModel>> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            var payload = await _authHandler.VerifyGoogleToken(request);
            if (payload == null)
                return Unauthorized();

            var user = await _authHandler.GetOrCreateUser("google", payload.Subject, payload.Subject);

            if (user == null)
                return Unauthorized();

            var token = _authHandler.GenerateToken(user);

            var durationTime = Convert.ToInt32(_configuration["JWT:DurationInMinutes"]);

            return Ok(new AuthenticationModel(true, token, durationTime));
        }

        [HttpPost("authorized")]
        [Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public IActionResult IsAuthorized()
        {
            return Ok();
        }
    }
}
