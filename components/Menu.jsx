import { Navbar, Nav, Button } from 'react-bootstrap'
import { useContext, useEffect } from 'react'
import { Contexto } from './../Contexto/ThemeContext';
import { aut } from '../configuraciones/firebaseConfig'
import { useRouter } from 'next/router'
const Menu = () => {
    const { usuario, setUsuario } = useContext(Contexto)
    const rutas = useRouter()
    const cerrarSesion = () => {
        aut.signOut()
        rutas.push('/login')
    }
    useEffect(() => {
        console.log(usuario)
        aut.onAuthStateChanged(user => {
            if (user) {
                setUsuario(user)
            } else {
                setUsuario(null)
            }
        })
    }, [])
    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Tu Horoscopo Online</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Inicio</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    {usuario != null ? (
                        <Button onClick={cerrarSesion} className='btn btn-danger'>cerrar sesion</Button>
                    ) : ('')}

                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}
export default Menu