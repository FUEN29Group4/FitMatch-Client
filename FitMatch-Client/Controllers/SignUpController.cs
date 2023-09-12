using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class SignUpController : Controller
    {
        public IActionResult SignUp()
        {
            return View();
        }
    }
}
