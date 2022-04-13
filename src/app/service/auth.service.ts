import { UserLogin } from './../model/UserLogin';
import { environment } from './../../environments/environment.prod';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({

  providedIn: 'root'
})
export class AuthService {

  constructor(
       private http: HttpClient

       ) { }

    entrar(userLogin: UserLogin): Observable<UserLogin> {
        return this.http.post<UserLogin>('https://deployblogpessoaligor.herokuapp.com//usuario/logar', userLogin)
     }


    cadastrar(user: User): Observable<User> {
      return this.http.post<User>('https://deployblogpessoaligor.herokuapp.com//usuario/cadastrar', user)

    }


    getByIdUser(id: number) : Observable<User>{
      return this.http.get<User>(`https://deployblogpessoaligor.herokuapp.com//usuario/${id}`)

    }


    logado(){
      let ok: boolean = false

      if (environment.token != ''){
        ok = true
      }

      return ok

    }

}
