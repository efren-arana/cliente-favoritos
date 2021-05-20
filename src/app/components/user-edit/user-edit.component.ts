import { User } from '../../models/User';
import { UserService} from "../../services/user.service";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[UserService]
})
export class UserEditComponent implements OnInit {
  public title: String;
  public user: User;
  public identity;
  public token;
  public alert_message;
  public errorMessage:any;
  public url: string;
  public filesToUpload: Array<File>;

  constructor(private _userService:UserService,
              private _route:ActivatedRoute,
              private _router:Router) { 
    this.title = 'Actualizar mis datos';
    this.url = GLOBAL.url;
    //local storage
    this.user  = JSON.parse(this._userService.getIdentity());
    this.token  = this._userService.getToken();
    console.log('User for edit: '+this.user);
    console.log('User for token: '+this.token);
  }

  ngOnInit(): void {
    console.log('ngOnInit!!');
  }

  update(){
    this._userService.editUser(this.user).subscribe(
      data => {
        console.log('Data updated: '+data);
        this.user = data
        if(!this.user._id){
          this.alert_message =  "EL usuario NO se actualizo de manera correctamente !!";
          
        }else {
           //crear elemento en el localstorage para tener la sesion del usuario(sesion,cookies)
           localStorage.setItem('identity',JSON.stringify(this.user));
           this.alert_message =  "Datos actualizados de manera correctamente !!";
           if(!this.filesToUpload){
            //redirecciono en caso de que no se seleccione ningun archivo 
          }else{
            this.makeFileRequest(this.url+'/users/uploadFile/'+this.user._id,[],this.filesToUpload)
            .then((result:any)=>{
                this.user.image = result.image;
                //alamceno nuevamente el objeto en el local storage con la nueva imagen
                localStorage.setItem('identity',JSON.stringify(this.user));
                console.log('upload image: ' +this.user);
            });
          }
        } 
      },
      error =>{
        this.errorMessage = <any>error;
        console.log(error);
          if(this.errorMessage!=null){
            var body = error.body;
            if(body){
              console.log(body);
              this.alert_message = body.message;
            }else{
              console.log(error.error.message);
              this.alert_message = error.error.message;
            }
              
          }
      });
  }

  
/**
 * 
 * @param fileInput $event
 */
  fileChangeEvent(fileInput: any){
    console.log('file to upload: '+fileInput.target.files);
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }
  /**
   * 
   * @param url API upload file + id de la imagen
   * @param params arreglo de string vacio
   * @param files archivo seleccionado
   */
  makeFileRequest(url: string, params: Array<String>, files: Array<File>): Promise<any>{
    var token = this._userService.getToken();

    return new Promise( (resolve,reject) =>{
      var formData : any =  new FormData();

      var xhr = new XMLHttpRequest();

      for(var i=0; i< files.length; i++){
        formData.append('file',files[i], files[i].name);
      }
      //peticios ajax al servidor
        xhr.onreadystatechange = function (){
          if (xhr.readyState == 4){
            if(xhr.status == 200){
              resolve(JSON.parse(xhr.response));
            }else{
              reject(xhr.response);
            }
          }
        }
        xhr.open('POST',url,true);
        //xhr.setRequestHeader('Authorization',token);
        xhr.send(formData);
    })
  }
}
