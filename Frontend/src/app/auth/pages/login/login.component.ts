import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario:FormGroup = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],

  });

  constructor(private fb:FormBuilder,private router:Router, private Services:AuthService) { }

  login(){

    const {email,password}=this.formulario.value;
    this.Services.login(email,password)
      .subscribe(resp=>{
        console.log(resp);
        if(resp===true){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido!',
          footer: resp
        });
      }
        
        //
      });
  }


}
