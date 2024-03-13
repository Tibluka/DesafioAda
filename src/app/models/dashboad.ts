export class Dashboard {
    columns: Array<Column>;
}

export class Column {
    cards: Array<Card>;
    titulo: string;
    lista: '' | 'ToDo' | 'Doing' | 'Done' = '';
}

export class Card {
    id?: string;
    lista: '' | 'ToDo' | 'Doing' | 'Done' = '';
    conteudo: string = 'conteudo';
    titulo: string = 'teste';
    editing: boolean = true;
    columnIndex: number;
    isDragging?: boolean;
}