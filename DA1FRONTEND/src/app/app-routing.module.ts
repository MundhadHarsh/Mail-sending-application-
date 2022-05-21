import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path:'create', component:CreateComponent},
  {path:'create/:id', component:CreateComponent},
  {path:'read',component:ReadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,
    ReactiveFormsModule], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
