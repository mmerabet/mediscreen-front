import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DefaultComponent} from "./layouts/default/default.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {PostsComponent} from "./modules/posts/posts.component";

const routes: Routes = [{
  path: '', component: DefaultComponent,
  children: [
    {path: '', component: DashboardComponent},
    {path: 'posts', component: PostsComponent}
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
