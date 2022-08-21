import React, { useReducer } from 'react';
import { Layout } from "./Layout";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from "./Pages/Home";
import { Menu } from "./Pages/Menu";
import { Cart } from "./Pages/Cart";
import { Product } from './Pages/Product';
import { Checkout } from './Pages/Checkout';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';
import { Ctx } from "./Context";
import * as stock from './Assets/products/products.json';

// utils
import { getStateFromLocalStorage, reducer } from "./globalState";

// css
import './App.scss';
import { StateInterface } from './globalTypes';


function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, getStateFromLocalStorage())

  React.useEffect(() => {
    try{
      const { products } = stock;
      dispatch({ type: "ADD_INITIAL_ITEMS", payload: JSON.parse(JSON.stringify(products))})
    }catch(err){
      dispatch({ type: "ERROR" })
    }
  }, [])

  React.useEffect(() => {
    try{
      const { products } = stock;
      dispatch({ type: "ADD_INITIAL_ITEMS", payload: JSON.parse(JSON.stringify(products))})
    }catch(err){
      dispatch({ type: "ERROR" })
    }
  }, [])

  return (
    <Ctx.Provider value={state}>
      <section className="App">
        <BrowserRouter>
          <Layout dispatch={dispatch}>
            <Routes>
              <Route path="/" element={
                <Home
                  state={state as StateInterface}
                  dispatch={dispatch}
                  ctx={Ctx}
                />
              }/>
              <Route path="/menu" element={
                <Menu 
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }/>
              <Route path='/shopping-cart' element={
                <Cart 
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }/>
              <Route path='/products/:title' element={
                <Product
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }/>
              <Route path='/checkout' element={
                <Checkout
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }/>
               <Route path='/register' element={
                <Register
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }/>
                 <Route path='/login' element={
                <Login
                  state={state as StateInterface}
                  dispatch={dispatch}
                />
              }/>
            </Routes>
          </Layout>
        </BrowserRouter>
      </section>
    </Ctx.Provider>
  );
}

export default App;
