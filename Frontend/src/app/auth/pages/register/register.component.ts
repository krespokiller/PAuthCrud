import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  formulario:FormGroup = this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],

  });
  constructor(private fb:FormBuilder,
              private router:Router,
              private Services:AuthService) { }

  register(){

    const {email,password,name}=this.formulario.value;
    this.Services.registro(name,email,password)
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
