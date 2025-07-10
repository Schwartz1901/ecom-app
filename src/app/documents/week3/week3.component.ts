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
`;

  iProductServiceCsHtmlCode=`
using DocumentAPI.Models;

namespace DocumentAPI.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductEntity>> GetAllAsync();
        Task<ProductEntity?> GetByIdAsync(int id);
        Task AddAsync(ProductEntity product);
        Task<bool> DeleteAsync(int id);
    }
}
`;
  productServiceCsHtmlCode=`using DocumentAPI.Interfaces;
using DocumentAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DocumentAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly DocumentDbContext _context;

        public ProductService(DocumentDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProductEntity>> GetAllAsync()
        {
            return await _context.ProductEntities.ToListAsync();
        }

        public async Task<ProductEntity?> GetByIdAsync(int id)
        {
            return await _context.ProductEntities.FindAsync(id);
        }

        public async Task AddAsync(ProductEntity product)
        {
            _context.ProductEntities.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.ProductEntities.FindAsync(id);
            if (product == null) return false;

            _context.ProductEntities.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
`;
  productControllerCsHtml=`using DocumentAPI.Interfaces;
using DocumentAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace DocumentAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        [HttpGet]
        // GET api/Product/
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }
        [HttpPost]
        // POST api/Product 
        public async Task<IActionResult> Create(ProductEntity product)
        {
            await _productService.AddAsync(product);
            return CreatedAtAction(nameof(GetAll), new { id = product.Id }, product);
        }
    }
}
`;
  productGetByIdHtml=`[HttpGet("{id}")]
public async Task<IActionResult> GetById([FromRoute] int id)
{
    //Validation
    if (id <= 0)
        return BadRequest("ID must be greater than 0");
    var product = await _productService.GetByIdAsync(id);
    
    return Ok(product);
}`;
  productFromQueryHtml=`[HttpGet("search")]
// GET api/Product/search?name={name}
public async Task<IActionResult> Search([FromQuery] string name)
{
    if (string.IsNullOrWhiteSpace(name) || name.Length < 2)
        return BadRequest("Search keyword must be at least 2 characters.");
    var products = await _productService.SearchAsync(name);
    return Ok(products);
}`;
}

