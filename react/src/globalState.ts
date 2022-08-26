import { StateInterface, ActionType, ItemInterface, ChangeQuantityInterface, RoutesInterface, UserInterface } from "./globalTypes"

export const initialState = (): StateInterface => {
  return {
    user : { 
      _id: '', 
      fullname:'',
      username: '', 
      email:''
    },
    token: '',
    items: [],
    filteredItems: [],
    shoppingCart: [],
    categories: ["All items"],
    current: "/",
    history: "",
    searching: "",
    isSearching: false,
    filterAt: "All items",
    totalAmount: 0,
    error: false,
    loading: true
  }
}

//saving state in local storage
function syncStateWithLocalStorage(state:any) {
  localStorage.setItem("Context", JSON.stringify(state));

}

//saving state in local storage
export const getStateFromLocalStorage = ():StateInterface => {
  const state = localStorage.getItem("Context");
  if(state){
    return JSON.parse(state);
  }else {
    return initialState();
  }


}

export function reducer(state: StateInterface, action: ActionType): StateInterface{
  const { type, payload } = action
  let index: number | undefined;
  let newShoppingCart: ItemInterface[];
  let newItem: ItemInterface;

  const getIndex = () => {
    return state.items.findIndex(item => item.id === payload)
  }

  switch(type){
    case "SETUSER":
      //saving updated state
      syncStateWithLocalStorage({
        ...state,
        user: payload as UserInterface
      }) 
      return {
        ...state,
        user: payload as UserInterface
      }
    case "SETTOKEN":
       //saving updated state
       syncStateWithLocalStorage({
        ...state,
        token: payload as String
      }) 
      return {
        ...state,
        token: payload as string
      }
      case "RESETTOKEN":
        //saving updated state
        syncStateWithLocalStorage({
         ...state,
         token: null
       }) 
       return {
         ...state,
         token: payload as string
       }
      case "RESETUSER":
        //saving updated state
        syncStateWithLocalStorage({
         ...state,
         user: null
       }) 
       return {
        ...state,
        user: { 
          _id: '', 
          fullname:'',
          username: '', 
          email:''
        }
      }
    case "RESET":
       //saving updated state
       syncStateWithLocalStorage({
        ...state,
        shoppingCart: []
      }) 
      return {
        ...state,
        shoppingCart: []
      }
    case "AMOUNT":
       //saving updated state
       syncStateWithLocalStorage({
        ...state,
        totalAmount: payload as number
      }) 
      return{
        ...state,
        totalAmount: payload as number
      }

    case "CHANGE_QUANTITY":
      index = state.shoppingCart.findIndex(
        item => item.id === (payload as ChangeQuantityInterface).id
      )
      newShoppingCart = [...state.shoppingCart]
      newShoppingCart[index].quantity = (payload as ChangeQuantityInterface).quantity
       //saving updated state
       syncStateWithLocalStorage({
        ...state,
        shoppingCart: newShoppingCart
      })  
      return {
        ...state,
        shoppingCart: newShoppingCart
      }

    case "SEARCH":
      //saving updated state
      syncStateWithLocalStorage({
        ...state,
        isSearching: !state.isSearching
      })
      return{
        ...state,
        isSearching: !state.isSearching
      }
    case "MOVING":
      state.current = (payload as RoutesInterface).current;
      state.history = (payload as RoutesInterface).history
        //saving updated state
        syncStateWithLocalStorage({ ...state })
      return{ ...state }

    case "REMOVE":
      index = getIndex()
      newShoppingCart = state.shoppingCart.filter(product => product.id !== payload)
      state.items[index].added = false;
       //saving updated state
       syncStateWithLocalStorage({ 
        ...state,
        shoppingCart: newShoppingCart
      })
      return{ 
        ...state,
        shoppingCart: newShoppingCart
      }

    case "ADD_TO_CART":
      index = getIndex()
      if(index >= 0){
        newItem = state.items[index]
        newItem.quantity = 1
        newShoppingCart = [
          ...state.shoppingCart,
          newItem
        ]
      }else{
        newShoppingCart = state.shoppingCart
      }
      state.items[index].added = true;
       //saving updated state
       syncStateWithLocalStorage({
        ...state,
        shoppingCart: newShoppingCart
      })
      return{
        ...state,
        shoppingCart: newShoppingCart
      }

    case "SEARCHING":
      state.filteredItems = state.items.filter(item => {
        let searching: string = payload as string
        return item.title.toLowerCase().includes(searching.toLowerCase())
      })
       //saving updated state
       syncStateWithLocalStorage({
        ...state,
        searching: payload as string
      })
      return{
        ...state,
        searching: payload as string
      }

    case "FILTER":
      state.filteredItems = payload === "All items" ? state.items : state.items.filter(item => item.category === payload)
      return{ ...state, filterAt: payload as string }

    case "ADD_INITIAL_ITEMS":
      (payload as ItemInterface[]).forEach((product: ItemInterface) => {
        if(!state.categories.includes(product.category)){
          state.categories.push(product.category)
        }
      })
      state.items = payload as ItemInterface[];
      state.filteredItems = state.items;
       //saving updated state
       syncStateWithLocalStorage({
        ...state,
        loading: false
      })
      return {
        ...state,
        loading: false
      }

    case "ERROR":
        //saving updated state
        syncStateWithLocalStorage({
          ...state,
          error: true,
          loading: false
        })
      return {
        ...state,
        error: true,
        loading: false
      }

    default:
       //saving updated state
       syncStateWithLocalStorage({ ...state })
      return { ...state }
  }
}