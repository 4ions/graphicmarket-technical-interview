import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { API } from '../../config';
import './equipos.css';
import Cookies from 'universal-cookie';
import { UseFetch } from '../../components/useFectch';
import { Cart } from './components/cards/cardTeam';
import Header from '../../components/header/header';
import {CgMathPlus} from 'react-icons/cg'

const cookies = new Cookies();



const Equipos = () => {

    const token = cookies.get('accesstoken');
    if (typeof token === 'undefined') {
        window.location.href = "/";
        
    }

    const option = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "accesstoken": token
        }
    }
    
    const [url, setUrl] = useState(API + '/api/equipo?size=1000');
    const estado = UseFetch(url, option);
    const { cargando, data } = estado;
    
    !cargando ? cookies.set('equipos', data.teams, {path:'/'}) : console.log("Cargando..")
    
    return (
        <div className='equipo-container'>
            <Header/>
            <div className='equipo-content'>
                    <h2>Equipos</h2>
                    <table className='teams-table'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Liga</th>
                                <th>Pais</th>
                                <th>Acciones</th>
                            </tr>
                            
                    </thead>

                        {
                            cargando
                                ?
                                (<h1>Cargando...</h1>)
                            :
                            (data.teams.map(p => {
                                return (
                                    <tbody className='tbody-table' >
                                        <Cart data={p} />
                                    </tbody>
                                    
                                    )
                            })
                            )
                    }
                </table>
                <Link to="/create/equipo">
                    <button className='button-new' icon={<CgMathPlus />}>+ Agregar nuevo equipo <Link to="/create/equipo"/></button>
                </Link>
            </div>
        </div>
    )
}

export default Equipos;

