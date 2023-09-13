using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class MatchController : Controller
    {
        public IActionResult Match()
        {
            return View();
        }
        public IActionResult TrainerResume()
        {
            return View();
        }
        public IActionResult SearchTrainer()
        {
            return View();
        }

    }
}
