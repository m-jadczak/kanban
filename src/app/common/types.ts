export interface Card {
    id: string;
    content?: string;
    color?: string;
    lastColumn?: string;
}

export interface CardAddedPayload{
  columnId: string,
  cardId: string;
}

export interface Column {
    id: string;
    cardsIds: string[];
    title?: string;
}
