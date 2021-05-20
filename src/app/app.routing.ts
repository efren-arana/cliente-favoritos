import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritosListComponent } from './components/favoritos-list.component';
import {FavoritoDetailComponent } from './components/favorito-detail/favorito-detail.component';
import {FavoritoAddComponent } from './components/favorito-add/favorito-add.component';
import {FavoritoEditComponent } from './components/favorito-edit/favorito-edit.component';
import {UserLoginComponent} from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
//array con la definicion de todas las rutas
//array de objetos (rutas)
const appRoutes:Routes = [
    {path: '', component:UserLoginComponent},
    {path: 'register',component:UserRegisterComponent},
    {path: 'login',component:UserLoginComponent},
    {path: 'edit',component:UserEditComponent},
    {path: 'marcador/:id',component:FavoritoDetailComponent},
    {path: 'edit-marcador/:id',component:FavoritoEditComponent},
    {path: 'crear-marcador',component:FavoritoAddComponent},
    {path: '**', component:FavoritosListComponent}
];

export const appRoutingProviders:any[] = []; //configuracion necesaria para el routing
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);