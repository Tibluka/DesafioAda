import { Component, OnInit } from '@angular/core';
import { Card, Column } from 'src/app/models/dashboad';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedDraggingCard: Card = null;

  newColumn: Column = {
    cards: [
      {
        columnIndex: 1,
        conteudo: '',
        editing: true,
        lista: 'ToDo',
        titulo: ''
      }
    ],
    titulo: 'New',
    lista: ''
  }

  get dashboard() {
    return this.kanbanService.dashboard;
  }

  constructor(private kanbanService: KanbanService) {
    this.kanbanService.setDashboardCards();
  }

  ngOnInit(): void {
  }

  async addToDo() {
    const newCard = this.newColumn.cards[0];
    if (!newCard.conteudo) {
      alert('Descrição obrigatória');
      return;
    }
    if (!newCard.titulo) {
      alert('Título obrigatório');
      return;
    }
    await this.kanbanService.newCard(newCard);

    this.newColumn = {
      cards: [
        {
          columnIndex: 1,
          conteudo: '',
          editing: true,
          lista: 'ToDo',
          titulo: ''
        }
      ],
      titulo: 'New',
      lista: ''
    }
  }

  updateCard(card: Card) {
    this.kanbanService.updateCard(card);
  }

  eraseCard(card: Card) {
    this.kanbanService.eraseCard(card.id);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(lista) {
    this.updateCard({ ...this.selectedDraggingCard, lista });
  }

  draggingCard(card: Card) {
    this.selectedDraggingCard = card;
  }

  startDragging(card: Card) {
    card.isDragging = true;
  }

  endDragging(card: Card) {
    card.isDragging = false;
  }

}
