import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FavoritoService } from '../../services/favorito.service';
import { Favorito } from '../../models/favorito';
@Component({
  selector: 'app-favorito-edit',
  templateUrl: './favorito-edit.component.html',
  styleUrls: ['./favorito-edit.component.css'],
  providers:[FavoritoService]
})
export class FavoritoEditComponent implements OnInit {
  public titleSection: String;
  public favorito: Favorito;
  public errorMessage:any;
  constructor(private _favoritoService:FavoritoService,
              private _route:ActivatedRoute,
              private _router:Router) { 
    this.titleSection = "Editar Favorito";
  }

  ngOnInit(): void {
    this.favorito =  new Favorito("","","","");
    this.getFavorito();
    console.log(this.favorito);
  }

  public onSubmit(){
    console.log(this.favorito);
    this._route.params.forEach((params:Params)=>{
      let id =  params['id'];
      this._favoritoService.editFavorito(this.favorito._id,this.favorito).subscribe(
      response => {
        if(!response.favorito){
          console.log(response.favorito);
          alert('Error en el servidor');
        }else{
          this.favorito = response.favorito;
          this._router.navigate(['/marcador',this.favorito._id]);
        }
      },
      error =>{
        this.errorMessage = <any>error;
        if(this.errorMessage!=null){
          console.log(this.errorMessage);
          alert('Error en la peticion');
        }
      }
    );
    });
  }
  getFavorito(){
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
