import { Fragment, useRef, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom"
import { CheckoutInput } from "../../Components/CheckoutInput";
import { ButtonCTA } from "../../Components/ButtonCTA";
import { SocialMedia } from "../../Containers/SocialMedia";
import { ILocalState, initialLocalState } from "./types";
import { PageProps } from "../../globalTypes";
import  UserService  from '../../Services/UserService';

export const Login: React.FC<PageProps> = ({ state, dispatch}): JSX.Element => {
  const navigate: NavigateFunction = useNavigate()
  const [localState, setLocalState] = useState<ILocalState>(initialLocalState)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const errorRef = useRef<HTMLSpanElement>(null)
  const handleConfirmation = () => {
    setIsModalOpen(false)
    if(dispatch){
      dispatch({ type: "FILTER", payload: "All items" })
      dispatch({ type: "RESET" })
    }
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
    navigate("/")
  }

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setLocalState(prev => ({
      ...prev,
      [evt.target.id]: evt.target.value
    }))
  }

  const handleSubmit = async() => {
    let flag: boolean = true

    Object.values(localState).forEach(value => {
      if(!value) flag = false
    })

    if(flag){
      errorRef.current?.classList.remove("error")
      // calling back end api to register the user
      await UserService.loginUser(localState).then(res => {
        if(dispatch){
          dispatch({ type: "SETUSER", payload: res.data.user })
          dispatch({ type: "SETTOKEN", payload: res.data.token })
        }
      })
      setIsModalOpen(true)
    }else{
      errorRef.current?.classList.add("error")
      window.scroll({
        top: 10000,
        behavior: 'smooth'
      });
    }
  }

  return(
    <Fragment>
      <section className="Register">
        <form className="Register__form">
            <CheckoutInput
            name="User Name"
            id="username"
            type="text"
            value={localState.username}
            placeholder="username / email"
            onchange={handleChange}
          />
            <CheckoutInput
            name="Password"
            id="password"
            type="password"
            value={localState.password}
            placeholder="john@doe.com"
            onchange={handleChange}
          />
          <span className="Checkout__error" ref={errorRef}>
            Please filled all the text boxes above
          </span>
        </form>
      
        <button className="Checkout__cta" onClick={handleSubmit}>
          <h2>Login</h2>
        </button>
      </section>

      {isModalOpen && (
        <section className="Modal">
          <div className="Modal__card">
            <h2>
              <span>The author of this app is not accountable for the use of the provided information :')</span>
              Follow me on my social media to know more about my work
            </h2>
            <div className="Modal__card--footer">
              <SocialMedia />
              <ButtonCTA content="OK" onclick={handleConfirmation} />
            </div>
          </div>
        </section>
      )}
    </Fragment>
  )
}