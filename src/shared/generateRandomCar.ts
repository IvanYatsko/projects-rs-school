import { ICreateCarParams } from '../api/garage/apiCar.model';

const models: string[] = ['Tesla', 'Mersedes', 'BMW', 'Toyota', 'Zhiguli', 'Moskvich', 'Mazda', 'Reno'];
const names: string[] = ['S', 'ML', '6', 'X5', '3', 'Y', '5', 'G'];
const colors: string[] = ['#FF1493', '#FF4500', '#FFFF00', '#008B8B', '#808000', '#00BFFF', '#EE82EE', '#DEB887'];
const COL_CARS = 100;

function selectRandomItem(item: string[]) {
  return item[Math.floor(Math.random() * item.length)];
}

function getRandomCar(): ICreateCarParams {
  const model: string = selectRandomItem(models);
  const name: string = selectRandomItem(names);
  const color: string = selectRandomItem(colors);

  return {
    name: `${model} ${name}`,
    color,
  };
}

export function generateRandomCars(count = COL_CARS): ICreateCarParams[] {
  const generateArr: ICreateCarParams[] = new Array(count);
  return generateArr.fill({ name: '', color: '' }).map(() => {
    const { name, color }: ICreateCarParams = getRandomCar();
    return { name, color };
  });
}
