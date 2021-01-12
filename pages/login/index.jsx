import React, { useState, useContext } from 'react'
import { FormControl, Row, Col, Container, Button, Alert } from 'react-bootstrap'
import Menu from '../../components/Menu'
import { aut, googleProvider } from '../../configuraciones/firebaseConfig'
import { Contexto } from './../../Contexto/ThemeContext';
import { useRouter } from 'next/router'
const index = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [errorRegistro, setErrorRegistro] = useState(null)
    const rutas = useRouter()
    const { usuario, administrador, setUsuario, setAdministrador } = useContext(Contexto)
    const loginGoogle = async () => {
        try {
            const log = await aut.signInWithPopup(googleProvider)
            if (log.operationType === 'signIn') {
                const { user } = log
                setUsuario(user)
                rutas.push('/')
            }
        } catch (e) {
            console.log(e)
        }
    }
    const loginEmailAndPassword = async () => {
        try {
            await aut.signInWithEmailAndPassword(email, password)
            aut.onAuthStateChanged(user => {
                if (user) {
                    setUsuario(user)
                    rutas.push('/')
                }
            })
        } catch (e) {
            console.log(e)
            if (e.code === 'auth/invalid-email') {
                setError('Lo siento el formato del Email es invalido')
            } if (e.code === 'auth/user-not-found') {
                setError('No hay ningun usuario con ese Email en nuestra base de datos')
            } if (e.code === 'auth/wrong-password') {
                setError('Contraseña invalida para este usuario o no existe')
            }
        }
    }
    const registroUsuarioEmailPassword = async () => {
        try {
            await aut.createUserWithEmailAndPassword(email, password)
            aut.onAuthStateChanged(user => {
                if (user) {
                    setUsuario(user)
                    rutas.push('/')
                }
            })
        } catch (e) {
            console.log(e)
            if (e.code === 'auth/argument-error') {
                setErrorRegistro('Los campos deben de estar completos')
            } if (e.code === 'auth/invalid-email') {
                setErrorRegistro('El formato del email debe de ser valido')
            } if (e.code === 'auth/email-already-in-use') {
                setErrorRegistro('Esta cuenta de email ya existe')
            } if (e.code === 'auth/weak-password') {
                setErrorRegistro('La password debe de tener 6 caracteres')
            }
        }
    }
    return (
        <div>
            <Container>
                <Menu />
                <Row className='mt-3'>
                    <Col sm={12} md={6} lg={6}>
                        <h2>Entrar con tu cuenta</h2>
                        <FormControl onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' className='mt-3' />
                        <FormControl onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' className='mt-3' />
                        <Button onClick={loginEmailAndPassword} className='btn btn-success btn-block mt-3'>LOGIN</Button>
                        <hr />
                        <Button onClick={loginGoogle} className='btn btn-info btn-block mt-3'>LOGIN CON TU CUENTA DE GOOGLE</Button>
                        {error ? (
                            <Alert className='alert alert-danger mt-5'>{error}</Alert>
                        ) : ('')}
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <h2>Registrar nuevo usuario</h2>
                        <FormControl onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' className='mt-3' />
                        <FormControl onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' className='mt-3' />
                        <Button onClick={registroUsuarioEmailPassword} className='btn btn-success btn-block mt-3'>REGISTRAR CUENTA</Button>
                        {errorRegistro ? (
                            <Alert className='alert alert-danger mt-5'>{errorRegistro}</Alert>
                        ) : ('')}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default index
