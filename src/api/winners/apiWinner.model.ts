export interface IGetWinner {
  id: number,
  wins: number,
  time: number,
}

export interface IGetWinners {
  items: IGetWinner[],
  count: string,
}

export interface IUpdateWinners {
  wins: number,
  time: number,
}
