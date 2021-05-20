import { User } from '../../models/User';
import { UserService} from "../../services/user.service";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers:[UserService]
})
export class UserLoginComponent implements OnInit {
  public user: User;
  public identity:any;
  public token;
  public logged: boolean;
  public rememberMe:Boolean;
  public errorMessage:any;
                
  constructor(private _userService:UserService,
              private _route:ActivatedRoute,
              private _router:Router) {
    this.user = new User('','','','','','ROLE_USER','');
    //this.identity = JSON.parse(this._userService.getIdentity());
    //this.token    = this._userService.getToken();
    this.rememberMe = false;
    this.logged = false;
    console.log('constructor: '+this.logged);
    //console.log('Identity: '+this.identity.email);
   }

  ngOnInit(): void{
    this.isLogged();
    console.log('ngOnInit: '+this.logged);
    console.log(this.user);
  }
  public login(){
    console.log(this.user);
    //conseguir los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      data => {
        console.log(data);
        let identity = data;
        this.identity = identity.user;
        this.token = identity.token;
        if(!this.identity._id || this.token <= 0){
          alert("EL usuario no esta correctamente identificado!!");
        }else {
           //crear elemento en el localstorage para tener la sesion del usuario(sesion,cookies)
           localStorage.setItem('identity',JSON.stringify(this.identity));
           //conseguimos el token para enviarselo a cada peticion
           localStorage.setItem('token',this.token);
           this.logged = true; //esta logged
           this.user = new User('','','','','','ROLE_USER','');
          } 
      },
      error =>{
        this.errorMessage = <any>error;
        if(this.errorMessage!=null){
          var body = error.message;
          console.log(this.errorMessage);
          this.errorMessage = body;
        }
      });
  }

  isLogged(){
    var identity = this._userService.getIdentity();
    var token = this._userService.getToken();
    if (identity != null && token != null){
      this.logged = true;
      console.log('isLogged() true: '+this.logged);
    }else{
      this.logged = false;
      console.log('isLogged() false: '+this.logged);
    }
  }
  logOut(){
    localStorage.clear();
    this.logged = false;
  }
  

}
