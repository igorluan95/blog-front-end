import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tema } from '../model/Tema';

export class TemaService {

  constructor(
    private http: HttpClient

  ) { }

  token={

  headers: new HttpHeaders().set('Authorization', environment.token )

  }

  postTema (tema: Tema): Observable <Tema>{
    return this.http.post<Tema>('https://deployblogpessoaligor.herokuapp.com/tema',tema, this.token)
  }

  getAllTema():Observable<Tema[]> {
    return this.http.get<Tema[]>('https://deployblogpessoaligor.herokuapp.com/tema', this.token)

  }

  getByIdTema(id: number):Observable<Tema>{
    return this.http.get<Tema>(`https://deployblogpessoaligor.herokuapp.com/tema/${id}`,this.token)
  }

  putTema(tema:Tema): Observable<Tema>{
    return this.http.put<Tema>('https://deployblogpessoaligor.herokuapp.com/tema',tema, this.token)

  }

  deleteTema(id:number) {
    return this.http.delete(`https://deployblogpessoaligor.herokuapp.com/tema/${id}`,this.token)

  }




}
