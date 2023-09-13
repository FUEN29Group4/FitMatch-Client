using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class MemberController : Controller
    {
        public IActionResult Member()
        {
            return View();
        }

        public IActionResult MemberEdit()
        {
            return View();
        }

    }
}
