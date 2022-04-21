import React from 'react';
import './jugadores.css'

const Jugadores = (jugador) => {
    return (
            <tr className='jugador-tr'>

                <td>{jugador.dataJugadores.name}</td>
                <td>{jugador.dataJugadores.nationality}</td>
                <td>{jugador.dataJugadores.position}</td>
                <td>{jugador.dataJugadores.squad_number}</td>
                <td>{jugador.dataJugadores.age}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                    <button>Ver Jugadores</button>
                    {/* <button onClick={ShowPlayers} id={p.id} data-id={p.id}>Mostrar Jugadores</button>*/}                
                </td>
            </tr>
    )
}
export default Jugadores