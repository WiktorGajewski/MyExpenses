using MyExpenses.API.Wrappers;
using MyExpenses.Core.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace MyExpenses.API.Handlers
{
    public interface IAuthHandler
    {
        Task<Payload> VerifyGoogleToken(GoogleLoginRequest request);
        Task<User> GetOrCreateUser(string provider, string key, string username);
        string GenerateToken(User user);
    }
}
