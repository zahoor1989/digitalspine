import { ActionType } from "../../globalTypes";

export interface ProductProps{
  title: string;
  price: number;
  currency: string;
  quantity: number;
  display_image: string;
  dispatch: React.Dispatch<ActionType>;
  id: number,
}