using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class TrainerController : Controller
    {
        public IActionResult Match()
        {
            return View();
        }
        public IActionResult TrainerResume()
        {
            return View();
        }
    }
}
