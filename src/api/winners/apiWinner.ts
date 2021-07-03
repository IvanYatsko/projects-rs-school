import STORE from '../../store/store';
import { LIMIT_NUMBER_TEN, WINNERS } from '../api.config';
import { IGetWinner, IGetWinners, IUpdateWinners } from './apiWinner.model';

export async function getWinners(page: number = STORE.winnersPage, limit = LIMIT_NUMBER_TEN,
  sort: string = STORE.sortBy, order: string = STORE.sortOrder): Promise<IGetWinners> {
  const response = await fetch(`${WINNERS}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count') as string,
  };
}

export async function getWinner(id: number): Promise<IGetWinner> {
  return (await fetch(`${WINNERS}/${id}`)).json();
}

export async function createWinner(data: IUpdateWinners): Promise<IGetWinner> {
  const response: Response = await fetch(WINNERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function deleteWinner(id: number): Promise<number> {
  const response: Response = await fetch(`${WINNERS}/${id}`, {
    method: 'DELETE',
  });

  return response.status;
}

export async function updateWinner(id: number, data: IUpdateWinners): Promise<IGetWinner> {
  const response: Response = await fetch(`${WINNERS}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
