import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from '../service/alertas.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string
  fotoUsuario: string
  senhaAdm: string
  nome: String
  okAdm = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService

     ) { }

    ngOnInit(){
      if(environment.token != ''){
        this.router.navigate(['/inicio'])
      }
       window.scroll(0,0)

    }

    confirmSenha(event: any) {
      this.confirmarSenha = event.target.value
      }

    tipoUser(event: any) {
        this.tipoUsuario = event.target.value
      }


  validarFoto(event: any) {
    this.fotoUsuario = event.target.value
  }

  validarNome(event: any) {
    this.nome = event.target.value
  }

  validarUsuario(event: any) {
    this.user = event.target.value
  }
  receberSenhaAdm(event:any) {
    this.senhaAdm = event.target.value
  }

  validarSenhaAdm() {
    if(this.senhaAdm == "1234") {
      this.okAdm = true
      this.alertas.showAlertSuccess("Código correto, continue com o cadastro de Administrador")
    }
    else {
      this.alertas.showAlertDanger("Código incorreto, tente novamente")
      this.okAdm = false
    }
    return this.okAdm
  }


      cadastrar() {

        if (this.tipoUsuario != "Normal" && this.tipoUsuario != "Administrador") {
          this.alertas.showAlertDanger('Selecione o tipo de perfil!')
        }
        else if (this.tipoUsuario == "Administrador" && this.okAdm == false ) {
          this.alertas.showAlertDanger('Insira o código de Administrador!')
        }
        else if (this.user.nome == '' ) {
          this.alertas.showAlertDanger('Insira um nome válido!')
        }
        else if (this.user.usuario == '') {
          this.alertas.showAlertDanger('Insira um e-mail válido!')
        }
        else if (this.user.senha != this.confirmarSenha) {
          this.alertas.showAlertDanger('As senhas estão incorretas!')
        }

        else {

          if (this.fotoUsuario == null) {

            this.fotoUsuario = "https://i.imgur.com/k4Iuelh.jpg"
          }


          this.user.tipo = this.tipoUsuario
          this.user.foto = this.fotoUsuario
          this.authService.cadastrar(this.user).subscribe((resp: User) => {
            this.user = resp
            this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
            this.router.navigate(['/entrar'])
          },

            erro => {
              if (erro.status == 500 || erro.status == 401 || erro.status == 400) {
                this.alertas.showAlertDanger('Campos incorretos ou usuário já cadastrado!')
              }
            }

          )
        }

      }

    }
