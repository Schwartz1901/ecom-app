import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminComponent } from './features/admin/admin.component';
import { DocumentsComponent } from './documents/documents.component'


export const routes: Routes = [

    {
        path: 'documents',
        component: DocumentsComponent,
        children:[
            {path: '', redirectTo: '1', pathMatch:'full'},
            {
                path:'1',
                loadComponent: () => import('./documents/week1/week1.component').then(m=>m.Week1Component)
            },
            {
                path:'2',
                loadComponent: () => import('./documents/week2/week2.component').then(m=>m.Week2Component)
            },
            {
                path:'3',
                loadComponent: () => import('./documents/week3/week3.component').then(m=>m.Week3Component)
            },
            {
                path:'4',
                loadComponent: () => import('./documents/week4/week4.component').then(m=>m.Week4Component)
            },
            {
                path:'5',
                loadComponent: () => import('./documents/week5/week5.component').then(m=>m.Week5Component)
            },
            {
                path:'6',
                loadComponent: () => import('./documents/week6/week6.component').then(m=>m.Week6Component)
            },
            {
                path:'7',
                loadComponent: () => import('./documents/week7/week7.component').then(m=>m.Week7Component)
            },
            {
                path:'8',
                loadComponent: () => import('./documents/week8/week8.component').then(m=>m.Week8Component)
            },
            {
            
                path:'9',
                loadComponent: () => import('./documents/week9/week9.component').then(m=>m.Week9Component)
            },
            {
                path:'10',
                loadComponent: () => import('./documents/week10/week10.component').then(m=>m.Week10Component)
            },
        ]
    },
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
                path: 'user/:userId',
                loadComponent: () => import('./features/user/profile/profile.component').then(m=>m.ProfileComponent),
            },

            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {
                path:'admin',
                component: AdminComponent,
                children: [
                    // {path: '', redirectTo:'dashboard', pathMatch: 'full'},
                    {
                        path: 'dashboard',
                        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m=>m.DashboardComponent),
                    },
                    {
                        path: 'admin-products',
                        loadComponent: () => import('./features/admin/admin-products/admin-products.component').then(m=>m.AdminProductsComponent),
                    },
                    {path: '**', component: PageNotFoundComponent}
                ]
            },
            {path: '**', component: PageNotFoundComponent}
        ]
    },
    
    
];
