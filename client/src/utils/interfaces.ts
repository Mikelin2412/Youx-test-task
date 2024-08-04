export interface User {
  id: number;
  name: string;
  surname: string;
  height: number;
  weight: number;
  sex: string;
  address: string;
  image: string;
  deleteFunction: () => void;
}