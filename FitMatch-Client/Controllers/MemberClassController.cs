﻿using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class MemberClassController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}