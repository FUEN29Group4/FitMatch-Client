using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class ReviewsController : Controller
    {
        public IActionResult Reviews()
        {
            return View();
        }
    }
}
