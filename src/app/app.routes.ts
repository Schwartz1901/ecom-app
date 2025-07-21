import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminComponent } from './features/admin/admin.component';


export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {
                path: 'home', 
                loadComponent: () => 
                    import('./features/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'cart',
                loadComponent: () => 
                    import('./features/cart/cart.component').then(m => m.CartComponent)
            },
            {
                path: 'products',
                children: [
                    {
                        path: '',
                        loadComponent: () => 
                            import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent)
                    },
                    {
                        path: ':id'    ,
                        loadComponent: () =>import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
                    }
                ]
            },
            {
                path: 'about', 
                loadComponent: () => 
                    import('./features/about/about.component').then(m=>m.AboutComponent)
            },
            {
                path: 'user/profile',
                loadComponent: () => import('./features/user/profile/profile.component').then(m=>m.ProfileComponent),
            },

            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {
                path:'admin',
                component: AdminComponent,
                children: [
                    {path: '', redirectTo:'dashboard', pathMatch: 'full'},
                    {
                        path: 'dashboard',
                        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m=>m.DashboardComponent),
                    },
                    {
                        path: 'admin-products',
                        loadComponent: () => import('./features/admin/admin-products/admin-products.component').then(m=>m.AdminProductsComponent),
                    },
                    {
                        path: 'admin-products/edit/:id',
                        loadComponent: () => import('./features/admin/admin-products/admin-edit-product/admin-edit-product.component').then(m=>m.AdminEditProductComponent),
                    },
                    {path: '**', component: PageNotFoundComponent}
                ]
            },
            {path: '**', component: PageNotFoundComponent}
        ]
    },
    
];
