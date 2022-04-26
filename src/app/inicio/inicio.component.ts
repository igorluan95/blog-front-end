import { Tema } from './../model/Tema';
import { PostagemService } from './../service/postagem.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { TemaService } from '../service/tema.service';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {



  postagem: Postagem = new Postagem()
  listaPostagens: Postagem []

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  user: User = new User()
  idUser = environment.id

  titulo: string;
  temas: string;

  key = "data";
  reverse = true;


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService

  ) { }

  ngOnInit() {

    if(environment.token == ''){
      alert(' Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  findByTitulo() {

    if (this.titulo == '') {

      this.getAllPostagens();

    } else {
      this.postagemService.getByTituloPostagem(this.titulo).subscribe((resp: Postagem[]) => {

        this.listaPostagens = resp;

      });
    }
  }

  findByTema(){

    if(this.temas == ''){

      this.getAllTemas()

    }else{

      this.temaService.getByNomeTema(this.temas).subscribe((resp: Tema[]) =>{

        this.listaTemas = resp;

      })
    }
  }




  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
       this.postagem = resp
       alert('Postagem realizada com sucesso!')
       this.postagem = new Postagem()
       this.getAllPostagens()
    })


  }



}
