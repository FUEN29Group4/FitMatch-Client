
using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class ArticleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
