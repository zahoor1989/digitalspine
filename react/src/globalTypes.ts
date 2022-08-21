import React from "react";

export interface UserInterface{
  id: string;
  username: string;
  fullname:string;
  email:string;
}

export interface TokenInterface{
  token: String;
}

export interface ChangeQuantityInterface{
  id: number;
  quantity: number
}

export interface RoutesInterface{
  current: string;
  history: string;
}

interface RatingInterface{
  rate: number;
  count: number;
}

export interface ItemInterface{
  id: number;
  category: string;
  description: string;
  display_image: string;
  price: {
    currency: string,
    value: number
  },
  rating: RatingInterface;
  title: string;
  quantity?: number;
  added?: boolean
}

type tokenType = TokenInterface;

export interface StateInterface{
  user: UserInterface,
  token: String,
  items: Array<ItemInterface>,
  filteredItems: Array<ItemInterface>,
  shoppingCart: Array<ItemInterface>,
  searching: string,
  categories: Array<string>,
  current: string,
  history: string,
  isSearching: boolean,
  filterAt: string,
  totalAmount: number,
  error: boolean,
  loading: boolean
}

export type ActionType = {
  type: string,
  payload?: | UserInterface | TokenInterface
    | ItemInterface[] 
    | string 
    | number 
    | ChangeQuantityInterface
    | RoutesInterface
}

export interface PageProps {
  state: StateInterface;
  dispatch?: React.Dispatch<ActionType>;
  ctx?: React.Context<StateInterface>
}