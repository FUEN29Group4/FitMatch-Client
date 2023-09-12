using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class TrainerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
