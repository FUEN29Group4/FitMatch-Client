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
    pattern: "{controller=Home}/{action=Index}/{id?}");

//// �b���αҰʮɩI�s��s�ҵ{���AAPI
//var lifetime = app.Services.GetService<IHostApplicationLifetime>();
//if (lifetime != null)
//{
//    lifetime.ApplicationStarted.Register(async () =>
//    {
//        try
//        {
//            using (HttpClient httpClient = new HttpClient())
//            {
//                var response = await httpClient.GetAsync("https://localhost:7011/api/CourseStatusUpdater/updateStatus");
//                if (response.IsSuccessStatusCode)
//                {
//                    Console.WriteLine("���\��s�ҵ{���A");
//                }
//                else
//                {
//                    Console.WriteLine("��s�ҵ{���A����");
//                }
//            }
//        }
//        catch (Exception ex)
//        {
//            Console.WriteLine($"�o�Ͳ��`�G{ex.Message}");
//        }
//    });
//}


app.Run();
