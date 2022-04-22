import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { API } from '../../config';
import { UseFetch } from '../../components/useFectch';
import Header from '../../components/header/header';
import './jugadores.css'
import { Link } from 'react-router-dom'

const cookies = new Cookies()

const Jugadores = () => {

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
    

    const [url, setUrl] = useState(API + '/api/jugador?size=1000');
    const [players, setPlayer] = useState([])
    const estado = UseFetch(url, option);
    const { cargando, data } = estado;

    async function HandleDelete(props) {
        const dataDelete = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "accesstoken": token
            },
        }
        try {
            const resp = await fetch(API+`/api/jugador/${props.target.id}`, dataDelete);
            const data = await resp.json();
            console.log(data)

        } catch (err) {
            console.log(err);
        }


    }

    const setData = (data) => {
        console.log("eeeee")
        console.log(data);
        localStorage.setItem('id',data.id);
        localStorage.setItem('name',data.name);
        localStorage.setItem('age',data.age);
        localStorage.setItem('squad_number',data.squad_number);
        localStorage.setItem('position', data.position);
        localStorage.setItem('nationality',data.nationality);
    }
    return (


        <div className='container'>  
            {<Header/>}
            {
                cargando ?
                    <h1>Cargando..</h1> :
                    (
                        <div className='player-container'>
                            {
                                data.teams.map(e => {
                                    return (
                                        <div className='individual-container'>
                                            <h1>{e.name}</h1>
                                            <p>Nacionalidad: {e.nationality}</p>
                                            <p>Posicion: {e.position}</p>
                                            <p>#: {e.squad_number}</p>
                                            <p>Edad: {e.age}</p>
                                            <div>
                                                <Link to="/update/jugador">
                                                    <button onClick={()=>setData(e)}>Editar</button>
                                                </Link>
                                                <Link to="/jugadores">
                                                    <button onClick={HandleDelete} id={e.id} data-id={e.id}>Eliminar</button>
                                                </Link>
                                            </div>
                                        </div>

                                        
                                    )
                                })
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default Jugadores