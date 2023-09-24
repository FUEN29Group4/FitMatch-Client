var builder = WebApplication.CreateBuilder(args);

// 維持 Json 回傳大小寫與 ViewModel 相同
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSession(); // Add this line

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseSession(); // Add this line
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// 在應用啟動時呼叫更新"課程狀態"API
var lifetime = app.Services.GetService<IHostApplicationLifetime>();
if (lifetime != null)
{
    lifetime.ApplicationStarted.Register(async () =>
    {
        try
        {
            using (HttpClient httpClient = new HttpClient())
            {
                var response = await httpClient.GetAsync("https://4fitmatchapi.azurewebsites.net/api/CourseStatusUpdater/updateStatus");
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("成功更新課程狀態");
                }
                else
                {
                    Console.WriteLine("更新課程狀態失敗");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"發生異常：{ex.Message}");
        }
    });
}


app.Run();
