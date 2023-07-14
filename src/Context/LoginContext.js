import { createContext, useState } from "react";

const LoginContext = createContext({
    token : '' ,
    loggedin : false,
    profile : false,
    login : (token)=>{},
    logout : ()=>{},
    profileUpdate : ()=>{},
    users : {}

})

export const LoginContextProvider = props =>{

    const [token, setToken] = useState('')
    const [update, setUpdate]= useState(false)
    const [user, setUser]= useState({})

        const isLogin = !!token

const loginHandler =async(token) =>{
    setToken(token)
    const data = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk",{
        method: 'post',
        body: JSON.stringify({
          idToken: token}),
          headers :{"Content-Type": "application/json"}
      })

const profileData = await data.json()
      if(profileData.users[0].displayName){
        setUpdate(true)
        setUser((prv)=>{
            return {...prv,displayName: profileData.users[0].displayName}
        })
      }
    //   console.log(profileData)
}

const ProfileupdateHandler = () =>{

    setUpdate(true)

}

const logoutHandler = ()=>{

}


    let value = {
        token : token,
        loggedin : isLogin,
        profile : update,
        login : loginHandler,
        logout : logoutHandler,
        profileUpdate : ProfileupdateHandler,
        users : user
    }
    return <LoginContext.Provider value={value}>
        {props.children}
    </LoginContext.Provider>
}

export default LoginContext