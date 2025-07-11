import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouteInfo } from '../../documents/components/route-table/route-table.component'
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SwaggerApiService {
  constructor(private http: HttpClient) {}

  loadRoutesByBasePath(basePath: string) {
    const swaggerUrl = 'https://localhost:7035/swagger/v1/swagger.json';

    return this.http.get<any>(swaggerUrl).pipe(
      map(swagger => {
        const routes: RouteInfo[] = [];

        for (const path in swagger.paths) {
          if (path.startsWith(basePath)) {
            const methods = swagger.paths[path];
            for (const method in methods) {
              const details = methods[method];
              routes.push({
                method: method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE',
                path,
                description: details.summary || details.description || '-',
                sampleBody: details.requestBody?.content?.['application/json']?.example,
                sampleResponse: details.responses?.['200']?.content?.['application/json']?.example,
              });
            }
          }
        }

        return routes;
      })
    );
  }
}
