//importamos el paquete Component desde el nucleo de angular que nos permite usar 
//el decorador component y la clase AppComponent

import { Component, OnInit} from '@angular/core';
declare var Jquery:any;
declare var $:any;
//Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
  selector: 'app-root',
  templateUrl: './views/home.html',
  styleUrls: ['./app.component.css']
})


//clase del componente donde iran los datos,propiedades,logica y funcionalidades
export class AppComponent implements OnInit{
  public title:String;
  public description:String;
  
  constructor(){
    this.title = 'APP FAVORITOS';
    this.description = 'Aplicacion web SPA con Angular 9 para gestionar favoritos online';
    
  }
  
  ngOnInit():void{
    
  }
  
  public toggle(){
    console.log("Click en el logo angular!!")
    $('.subtitle').slideToggle();
  }
}
