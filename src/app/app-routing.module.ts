import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaadpaalListComponent } from './laadpaal-list/laadpaal-list.component';
import { LaadpaalDetailComponent } from './laadpaal-detail/laadpaal-detail.component';
import { LaadpaalAppComponent } from './laadpaal-app/laadpaal-app.component';


const routes: Routes = [
  { path: '', component: LaadpaalAppComponent},
  { path: 'list/:regio', component: LaadpaalListComponent},
  { path: 'detail/:id', component: LaadpaalDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LaadpaalAppComponent ,LaadpaalListComponent, LaadpaalDetailComponent]