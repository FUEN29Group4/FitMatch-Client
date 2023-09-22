using Microsoft.AspNetCore.Mvc;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Text;
using System.Web;
using static FitMatch_Client.Model.HomeViewModel;

namespace FitMatch_Client.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        


    }
}