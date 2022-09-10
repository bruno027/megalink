import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import Agenda from './pages/Agenda'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './pages/Agenda/agenda.css'




function RoutesApp(){
    return(
        <BrowserRouter>
            
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/agenda' element={<Agenda/>}/>
            </Routes>
                   
        </BrowserRouter>

    );
}

export default RoutesApp;