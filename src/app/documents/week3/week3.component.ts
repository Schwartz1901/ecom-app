import { Component, inject, OnInit } from '@angular/core';
import { ChecklistComponent } from '../components/checklist/checklist.component';
import { ScriptWidgetComponent } from "../components/script-widget/script-widget.component";

import { RouteInfo, RouteTableComponent } from '../components/route-table/route-table.component';
import { SwaggerApiService } from '../../shared/services/swagger-api-service.service';
import { ApiTesterComponent } from "../components/api-tester/api-tester.component";


@Component({
  selector: 'app-week3',
  imports: [ChecklistComponent, ScriptWidgetComponent, RouteTableComponent, ApiTesterComponent],
  templateUrl: './week3.component.html',
  styleUrl: './week3.component.scss'
})
export class Week3Component {

  private swaggerApiService = inject(SwaggerApiService);
  routes: RouteInfo[] = [
    {
      method: 'GET',
      path: 'https//localhost:7035/api/Product/',
      description: "Get products",
      sampleBody: "",
      sampleResponse: [{id: 1, name:"string", description: "string", price:1}]
    },
    {
      method: 'POST',
      path: 'https//localhost:7035/api/Product/',
      description: "Add a product",
      sampleBody: {
                    "name": "string",
                    "description": "string",
                    "price": 10000
                  },
      sampleResponse: {
                      "id": 1,
                      "name": "string",
                      "description": "string",
                      "price": 10000
                    },
    },
    {
      method: 'GET',
      path: 'https//localhost:7035/api/Product/1',
      description: "Get product with a specific Id",
      sampleBody: "",
      sampleResponse: {
                      "id": 1,
                      "name": "string",
                      "description": "string",
                      "price": 10000
                    }
    },
    {
      method: 'GET',
      path: 'https//localhost:7035/api/Product/search?name=tea',
      description: "Search for products by name",
      sampleBody: "",
      sampleResponse: [
                        {
                          "id": 2,
                          "name": "Herbal tea",
                          "description": "Tea",
                          "price": 10000
                        }
                      ]
    },
    {
      method: 'PUT',
      path: 'https//localhost:7035/api/Product/1',
      description: "Update a product with specific Id",
      sampleBody: {
                    "name": "string",
                    "description": "string",
                    "price": 10000
                  },
      sampleResponse: {
                        "id": 1,
                        "name": "string",
                        "description": "string",
                        "price": 10000
                      },
    },
    {
      method: 'DELETE',
      path: 'https//localhost:7035/api/Product/1',
      description: "Delete product with specific Id",
      sampleBody: "",
      sampleResponse: "Product deleted",
    },

  ];
  

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
  productDtoCsHtml=`namespace DocumentAPI.Controllers.DTOs
{
    public class ProductDto
    {
        public string Name { get; set; }
    }
}
`;
  productPostFromBodyHtml=`public async Task<IActionResult> Create([FromBody]ProductDto product)
{
    if (product == null)
    {
        return BadRequest("Unknow product!");
    }
    var created = await _productService.AddAsync(product);

    return CreatedAtAction(
        nameof(GetById),
        new { id = created.Id },
        created
    );
}`;
  productDtoAnnotationCsHtml=`using System.ComponentModel.DataAnnotations;

namespace DocumentAPI.Controllers.DTOs
  public class ProductDto
{
    [Required(ErrorMessage ="Name is required")]
    [MinLength(3, ErrorMessage ="Name must be at least 3 characters")]
    public string Name { get; set; }; // Name is required with at least 3 characters

    public string? Description { get; set; }

    [Range(0, 10000, ErrorMessage = "Price must be between 0 and 10000")]
    public float Price { get; set; } // Price range from 0 to 10000
    
}`;
  productPOSTIfElseHtml=`public async Task<IActionResult> Create([FromBody] ProductDto product)
{
    if (product == null)
    {
        return BadRequest("Unknow product!");
    }
    var created = await _productService.AddAsync(product);

    return CreatedAtAction(
        nameof(GetById),
        new { id = created.Id },
        created
    );
}`;
  productPOSTCleanHtml=`var created = await _productService.AddAsync(product);

return CreatedAtAction(
    nameof(GetById),
    new { id = created.Id },
    created
);`;
  productServiceValidationHtml=`public async Task<ProductEntity> AddAsync(ProductDto productDto)
{
    if (string.IsNullOrWhiteSpace(productDto.Name))
    {
        throw new ArgumentException("Product name is required!");
    }
    if (productDto.Price < 0)
    {
        throw new ArgumentException("Product price must be greater than or equal to 0");
    }
    // For testing purpose, to be removed later
    if (productDto.Price >= 100)
    {
        throw new ArgumentException("Too Expensive!!!!");
    }
    var newProduct = new ProductEntity
    {
        Name = productDto.Name,
        Description = productDto.Description,
        Price = productDto.Price,
    };
    _context.ProductEntities.Add(newProduct);
    await _context.SaveChangesAsync();
    return newProduct;
}`;
  productPOSTTryCatchHtml=`public async Task<IActionResult> Create([FromBody] ProductDto product)
{
    try
    {

        var created = await _productService.AddAsync(product);

        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created
        );
    }
    catch (ArgumentException ex)
    {
        return BadRequest(new { error = ex.Message });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { error = "Internal Server Error: " + ex.Message });
    }
}`;
  globalErrorHandler=`app.UseExceptionHandler(appBuilder =>
{
    appBuilder.Run(async context =>
    {
        var exceptionHandler = context.Features.Get<IExceptionHandlerFeature>();
        var exception = exceptionHandler?.Error;

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = exception switch
        {
            ArgumentException => StatusCodes.Status400BadRequest,
            KeyNotFoundException => StatusCodes.Status404NotFound,
            _ => StatusCodes.Status500InternalServerError
        };

        var response = new
        {
            status = context.Response.StatusCode,
            message = exception?.Message
        };

        await context.Response.WriteAsJsonAsync(response);
    });
});
`;
 
}

