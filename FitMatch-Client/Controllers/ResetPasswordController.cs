using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class ResetPasswordController : Controller
    {
        public IActionResult ResetPassword()
        {
            return View();
        }
    }
}
