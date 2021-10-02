import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, tap }from 'rxjs/operators';



import { environment } from '../../../environments/environment';
import { AuthResponse, usuario } from '../interfaces/interface';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseurl:string = environment.baseUrl;
  private _usuario!:usuario 


  get usuario(){
    return {...this._usuario};
  }

  registro(name:string,email:string,password:string){
    const url = `${this.baseurl}/auth/register`;
    const body = {email,password,name};

    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp=>{
          if (resp.ok) {
            localStorage.setItem('token',resp.token!);
          }
        }),
        map( resp=>resp.ok),
        catchError(err=>of(err.error.msg))
      )
  }
  constructor(private http: HttpClient) { }
  login(email:string,password:string){
    const url = `${this.baseurl}/auth`;
    const body = {email,password};
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp=>{
          if (resp.ok) {
            localStorage.setItem('token',resp.token!);
          }
        }),
        map( resp=>resp.ok),
        catchError(err=>of(err.error.msg))
      )
  }

  validarToken():Observable<boolean>{
    const url = `${this.baseurl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-apiKey',localStorage.getItem('token')||'');

    return this.http.get<AuthResponse>(url,{headers})
        .pipe(
          map(resp=>{
            localStorage.setItem('token',resp.token!);
            this._usuario={
              name:resp.name!,
              uid:resp.uid!,
              email:resp.email!
            }
            return resp.ok;
          }), catchError(err=>of(false))
        );
  }
  logout(){
    localStorage.clear();
  }
}
