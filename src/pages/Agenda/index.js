import Sidebar from "../../components/Sidebar";

import { useState, useEffect } from "react";

import './agenda.css'
import { Button, Card, Container, Row, Col, Form, Table, Modal } from "react-bootstrap";
import React,{setState} from "react";
import { setupAPIClient } from "../../services/api";

import {toast} from 'react-toastify';
import { api } from "../../services/apiClient";


function Agenda(){
    const [data,setData]= useState('');
    const [buscarData,setBuscarData]= useState('');
    const [dadosAgenda,setDadosAgenda] = useState([]);

    const [modalAdicionar,setModalAdicionar] = useState(false);
    const [modalAlterar,setModalAlterar] = useState(false);
    const [modalAlterarDados,setModalAlterarDados] = useState({
        
    })

    const [tecnicos,setTecnicos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [forms,setForms] = useState({
        hora:'',
        codigo:'',
        nome:'',
        bairro:'',
        tipo:0,
        observacao:'',
        data:'',
        situacao:0,
        user_id:0,
        tecnico:'',
        id:''



    });
    const[teste,setTeste]=useState('')


    const modalAdicionarClose = ()=> setModalAdicionar(false);
    const modalAdicionarShow = ()=> setModalAdicionar(true);

    const modalAlterarClose = ()=> setModalAlterar(false);
    function modalAlterarShow(){
        setModalAlterar(true);


    }

    async function listarAgenda(){
        
        
        console.log('dataState',buscarData);
        const apiClient = setupAPIClient();
        const dAgenda = await apiClient.get('/agenda',{params:{data:buscarData}});
        console.log(dAgenda.data);
        const lista = dAgenda.data;
        const novaLista = lista.map((item)=>{
            return {id:item["user_id"],nome:item["user"]["nome"]}
        });
        const novaLista2 = novaLista.filter(function(a){
            

            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);


        },Object.create(null))

       
        setDadosAgenda(lista);
        setTecnicos (novaLista2);

        
    }
    function abrirModalAlterar(){
        return (
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
        
              <Modal.Body>
                <p>Modal body text goes here.</p>
              </Modal.Body>
        
              <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
              </Modal.Footer>
            </Modal.Dialog>
          );
    }

    async function listarUsers(){
        const apiClient = setupAPIClient();
        const usersLista = await apiClient.get('/users');
        console.log("todos funcionarios", usersLista.data);
        setUsuarios(usersLista.data);
    }

    async function pegaDataAtual(){
        
        const d = new Date();
        const daata = ('0'+d.getDate()).slice(-2)+'/'+('0'+(parseInt( d.getMonth())+1)).slice(-2)+'/'+d.getFullYear();
        setData( daata);
        setBuscarData(daata);
        
    }
    useEffect(()=>{
        pegaDataAtual();
        listarUsers();
        listarAgenda();
    },[]);

   
    useEffect(()=>{
        listarAgenda();
    },[buscarData])

    

    async function handleSubmit(e){
        e.preventDefault();

        try{
            if  (forms.hora === '' || forms.codigo === '' || forms.nome === '' || forms.bairro === '' || forms.tipo === 0 || forms.data === '' || forms.user_id === 0){
                toast.warning("Está faltando algo, revise os dados!")
            }else{
                const apiClient = setupAPIClient();
                await apiClient.post('/agenda', forms);
                console.log("agenda cadastrada");
                toast.success("O assinante foi adicionado a agenda!");
                setForms({hora:'',codigo:'',nome:'',bairro:'',tipo:0,
                observacao:'',data:'',situacao:0,user_id:0,id:0,tecnico:''})
                setModalAdicionar(false);
                await setBuscarData(forms.data);
                setData(forms.data);
                listarAgenda();
            }
            

        }catch(err){
            console.log('error',err);
            toast.error("Erro ao adicionar o assinante na agenda");

        }
    
    }

    async function alterarSubmit(e){
        e.preventDefault();
        try{
            if  (forms.hora === '' || forms.codigo === '' || forms.nome === '' || forms.bairro === '' || forms.tipo === 0 || forms.data === '' || forms.user_id === 0){
                toast.warning("Está faltando algo, revise os dados!")
            }else{
                const apiClient = setupAPIClient();
                await apiClient.put('/agenda', forms);
                toast.success("Agenda alterada!");
                setForms({hora:'',codigo:'',nome:'',bairro:'',tipo:0,
                observacao:'',data:'',situacao:0,user_id:0,id:0,tecnico:''})
                setModalAlterar(false);
                await setBuscarData(forms.data);
                setData(forms.data);
                listarAgenda();
            }
            

        }catch(err){
            console.log('error',err);
            toast.error("Erro ao alterar agenda");

        }

    }

    function botaoBuscar(){
        setBuscarData(data);
        listarAgenda();

    }

    async function alterarSituacao(i){
        try{
            const apiClient = setupAPIClient();
            await apiClient.put('/agenda', {id:forms.id,situacao:i});
            toast.success("Situação alterada!");
            setForms({hora:'',codigo:'',nome:'',bairro:'',tipo:0,
                observacao:'',data:'',situacao:0,user_id:0,id:0,tecnico:''})
            setModalAlterar(false);
            await setBuscarData(forms.data);
            setData(forms.data);
            listarAgenda();
 

        }catch(err){
            console.log('error',err);
            toast.error("Erro ao alterar situacao da agenda");
        }
    }

    async function excluirAgenda(){
        try{
            const apiClient = setupAPIClient();
            await apiClient.delete('/agenda', {params:{agenda_id:forms.id}});
            toast.success("Agenda excluida!");
            setForms({hora:'',codigo:'',nome:'',bairro:'',tipo:0,
                observacao:'',data:'',situacao:0,user_id:0,id:0,tecnico:''})
            setModalAlterar(false);
            await setBuscarData(forms.data);
            setData(forms.data);
            listarAgenda();
        }catch(err){
            console.log('error',err);
            toast.error("Erro ao excluir agenda");
        }
    }

    


    return (
        <div>

            <Container fluid>
                <Row>
                    <h1>Agenda</h1>
                </Row>
                <Row>
                    <Col xs={4}></Col>
                    <Col xs={3}>
                        <Form.Label>Selecione a data</Form.Label>
                        <Form.Control type="text" style={{width:250}} value={data} onChange={(e)=>setData(e.target.value)}></Form.Control>
                        <Button variant="primary" type="button" onClick={botaoBuscar}>Buscar</Button>
                    </Col>
                    <Col xs={5}></Col>
                    
                </Row>

                <Row>

                    <Button variant="secondary" onClick={modalAdicionarShow}>Adicionar agenda</Button>
                    <Modal show={modalAdicionar} onHide={modalAdicionarClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Adicionar agenda</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>

                        <Modal.Body>
                                <Row>
                                    <Col xs={3}>
                                       <Form.Control type="text" placeholder="00:00" name="hora" value={forms.hora} onChange={(e)=>setForms({...forms, hora:e.target.value})}/> 
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control type="text" placeholder="xxxx-xx-xx" name="data" value={forms.data} onChange={(e)=>setForms({...forms,data:e.target.value})}></Form.Control>
                                    </Col>
                                    <Col xs={5}>
                                        <Form.Select name="tecnico" value={forms.user_id} onChange={(e)=>setForms({...forms, user_id:parseInt(e.target.value)})}>
                                            <option value="0"></option>
                                            {usuarios.map((usuario)=>{
                                                return(
                                                    <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                                                )
                                            })}
                                            
                                        </Form.Select>

                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col>
                                        <Form.Control type="text" placeholder="CODIGO" name="codigo" value={forms.codigo} onChange={(e)=>setForms({...forms, codigo:e.target.value})}/> 
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="NOME" value={forms.nome} name="nome" onChange={(e)=>setForms({...forms, nome:e.target.value})}/> 
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="BAIRRO" name="bairro" value={forms.bairro} onChange={(e)=>setForms({...forms, bairro:e.target.value})}/> 
                                    </Col>

                                </Row>
                                <br/>
                                <Row>
                                    <Col>
                                        <Form.Check inline label="INSTALAÇÃO" name="group1" type="radio" onClick={()=>setForms({...forms,tipo:1})}/>
                                        <Form.Check inline label="MUDANÇA DE ENDEREÇO" name="group1" type="radio" onClick={()=>setForms({...forms,tipo:2})}/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>

                                    <Form.Control as="textarea" rows={3} placeholder="OBSERVAÇÃO" name="observacao" value={forms.observacao} onChange={(e)=>setForms({...forms, observacao:e.target.value})}/>


                                </Row>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={modalAdicionarClose}>Fechar</Button>
                            <Button variant="primary" type="submit">Adicionar</Button>
                        </Modal.Footer>
                        
                        </Form>



                    </Modal>
                    

                </Row>

                <Row>
                    <Card>
                        <Card.Header>{buscarData}</Card.Header>
                        <Card.Body>
                            {tecnicos.map((tecnico)=>{
                                return(
                                    <article key={tecnico.id}>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Hora</th>
                                                    <th>{tecnico.nome}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dadosAgenda.map((agenda)=>{
                                                    if(agenda.user_id === tecnico.id){
                                                        
                                                        return(
                                                        
                                                            <tr key={agenda.id} className={'s'+agenda.situacao} >
                                                                <td>{agenda.hora}</td>
                                                                <td>({agenda.codigo}) {agenda.nome} - {agenda.bairro} - {agenda.tipo}</td>
                                                                <td><Button type="button" onClick={()=>{
                                                                    setModalAlterar(true);
                                                                    setForms({
                                                                            nome:agenda.nome,
                                                                            bairro:agenda.bairro,
                                                                            hora:agenda.hora,
                                                                            user_id:agenda.user_id,
                                                                            data:agenda.data,
                                                                            tecnico:tecnico.nome,
                                                                            codigo:agenda.codigo,
                                                                            tipo:agenda.tipo,
                                                                            observacao:agenda.observacao,
                                                                            situacao:agenda.situacao,
                                                                            id:agenda.id
                                                                    });
                                                                }}>Alterar</Button></td>
                                                            </tr>

                                                            
                                                        )
                                                    }
                                                    
                                                })}

                                                <Modal show={modalAlterar} onHide={modalAlterarClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Alterar agenda</Modal.Title>
                                                    </Modal.Header>
                                                    <Form onSubmit={alterarSubmit}>

                                                    <Modal.Body>
                                                            <Row>
                                                                <Col xs={3}>
                                                                <Form.Control type="text" placeholder="00:00" name="hora" value={forms.hora} onChange={(e)=>setForms({...forms, hora:e.target.value})}/> 
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Form.Control type="text" placeholder="xxxx-xx-xx" name="data" value={forms.data} onChange={(e)=>setForms({...forms,data:e.target.value})}></Form.Control>
                                                                </Col>
                                                                <Col xs={5}>
                                                                    <Form.Select name="tecnico" value={forms.user_id} onChange={(e)=>setForms({...forms, user_id:parseInt(e.target.value)})}>
                                                                        <option value="0"></option>
                                                                        {usuarios.map((usuario)=>{
                                                                            return(
                                                                                <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                                                                            )
                                                                        })}
                                                                        
                                                                    </Form.Select>

                                                                </Col>
                                                            </Row>
                                                            <br/>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Control type="text" placeholder="CODIGO" name="codigo" value={forms.codigo} onChange={(e)=>setForms({...forms, codigo:e.target.value})}/> 
                                                                </Col>
                                                                <Col>
                                                                    <Form.Control type="text" placeholder="NOME" value={forms.nome} name="nome" onChange={(e)=>setForms({...forms, nome:e.target.value})}/> 
                                                                </Col>
                                                                <Col>
                                                                    <Form.Control type="text" placeholder="BAIRRO" name="bairro" value={forms.bairro} onChange={(e)=>setForms({...forms, bairro:e.target.value})}/> 
                                                                </Col>

                                                            </Row>
                                                            <br/>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Check inline label="INSTALAÇÃO" name="group1" type="radio" onClick={()=>setForms({...forms,tipo:1})}/>
                                                                    <Form.Check inline label="MUDANÇA DE ENDEREÇO" name="group1" type="radio" onClick={()=>setForms({...forms,tipo:2})}/>
                                                                </Col>
                                                            </Row>
                                                            <br/>
                                                            <Row>

                                                                <Form.Control as="textarea" rows={3} placeholder="OBSERVAÇÃO" name="observacao" value={forms.observacao} onChange={(e)=>setForms({...forms, observacao:e.target.value})}/>


                                                            </Row>

                                                    </Modal.Body>

                                                    <Modal.Footer>
                                                        <Button variant="success" onClick={()=>alterarSituacao(1)} type="button">Concluir</Button>
                                                        <Button variant="warning" onClick={()=>alterarSituacao(2)} type="button">Não concluido</Button>
                                                        <Button variant="danger" onClick={excluirAgenda}>Excluir</Button>
                                                        <Button variant="primary" type="submit">Salvar</Button>
                                                    </Modal.Footer>
                                                    
                                                    </Form>



                                                </Modal>
                                                
                                                
                                            </tbody>
                                        </Table>
                                    </article>
                                )

                            })}
                            
                            
                        </Card.Body>
                    </Card>

                </Row>



            </Container>
            
            
            
            
            
            
            

        </div>
    )

}

export default Agenda;