using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class ForgotPasswordController : Controller
    {
        public IActionResult ForgotPassword()
        {
            return View();
        }
    }
}
