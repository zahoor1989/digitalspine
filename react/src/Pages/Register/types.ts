export interface ILocalState{
  fullname: string;
  username:String,
  email: string;
  password:String;
  passwordConfirm:String;
}

export const initialLocalState: ILocalState = {
  fullname: "",
  username:"",
  email: "",
  password:"",
  passwordConfirm:""
}