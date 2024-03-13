import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dashboard, Card } from '../models/dashboad';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  dashboard: Dashboard = {
    columns: [
      {
        cards: [],
        titulo: "To do",
        lista: 'ToDo'
      },
      {
        cards: [],
        titulo: "Doing",
        lista: 'Doing'
      },
      {
        cards: [],
        titulo: "Done",
        lista: 'Done'
      }

    ]
  };

  constructor(private http: HttpClient) { }


  async login(credentials: { login: string, senha: string }) {
    try {
      return await this.http.post<string>(`${environment.url}/login`, credentials).toPromise();
    } catch (error) {
      return null;
    }
  }

  async setDashboardCards() {
    try {
      const token = localStorage.getItem('ada_usr_tkn');
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);

      const response = await this.http.get<Array<Card>>(`${environment.url}/cards`, { headers }).toPromise();

      //clear cards
      this.dashboard.columns.forEach((column) => {
        column.cards = [];
      })
      //clear cards

      for (let card of response) {
        let column = this.dashboard.columns.find(c => c.lista === card.lista);
        if (column) {
          column.cards.push({ ...card, editing: false });
        }
      }

    } catch (error) {

    }
  }

  async newCard(card: Card) {
    try {
      const token = localStorage.getItem('ada_usr_tkn');
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);

      await this.http.post<Card>(`${environment.url}/cards`, {
        titulo: card.titulo,
        conteudo: card.conteudo,
        lista: card.lista
      }, { headers }).toPromise();

      this.setDashboardCards();

    } catch (error) {

    }
  }

  async eraseCard(cardId: string) {
    try {
      const token = localStorage.getItem('ada_usr_tkn');
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);

      await this.http.delete<Card>(`${environment.url}/cards/${cardId}`, { headers }).toPromise();

      this.setDashboardCards();

    } catch (error) {

    }
  }

  async updateCard(card: Card) {
    try {
      const token = localStorage.getItem('ada_usr_tkn');
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);

      await this.http.put<Card>(`${environment.url}/cards/${card.id}`, {
        id: card.id,
        titulo: card.titulo,
        conteudo: card.conteudo,
        lista: card.lista
      }, { headers }).toPromise();

      this.setDashboardCards();

    } catch (error) {

    }
  }

}
