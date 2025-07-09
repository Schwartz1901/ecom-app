import { Component } from '@angular/core';
import { ChecklistComponent } from '../components/checklist/checklist.component';
import { ScriptWidgetComponent } from "../components/script-widget/script-widget.component";

@Component({
  selector: 'app-week3',
  imports: [ChecklistComponent, ScriptWidgetComponent],
  templateUrl: './week3.component.html',
  styleUrl: './week3.component.scss'
})
export class Week3Component {
  programCsHtml=`var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
`;
  weatherControllerCsHtml =`[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet]
    public IEnumerable<WeatherForecast> Get() { ... }
}
`;
  appsettingJsonHtml=`{
  "Jwt": {
    "Key": "secret-key"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb;..."
  }
}
`;
  readingAppsetting=`var key = builder.Configuration["Jwt:Key"];`;
  launchSettingsJsonHtml=`{
  "profiles": {
    "MyWebApi": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7142;http://localhost:5142",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
`;
  productEntityCsHtml=` public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
}
`;
  iProductServiceCsHtml=`public interface IProductService {
    Product GetById(int id);
}
`;
  productServiceCsHtml=`public class ProductService : IProductService {
    public Product GetById(int id) => new Product { Id = id, Name = "Sample" };
}
`;
  registerServiceHtml=`builder.Services.AddScoped<IProductService, ProductService>();
`;
  injectServiceHtml=`private readonly IProductService _service;

public ProductController(IProductService service) {
    _service = service;
}
`;
  productControllerBadPractice=`// Bad practice
public ProductController(ProductService service) { }
`
}

