var builder = WebApplication.CreateBuilder(args);

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
    pattern: "{controller=Login}/{action=Login}/{id?}");

// 在應用啟動時呼叫更新課程狀態API
var lifetime = app.Services.GetService<IHostApplicationLifetime>();
if (lifetime != null)
{
    lifetime.ApplicationStarted.Register(async () =>
    {
        try
        {
            using (HttpClient httpClient = new HttpClient())
            {
                var response = await httpClient.GetAsync("https://localhost:7011/api/CourseStatusUpdater/updateStatus");
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
