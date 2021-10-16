import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from "./component/list/list.component";
import {EditComponent} from "./component/edit/edit.component";
import {CreateComponent} from "./component/create/create.component";


const routes: Routes = [
  {path: "", component: ListComponent},
  {path: "edit/:id", component: EditComponent},
  {path: "create", component: CreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
