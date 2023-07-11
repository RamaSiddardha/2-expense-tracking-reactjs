import { createContext, useState } from "react";

const LoginContext = createContext({
    token : '' ,
    loggedin : false,
    profile : false,
    login : (token)=>{},
    logout : ()=>{}
})

export const LoginContextProvider = props =>{

    const [token, setToken] = useState('')

        const isLogin = !!token

const loginHandler = token =>{
    setToken(token)
}

const logoutHandler = ()=>{

}


    let value = {
        token : token,
        loggedin : isLogin,
        profile : false,
        login : loginHandler,
        logout : logoutHandler
    }
    return <LoginContext.Provider value={value}>
        {props.children}
    </LoginContext.Provider>
}

export default LoginContext