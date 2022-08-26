import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ButtonCTA } from "../../Components/ButtonCTA";
import { Product } from "../../Components/Product";
import { PageProps, ActionType } from "../../globalTypes";
import UserService from "../../Services/UserService";
import { ITotalAmount, totalAmountInitial } from "./types";

export const Cart: React.FC<PageProps> = ({ state, dispatch }): JSX.Element => {
  const navigate: NavigateFunction = useNavigate()
  const { shoppingCart, user, token,  } = state
  const [totalAmount, setTotalAmount] = React.useState<ITotalAmount>(totalAmountInitial)

  React.useEffect(() => {

    if(shoppingCart.length) {
      let subtotal = 0;
      let taxes = 0;
      let total = 0;

      shoppingCart.forEach(product => {
        subtotal += product.price.value * (product.quantity as number)
        taxes += subtotal * 0.16;
        total += subtotal + taxes;
      })

      setTotalAmount({
        subtotal: Math.round(subtotal),
        taxes: Math.round(taxes),
        total: Math.round(total)
      })
    }
  }, [shoppingCart])
  
  // creating order 
  const createOrder = async() => {
    if(dispatch){
      dispatch({ type: "SETUSER", payload: user })
      dispatch({ type: "SETTOKEN", payload: token })
      dispatch && dispatch({
        type: "AMOUNT",
        payload: totalAmount.total 
      })
    }
    // get car information ctx
    const userInfo = {
      user_id: user._id,
      products: shoppingCart,
      status: false
    }
     // calling back end api to register the user
    await UserService.createOrder(userInfo).then(res => {
     debugger
     console.log(res,"<<<<<<<res")

     dispatch && dispatch({
      type: "RESET"
    })
     navigate('/home')
     
    })
}

  return(
    <section className="Cart">
      {shoppingCart.length ? (
        <section className="Cart__content">
          <article className="Cart__products">
            {shoppingCart.map(product => (
              <Product 
                key={product.id} 
                title={product.title}
                price={product.price.value}
                currency={product.price.currency}
                quantity={product.quantity as number}
                display_image={product.display_image}
                dispatch={dispatch as React.Dispatch<ActionType>}
                id={product.id}
              />
            ))}
          </article>

          <article className="Cart__info">
            <div className="Cart__total">
              <div className="Cart__total--subtotal">
                <h2>Subtotal</h2>
                <span>${totalAmount.subtotal}</span>
              </div>

              <div className="Cart__total--subtotal">
                <h2>Taxes</h2>
                <span>${totalAmount.taxes}</span>
              </div>

              <div className="Cart__total--total">
                <h2>Total</h2>
                <span>${totalAmount.total}</span>
              </div>
            </div>

            <ButtonCTA 
              content="Proceed to order"
              onclick={() => createOrder()}
            />
          </article>
        </section>
      ) : (
        <span className="Cart__msg">The cart is empty</span>
      )}
    </section>
  )
}