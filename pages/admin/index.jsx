import React, { useState, useEffect, useContext } from 'react'
import { aut, db } from '../../configuraciones/firebaseConfig'
import { Contexto } from './../../Contexto/ThemeContext';
import { useRouter } from 'next/router';
import { FormControl, Button } from 'react-bootstrap';

const index = () => {
    const { usuario, setUsuario } = useContext(Contexto)
    const [allsignos, setAllSignos] = useState([])
    const [descripcion, setDescripcion] = useState('')
    const [fecha, setFecha] = useState(null)
    const [datasigno, setDataSigno] = useState(null)
    const rutas = useRouter()
    const getAllSignos = async () => {
        try {
            const peticion = await db.collection('signos').get()
            const { docs } = peticion
            const nuevaLista = docs.map(i => ({ id: i.id, ...i.data() }))
            setAllSignos(nuevaLista)
        } catch (e) {
            console.log(e)
        }
    }
    const getDataSigno = async e => {
        try {
            const peticion = await db.collection('signos').doc(e.target.value).get()
            setDataSigno(peticion.data())
        } catch (e) {
            console.log(e)
        }
    }
    const actualizarSigno = async () => {
        try {
            await db.collection('signos').doc(datasigno.signo).set({
                fecha,
                descripcion,
                signo: datasigno.signo
            })
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        aut.onAuthStateChanged(user => {
            if (user && user.email === 'souldeveloper@gmail.com') {
                setUsuario(user)
                getAllSignos()
            } else {
                rutas.push('/')
            }
        })
    }, [])
    return (
        <div className='mt-5'>
            <h4>Administración del sitio</h4>
            <FormControl onChange={e => getDataSigno(e)} as='select'>
                {allsignos.map(i => (
                    <option value={i.signo}>{i.signo}</option>
                ))}
            </FormControl>
            <FormControl onChange={e => setDescripcion(e.target.value)} className='mt-3' as='textarea' rows='12' placeholder={datasigno != null ? datasigno.descripcion : ''} ></FormControl>
            <input onChange={e => setFecha(e.target.value)} className='form-control mt-3' type="date" />
            <Button onClick={actualizarSigno} className='btn btn-info btn-block mt-3'>ACTUALIZAR SIGNO</Button>
        </div>
    )
}

export default index
