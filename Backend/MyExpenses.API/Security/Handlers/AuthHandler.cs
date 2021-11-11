using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyExpenses.API.Security.Wrappers;
using MyExpenses.Core.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace MyExpenses.API.Security.Handlers
{
    public class AuthHandler : IAuthHandler
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;

        public AuthHandler(IConfiguration configuration, UserManager<User> userManager)
        {
            this._configuration = configuration;
            this._userManager = userManager;
        }


        public async Task<Payload> VerifyGoogleToken(GoogleLoginRequest request)
        {
            Payload payload;

            try
            {
                payload = await ValidateAsync(request.token, new ValidationSettings
                {
                    Audience = new[] { _configuration["GoogleSignIn:ClientId"] }
                });

                return payload;
            }
            catch
            {
                return null;
            }
        }

        public async Task<User> GetOrCreateUser(string provider, string key, string username)
        {
            var info = new UserLoginInfo(provider, key, provider);

            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

            if(user == null)
            {
                user = new User { UserName = username };
                
                var result1 = await _userManager.CreateAsync(user);
                var result2 = await _userManager.AddLoginAsync(user, info);

                if (!result1.Succeeded || !result2.Succeeded)
                    return null;
            }

            return user;
        }

        public string GenerateToken(User user)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var durationTime = Convert.ToInt32(_configuration["JWT:DurationInMinutes"]);

            var tokenHandler = new JwtSecurityTokenHandler();

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));

            var jwtSecurityToken = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(durationTime),
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                SigningCredentials = signingCredentials,
                IssuedAt = DateTime.UtcNow,
            });

            var token = tokenHandler.WriteToken(jwtSecurityToken);

            return token;
        }
    }
}
