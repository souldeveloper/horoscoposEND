/*
Este es el componente Menu, Es independiente de toda la app por 
que necesitamos que este componente este visible dentro de las partes
de la aplicación que nosotros creamos convenientes
*/

import { Navbar, Nav, Button } from "react-bootstrap"; //Componentes de react-bootstrap
import { useContext, useEffect } from "react";
import { Contexto } from "./../Contexto/ThemeContext"; //Contest API de la app
import { aut } from "../configuraciones/firebaseConfig"; //configuracion de firebase
import { useRouter } from "next/router"; //Use Router de next
const Menu = () => {
	const { usuario, setUsuario } = useContext(Contexto);
	const rutas = useRouter();
	const cerrarSesion = () => {
		//Boton de cerrar sesion de usuario
		aut.signOut();
		rutas.push("/login");
	};
	useEffect(() => {
		//Hook para comprobar cuando iniciamos el componente
		console.log(usuario);
		aut.onAuthStateChanged((user) => {
			// comprobamos si hay cambios en la autentificacion
			if (user) {
				setUsuario(user);
			} else {
				setUsuario(null);
			}
		});
	}, []);
	return (
		<Navbar bg='light' expand='lg'>
			<Navbar.Brand href='#home'>Tu Horoscopo Online</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link href='/'>Inicio</Nav.Link>
					<Nav.Link href='/login'>Login</Nav.Link>
					{usuario != null ? (
						<Button onClick={cerrarSesion} className='btn btn-danger'>
							cerrar sesion
						</Button>
					) : (
						""
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
export default Menu;
