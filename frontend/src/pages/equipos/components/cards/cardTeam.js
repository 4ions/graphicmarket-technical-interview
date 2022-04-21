import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { API } from '../../../../config';
import { useLocation } from 'react-router-dom';
import './cardTeam.css';
import { Link } from 'react-router-dom';

const cookies = new Cookies()

export const Cart = (teamInfo) => {
    // const sampleLocation = useLocation();
    // console.log(sampleLocation);
    const token = cookies.get('accesstoken');

    const setData = (data) => {
        let { name, league, country, id } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('league', league);
        localStorage.setItem('country', country);
    }
    async function HandleDelete(props) {
        const dataDelete = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "accesstoken": token
            },
        }
        try {
            console.log(props.target.id)
            const resp = await fetch(API+`/api/equipo/${props.target.id}`, dataDelete);
            const data = await resp.json();

        } catch (err) {
            console.log(err);
        }


    }
    
    return (
        <>
            <tr className='cards'>
                <td>{teamInfo.data.name}</td>
                <td>{teamInfo.data.league}</td>
                <td>{teamInfo.data.country}</td>
                <td className='card-button'>
                    <Link to="/update/equipo">
                        <button className='edit-button' onClick={() => {setData(teamInfo.data)}}>Editar</button>
                    </Link>
                    <button onClick={HandleDelete} id={teamInfo.data.id} data-id={teamInfo.data.id} className='button-delete'>Eliminar</button>
                    
                </td>

            </tr>
        </>
    )
}