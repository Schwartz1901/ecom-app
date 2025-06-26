import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', 
                loadComponent: () => 
                    import('./features/home/home.component').then(m => m.HomeComponent)},
            {path: 'products', 
                loadComponent: () => 
                    import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent)},
            
            
            {path: '**', component: PageNotFoundComponent}
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  
];
