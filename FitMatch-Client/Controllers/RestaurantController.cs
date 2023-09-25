using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class RestaurantController : Controller
    {
        public IActionResult Restaurant()
        {
            return View();
        }
    }
}
