import { useState, createContext } from "react";

import {api} from '../services/apiClient'

import {destroyCookie, setCookie,parseCookies} from 'nookies'
import  { Redirect } from 'react-router-dom'


 
export const UserContext = createContext({});

export function signOut(){
    try{
        destroyCookie(undefined, '@megalink.token')
        navigator('/')
    }catch{
        console.log('error ao deslogar')
    }
}


 function UserProvider({children}){
    let userInteface = {
        id:0,
        nome:'',
        email:'',
        cargo_id:0,
        acesso:0
      }
    const [funcionario,setFuncionario] = useState([userInteface])

    async function login({email,senha}){
        try{
            const response = await api.post('/entrar', {
                email,
                senha
            })

            //console.log(response.data)
            const {id,nome,cargo_id, acesso, token} = response.data;
            setCookie(undefined,'@megalink.token',token, {
                maxAge: 60*60*24*30,
                path:"/"
            })

            setFuncionario({
               id:id,
               nome:nome,
               cargo_id:cargo_id,
               acesso:acesso,
               email:email 
            })
            

            api.defaults.headers['Authorization'] = `Bearer ${token}`
            window.location.href = 'http://localhost:3000/home'

        }catch(err){
            console.log("erro ao acessar",err)
        }
    }

    return(
        <UserContext.Provider value={{login}}>
            {children}
        </UserContext.Provider>

    )
}
export default UserProvider