import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService} from "../../services/user.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  providers:[UserService]
})
export class UserRegisterComponent implements OnInit {
  public user: User;
  public confirmPassword;
  public identity;
  public terms;
  public errorMessage;
  public alert_message:string;
  public register_success: boolean;
  public registered: boolean;
  constructor(private _userService:UserService,
              private _route:ActivatedRoute,
              private _router:Router) { 
      this.user = new User('','','','','','ROLE_USER','');
      this.registered = false;
      //this.register_success = false;
      //this.alert_message = null;
      console.log('constructor'+'alert_message: '+this.alert_message+''+'register_succes: '+this.register_success);
  }

  ngOnInit(): void {
    console.log('ngOnInit():'+'alert_message: '+this.alert_message+''+'register_succes: '+this.register_success);
  }

  public register(){
    this.registered = true;
    console.log(this.user);
    this._userService.addUser(this.user).subscribe(
      data => {
      console.log(data);
        let user = data;
        this.identity = user.user;
        if(!this.identity._id){
          this.alert_message = 'Usuario NO se registro de manera correcta!!';
          this.register_success = false;
        }else{
          this.alert_message = 'OK'
          this.register_success = true;
          this.user = new User('','','','','','ROLE_USER','');
        }
    },
    error =>{
      this.errorMessage = <any>error;
      if(this.errorMessage!=null){
        var body = error.message;
        console.log(this.errorMessage);
        this.alert_message = body;
        this.register_success = false;
      }
    });
  }
}
