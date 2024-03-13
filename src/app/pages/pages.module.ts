import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/guards/auth.service';
import { InterceptorService } from '../services/interceptor.service';
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
          { path: 'home', canActivate: [AuthService], loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
          { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
        ]
      }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ]
})
export class PagesModule { }
