using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class GymController : Controller
    {
        public IActionResult Gym()
        {
            return View();
        }
    }
}
