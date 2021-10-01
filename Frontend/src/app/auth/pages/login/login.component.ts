import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb:FormBuilder,
              private router:Router) { }

  login(){
    console.log(this.formulario.value);
    console.log(this.formulario.valid);
    this.router.navigateByUrl('/dashboard')

  }

}
