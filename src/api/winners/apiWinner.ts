import { WINNERS } from '../api.config';
import { IGetWinner, IGetWinners, IUpdateWinners } from './apiWinner.model';

export async function getCars(page: number, limit = 10, sort: number, order: number): Promise<IGetWinners> {
  const response = await fetch(`${WINNERS}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count') as string,
  };
}

export async function getCar(id: number): Promise<IGetWinner> {
  return (await fetch(`${WINNERS}/${id}`)).json();
}

export async function createCar(data: IUpdateWinners): Promise<IGetWinner> {
  const response: Response = await fetch(WINNERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function deleteCar(id: number): Promise<number> {
  const response: Response = await fetch(`${WINNERS}/${id}`, {
    method: 'DELETE',
  });

  return response.status;
}

export async function updateCar(id: number, data: IUpdateWinners): Promise<IGetWinner> {
  const response: Response = await fetch(`${WINNERS}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
