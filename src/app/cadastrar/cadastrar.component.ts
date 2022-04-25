import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from '../service/alertas.service';


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
  okAdm = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService

     ) { }

    ngOnInit(){    // quando a pagina iniciar, faça tal coisa

       window.scroll(0,0)   //ficar no y=0 e x=0, ficar no topo

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

        if (this.user.senha != this.confirmarSenha) {
          this.alertas.showAlertDanger('As senhas estão incorretas!')
        } else if (this.tipoUsuario != "Normal" && this.tipoUsuario != "Administrador") {
          this.alertas.showAlertDanger('Selecione o tipo de perfil!')
        } else if (this.tipoUsuario == "Administrador" && this.okAdm == false ) {
          this.alertas.showAlertDanger('Insira o código de Administrador!')
        }

        else {

          if (this.fotoUsuario == null) {
            this.fotoUsuario = "https://i.imgur.com/wBsUWjq.png"
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
                this.alertas.showAlertDanger('Campos incorretos ou usuário já cadastrado')
              }
            }

          )
        }

      }

    }
