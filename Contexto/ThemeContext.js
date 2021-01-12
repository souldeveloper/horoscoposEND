/*
Este es el contesto de la aplicacion, todo lo que queramos compartir
entre componentes lo almacenaremos aqui.
Como dato el hook de useEffect en este componente sera el primero que se 
inicialice dentro de nuestra aplicación
*/
import React, { createContext, useState, useEffect } from 'react'
import { aut } from '../configuraciones/firebaseConfig'
export const Contexto = createContext()
const ThemeContext = (props) => {
    const [usuario, setUsuario] = useState(null)
    const [administrador, setAdministrador] = useState('')
    useEffect(() => {
        console.log(usuario)
        aut.onAuthStateChanged(user => {
            if (user) {
                setUsuario(user)
            }
        })
    }, [])
    return (
        <Contexto.Provider value={{
            usuario,
            setUsuario,
            administrador,
            setAdministrador
        }}>
            {props.children}
        </Contexto.Provider>
    )
}

export default ThemeContext
