using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class MemberFavoriteController : Controller
    {
        public IActionResult MemberFavorite()
        {
            return View();
        }
    }
}
