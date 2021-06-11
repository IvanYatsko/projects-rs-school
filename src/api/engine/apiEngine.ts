import { IStartEngineResponse, ISwitchResponse } from './apiEngine.model';
import { ENGINE } from '../api.config';

export async function startStopEngine(id: number, status: string): Promise<IStartEngineResponse> {
  return (await fetch(`${ENGINE}?id=${id}&status=${status}`)).json();
}

export async function switchEngine(id: number, status = 'drive'): Promise<ISwitchResponse> {
  const response = await fetch(`${ENGINE}?id=${id}&status=${status}`);
  if (response.status === 500) {
    return { success: false };
  }
  return response.json();
}
