import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor(private http: HttpClient) { }


  async login(credentials: { login: string, senha: string }) {
    try {
      return await this.http.post<string>(`${environment.url}/login`, credentials).toPromise();
    } catch (error) {
      return null;
    }
  }
}
