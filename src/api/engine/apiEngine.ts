import { IStartEngineResponse, ISwitchResponse } from './apiEngine.model';
import { ENGINE, STATUS_DRIVE, STATUS_STARTED } from '../api.config';

export async function startStopEngine(id: number, status = STATUS_STARTED): Promise<IStartEngineResponse> {
  return (await fetch(`${ENGINE}?id=${id}&status=${status}`)).json();
}

export async function switchEngine(id: number, status = STATUS_DRIVE): Promise<ISwitchResponse> {
  const response = await fetch(`${ENGINE}?id=${id}&status=${status}`);
  if (response.status === 500) {
    return { isSuccess: false };
  }
  return response.json();
}
