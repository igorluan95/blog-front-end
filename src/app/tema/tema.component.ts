import { TemaService } from './../service/tema.service';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema
  listaTema: Tema[];

  constructor(
    private temaService: TemaService,
    private router: Router
  ) { }

  ngOnInit(){

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findAllTema()

  }


  findAllTema(){
    this.temaService.getAllTema().subscribe((resp:Tema[])=>{
      this.listaTema=resp
    })
  }


  cadastrarTema(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema=resp
      alert('Tema cadastrado com sucesso!')
      this.findAllTema()
      this.tema = new Tema

    })

  }

}
