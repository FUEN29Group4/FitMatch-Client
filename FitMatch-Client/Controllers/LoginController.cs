using Microsoft.AspNetCore.Mvc;

namespace FitMatch_Client.Controllers
{
    public class LoginController : Controller
    {
        [HttpGet] // 用於顯示登入表單
        public IActionResult Login()
        {
            return View();
        }

        //[HttpPost] // 用於處理表單提交
        //public IActionResult Login(string email, string password)
        //{
        //    // 在這裡添加你的驗證邏輯，例如與資料庫比對

        //    bool someConditionForSuccess = true; // 假設這是驗證成功的條件

        //    if (someConditionForSuccess) // 登入成功
        //    {
        //        return RedirectToAction("Index", "Home"); // 重導向到 Home Controller 的 Index Action
        //    }
        //    else // 登入失敗
        //    {
        //        ViewBag.Error = "登入失敗，請再試一次。";
        //        return View(); // 返回登入視圖並顯示錯誤訊息
        //    }
        //}
    }

}
