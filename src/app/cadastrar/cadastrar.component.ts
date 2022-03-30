import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
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

      cadastrar() {
        this.user.tipo = this.tipoUsuario

          if(this.user.senha != this.confirmarSenha){
            alert('As senhas estão incorretas')
          }
          else{
          this.authService.cadastrar(this.user).subscribe((resp: User) => {
            this.user = resp
            this.router.navigate(['/entrar'])
            alert('Usuário cadastrado com sucesso!')
          })
        }
        }

}


