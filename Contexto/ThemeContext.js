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
