using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitMatch_Client.Controllers
{
    public class OrderController : Controller

    {
      

        //商城首頁 
        public IActionResult sho0913()
        {
            return View();
        }

        public IActionResult Shop()
        {
            return View();
        }


        //商品詳細頁
        public IActionResult ProductDetails()
        {
            return View();
        }



        //購物車頁面
        public IActionResult ShoppingCart()
        {
            return View();
        }


        // 結帳頁面
        public IActionResult Checkout()
        {
            return View();
        }



        public IActionResult testmall()
        {
            return View();
        }

        
        public IActionResult testcart()
        {
            return View();
        }


        
      
        
    }
}

