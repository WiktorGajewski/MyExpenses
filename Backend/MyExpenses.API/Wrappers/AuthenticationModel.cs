namespace MyExpenses.API.Wrappers
{
    public class AuthenticationModel
    {
        public bool IsAuthenticated { get; set; }
        public string Token { get; set; }
        public int DurationInMinutes { get; set; }

        public AuthenticationModel()
        {

        }

        public AuthenticationModel(bool isAuthenticated, string token, int durationInMinutes)
        {
            IsAuthenticated = isAuthenticated;
            Token = token;
            DurationInMinutes = durationInMinutes;
        }
    }
}
