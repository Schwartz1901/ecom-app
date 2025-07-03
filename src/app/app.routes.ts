import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductLayoutComponent } from './features/products/product-layout/product-layout.component';

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
                component:ProductLayoutComponent,
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
            // {
            //     path: 'products/:id', 
            //     loadComponent: () => 
            //         import('./features/products/product-detail/product-detail.component').then(m=>m.ProductDetailComponent)
            // },
            {
                path: 'user/:username',
                loadComponent: () => import('./features/user/profile/profile.component').then(m=>m.ProfileComponent),
            },

            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            
            {path: '**', component: PageNotFoundComponent}
        ]
    },
];
