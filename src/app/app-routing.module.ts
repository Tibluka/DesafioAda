import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './services/guards/auth.service';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    canActivate: [AuthService],
    children: [
      { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
