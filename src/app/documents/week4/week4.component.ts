import { Component, inject, signal } from '@angular/core';
import { ChecklistComponent } from '../components/checklist/checklist.component';
import { ScriptWidgetComponent } from "../components/script-widget/script-widget.component";
import { HttpClient } from '@angular/common/http';
import { ApiTesterComponent } from "../components/api-tester/api-tester.component";

@Component({
  selector: 'app-week4',
  standalone: true,
  imports: [ChecklistComponent, ScriptWidgetComponent, ApiTesterComponent],
  templateUrl: './week4.component.html',
  styleUrl: './week4.component.scss'
})
export class Week4Component {
  
  private http = inject(HttpClient)
  
  hello = signal<string>("Press the button");
  helloHandle = signal<string>("Press the button");

  randomUserUrl = 'https://localhost:7035/api/ExternalAPI/randomUser';

  callHello() {
    this.http.get('https://localhost:7035/api/Product/hello', { responseType: 'text' }).subscribe({
      next: (res) => this.hello.set(res),
      error: (err) => this.hello.set("Error: " + (err?.message || 'Something went wrong'))
    });
  }
  callHelloHandle() {
    this.http.get('https://localhost:7035/api/Product/hello', { responseType: 'text' }).subscribe({
      next: (res) => this.helloHandle.set(res),
      error: (err) => 
        {
          if (err.status === 0) {
            this.helloHandle.set("Unable to connect to server...");
          }
          else  {
            this.helloHandle.set("Unexpected error");
          }
        }
    });
  }

  appConfigTsHtml=`import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});`;
  serviceInjectHtml=` private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7030/api/Product';`;

  sayHElloHtml=` sayHello(): Observable<string> {
    return this.http.get('https://localhost:7030/api/Product/hello', { responseType: 'text' });
  }`;
  callHeloHtml=`callHello() {
  this.productService.sayHello().subscribe({
    next: (res) => this.message = res,
    error: (err) => this.message = 'Error: ' + err.message
  });
}`;
  corsPolicyHtml=`builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost4200", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular app
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();
app.UseCors("AllowLocalhost4200"); // Must come before app.UseAuthorization()`;

  subscribeHtml=`this.authService.login(email!, password!).subscribe({
      next: () => this.router.navigate(['home']),
      error: err => this.errorMessage = err.message,
    });`;
    pipeHtml=` login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(endpoint/login, { email, password }).pipe(
          tap(response => this.storeTokens(response)),
          catchError(this.handleError)
        );
      }

  private handleError(error: HttpErrorResponse) {
    let msg: string = '';
    if (error.status === 0) {
      // Network or CORS error
      msg = 'Unable to connect to the server';
    }
    else if (error.status === 400) {
      // BadRequest
      msg = 'Bad Reqeust! Please check the input';
    }
    else if (error.status === 404) {
      // NotFound
      msg = 'Not Found!';
    }
    else if (error.status === 500) {
      // Internal server error
      msg = 'Something wrong with the server!';
    }
    else {
      // Customized error or some other errors
      msg = error.error?.message || 'Unexpected error';
    }

    return throwError(() => new Error(msg));
  }`;

  randomUserExternalApiHtml = `public class ExternalAPIService: IExternalAPIService
{
    private HttpClient _httpClient;
    public ExternalAPIService(IHttpClientFactory httpClientFactory) 
    { 
        _httpClient = httpClientFactory.CreateClient();
    }

    public async Task<Result> GetRandomUserAsync()
    {
        var result = await _httpClient.GetFromJsonAsync<RandomUserResponseDto>("https://randomuser.me/api/");
        if (result == null)
        {
            throw new Exception("Get no result form endpoint");
        }
        var user = result.Results?.FirstOrDefault();
        if (user == null)
        {
            throw new Exception("Get no user");
        }
        return user;
    }
}`;
}
