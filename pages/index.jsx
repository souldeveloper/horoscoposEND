
import Menu from '../components/Menu'
import { Contexto } from '../Contexto/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { db } from '../configuraciones/firebaseConfig'
import { FormControl, Button } from 'react-bootstrap'




export default function Home() {
  const { usuario, setUsuario } = useContext(Contexto)
  const [allsignos, setAllsignos] = useState([])
  const [signoseleccionado, setSignoSeleccionado] = useState(null)
  const [datasinos, setDatasignos] = useState(null)
  const getAllSignos = async () => {
    try {
      const peticion = await db.collection('signos').get()
      const { docs } = peticion
      const lista = docs.map(i => ({ id: i.id, ...i.data() }))
      setAllsignos(lista)
    } catch (e) {
      console.log(e)
    }
  }
  const getDataSigno = async () => {
    try {
      const peticion = await db.collection('signos').doc(signoseleccionado).get()
      setDatasignos(peticion.data())
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAllSignos()
  }, [])
  return (
    <>
      <Menu />
      <div>
        {usuario != null ? (
          <h4>Bienvenido : {usuario.email}</h4>
        ) :
          ('')}
      </div>
      <div>
        <h4>Tu Horoscopo Online</h4>
        <p>Bienvenido a tu Horoscopo Online, aqui podras encontrar la información
        de tu horoscopo actualizada dia a dia para poder tener una mejor experiencia.
        </p>
        <h5>Seleccion tu Signo y pulsa en VER MI DESTINO</h5>
        <FormControl onChange={e => setSignoSeleccionado(e.target.value)} as='select'>
          {allsignos.map(i => (
            <option value={i.signo}>{i.signo}</option>
          ))}
        </FormControl>
        <Button onClick={getDataSigno} className='btn btn-succes mt-3 btn-block'>VER MI DESTINO</Button>
        {datasinos != null ?
          (
            <div className='mt-3'>
              <h2>{datasinos.signo}</h2>
              <p>{datasinos.descripcion}</p>
              <small>{datasinos.fecha}</small>
            </div>
          ) :
          (<span className='mt-3'>Seleccina tu signo para poder ver tu destino</span>)}
      </div>


    </>
  )
}
