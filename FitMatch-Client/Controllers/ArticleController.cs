
using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class ArticleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult sport()
        {
            return View();
        }
        public IActionResult healthy()
        {
            return View();
        }
    }
}
