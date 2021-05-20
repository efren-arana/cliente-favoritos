import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FavoritoService } from '../../services/favorito.service';
import { Favorito } from '../../models/favorito';
@Component({
  selector: 'app-favorito-detail',
  templateUrl: './favorito-detail.component.html',
  styleUrls: ['./favorito-detail.component.css'],
  providers:[FavoritoService]
})
export class FavoritoDetailComponent implements OnInit {
  public errorMessage:String;
  public favorito : Favorito;
  constructor(private _favoritoService:FavoritoService,
              private _route:ActivatedRoute,
              private _router:Router) { }

  ngOnInit(): void {
    this.getFavorito()
  }

  getFavorito(){
    console.log('Favorito detail component cargado!!');
    this._route.params.forEach((params:Params)=>{
      let id =  params['id'];
      //metodo get realiza una peticio ajax al servidor
    this._favoritoService.getFavorito(id).subscribe(
      response => {
        console.log(response);
        this.favorito = response.favorito;
        if(!this.favorito){
          this._router.navigate(['/']);
        }
      },
      error =>{
        this.errorMessage = <any>error;
        if(this.errorMessage!=null){
          console.log(this.errorMessage);
          alert('Error en la peticion');
        }
      });
    });
  }

}
