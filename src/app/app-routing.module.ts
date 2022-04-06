import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaComponent } from './tema/tema.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';

const routes: Routes = [

    {path:'', redirectTo: 'entrar', pathMatch:'full'},             /*se tiver vazio vai para o login e o full é para forçar isso*/

    {path:'entrar',component: EntrarComponent},
    {path:'cadastrar', component: CadastrarComponent},

    {path:'inicio', component: InicioComponent},
    {path:'tema', component: TemaComponent},

    {path:'tema-edit/:id', component: TemaEditComponent},
    {path:'tema-delete/:id', component: TemaDeleteComponent},

    {path: 'postagem-edit/:id', component: PostagemEditComponent},
    {path: 'postagem-delete/:id', component: PostagemDeleteComponent},

    {path: 'usuario-edit/:id', component: UsuarioEditComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
