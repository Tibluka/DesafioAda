import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: PagesComponent,
        children: [
          { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
          { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
        ]
      }
    ])
  ]
})
export class PagesModule { }
