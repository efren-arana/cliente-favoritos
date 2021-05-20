import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { FavoritosListComponent } from './components/favoritos-list.component';
import { HttpClientModule }    from '@angular/common/http';
import { appRoutingProviders, rounting} from './app.routing';
import { FavoritoDetailComponent } from './components/favorito-detail/favorito-detail.component';
import { FavoritoAddComponent } from './components/favorito-add/favorito-add.component';
import { FavoritoEditComponent } from './components/favorito-edit/favorito-edit.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

//imports plantilla de angular

//******************************************************** //********************************************************/
//*************************fin de la plantilla de angular //********************************************************/
//******************************************************* //********************************************************/
//Decorador, se le indica los componentes que va a cargar
@NgModule({
  //directivas y componentes a utilizar en las plantillas
  declarations: [
    // LAYOUT
    AppComponent,
    FavoritosListComponent,
    FavoritoDetailComponent,
    FavoritoAddComponent,
    FavoritoEditComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserEditComponent],
  //modulos del framework, o modulos externos que se van a cargar en la app
  //ejemplos: Formularios = FormModulo,HTTPModule
  imports: [
    BrowserModule,FormsModule,HttpClientModule,rounting],
  //propiedad del decorador,servicios, las rutas
  providers: [appRoutingProviders],
  //componente inicial de la aplicacion el cual se va a cargar Endpoind
  bootstrap: [AppComponent]
})
export class AppModule {
}
