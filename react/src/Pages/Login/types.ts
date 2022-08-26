export interface ILocalState{
  username: string;
  password:string;
}

export const initialLocalState: ILocalState = {
  username: "",
  password:"",
}