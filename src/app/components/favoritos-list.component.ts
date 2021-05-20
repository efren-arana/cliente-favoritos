//importamos el paquete Component desde el nucleo de angular que nos permite usar 
//el decorador component y la clase AppComponent
import { Component,OnInit } from '@angular/core';
import { FavoritoService } from '../services/favorito.service';
import { Favorito } from '../models/favorito';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Decorador component, indicamos en que etiqueta se va a cargar la plantilla
//propiedades del componente
@Component({
  selector: 'favoritos-list',
  templateUrl: '../views/favoritos-list.html',
  providers: [FavoritoService]
})

//clase del componente donde iran los datos,propiedades,logica y funcionalidades
export class FavoritosListComponent implements OnInit{
  public title:String;
  public description:String;
  public favoritosArray:Array<String>;
  public flagFavorito:boolean;
  public color:string;
  public errorMessage:String;
  public favoritos:Favorito[];
  public loading:boolean;

  constructor(private _favoritoService:FavoritoService){
    this.title = 'Listado de marcadores:';
    this.description = 'Multiples componentes con Angular 9 para desarrollar una SPA';
    this.favoritosArray=['efren','anthomy','dennisse','tito','Johan','Jessica'];
    this.loading = true;
  }

  ngOnInit(){
    console.log('Favorito List component cargado!!');
    this.getFavorito();
  }

  getFavorito(){
    this._favoritoService.getFavoritos().subscribe(
      data => {
        console.log(data);
        this.favoritos = data.favoritos;
        if(!this.favoritos){
          alert('Error en el servidor!!')
        }else{
          this.loading = false;
        }
      },
      error =>{
        this.errorMessage = <any>error;
        if(this.errorMessage!=null){
          console.log(this.errorMessage);
          alert('Error en la peticion!!');
        }
      });
  }

  showFavoritos(){
      this.flagFavorito = true;
  }

  onBorrarFavorito(id:String){
    let flag = confirm("Estas seguro de eliminar el marcador!!");

    if (flag){
      this._favoritoService.deleteFavorito(id).subscribe(
        response => {
        console.log(response);
        alert(response.message);
        this.getFavorito();
      },
      error =>{
        this.errorMessage = <any>error;
        if(this.errorMessage!=null){
          console.log(this.errorMessage);
          alert('Error en la peticion al eliminar el marcador!!');
        }
      });
    }else{
      alert("El marcador NO fue eliminado!!");
    }
    
  }
  hideFavoritos(){
      this.flagFavorito =false;
  }

  changeColor(){
    console.log( this.color );
  }
}
