import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router

  ) { }

  ngOnInit() {

    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp


      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id

      /*console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.id) simples conferencia pelo inspecionar*/



      this.router.navigate(['/inicio'])
     }, erro => {
        if(erro.status == 500 || erro.status == 401){
          alert('Usuário ou senha incorretos!')
        }
      })
    }
  }
