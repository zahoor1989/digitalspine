import React from "react";
import { ActionType } from "../../globalTypes";

export interface ItemProps{
  id: number;
  name: string;
  category: string;
  price:  number,
  currency:  string,
  rate: number;
  display_image: string;
  dispatch: React.Dispatch<ActionType>
  added: boolean
}