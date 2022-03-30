import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';

const routes: Routes = [

    {path:'', redirectTo: 'entrar', pathMatch:'full'},             /*se tiver vazio vai para o login e o full é para forçar isso*/


    {path:'entrar',component: EntrarComponent},
    {path:'cadastrar', component: CadastrarComponent},
    {path:'inicio', component: InicioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
