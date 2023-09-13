using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitMatch_Client.Controllers
{
    public class OrderController : Controller

    {
        //=================================

        public IActionResult TeddyCart()
        {
            return View();
        }



        public IActionResult TeddyEdit()
        {
            return View();
        }



        //=================================



        // GET: /<controller>/
        public IActionResult ShoppingCart()
        {
            return View();
        }


        public IActionResult ShoppingCartTest()
        {
            return View();
        }


        public IActionResult Shop()
        {
            return View();
        }

        public IActionResult ShopTest()
        {
            return View();
        }


        // GET: /<controller>/
        public IActionResult Checkout()
        {
            return View();
        }

        // GET: /<controller>/
        public IActionResult OrderDetails()
        {
            return View();
        }
    }
}

