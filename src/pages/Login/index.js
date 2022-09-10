import React, {useContext, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {UserContext} from '../../contexts/user'


function Login(){

    const {login} = useContext(UserContext);

    const [email,setEmail] = useState([]);
    const [senha, setSenha] = useState([]);

    async function entrar(){
        
        let data={
            email,
            senha
        }

        await login(data)

    }
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={6}>
                        <Card>
                            <Card.Header as="h5">Realize o Login</Card.Header>
                                <Card.Body>

                                    <Form.Label htmlFor="inputEmail">Email</Form.Label>
                                    <Form.Control type="email" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)}/>

                                    <Form.Label htmlFor="inputSenha">Senha</Form.Label>
                                    <Form.Control type="password" id="inputSenha" aria-describedby="passwordHelpBlock" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                                    
                                <br></br>
                                <Button variant="primary" onClick={()=>entrar(email,senha)}>Entrar</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={3}></Col>
                </Row>


            </Container>
            
            

        </div>
    )

}

export default Login;