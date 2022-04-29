import { invalid } from '@angular/compiler/src/render3/view/util';
import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
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
  respSenha = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    if (environment.token != '') {
      this.router.navigate(['/inicio'])
    }
    window.scroll(0, 0)

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  receberSenhaAdm(event: any) {
    this.senhaAdm = event.target.value
  }

  validarSenhaAdm() {
    if (this.senhaAdm == "1234") {
      this.respSenha = true
      this.alertas.showAlertSuccess("Código correto, continue com o cadastro de Administrador")
    }
    else {
      this.alertas.showAlertDanger("Acesso negado, insira o código correto ou mude para tipo de perfil Normal")
      this.respSenha = false
    }
    return this.respSenha
  }

  cadastrar() {

    if (this.tipoUsuario == "Administrador" && this.respSenha == false) {
      this.alertas.showAlertDanger('Insira e valide o código de Administrador!')
    }
    else if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão divergentes!')
    }

    else {

      if (this.fotoUsuario == null || this.fotoUsuario == undefined) {

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
            this.alertas.showAlertDanger('Campos preenchidos incorretamente ou e-mail já cadastrado')
          }

        }

      )
    }

  }

}
