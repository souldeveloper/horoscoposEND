import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css' //Importamos Bootstrap
import { Container } from 'react-bootstrap' //Importamos componentes de reac-bootstrap
import Contexto from '../Contexto/ThemeContext' //Importamos el Contexto de nuesrta App
function MyApp({ Component, pageProps }) {
  return (

    <Contexto>
      <Container>
        <Component {...pageProps} />
      </Container>

    </Contexto>

  )
}

export default MyApp
