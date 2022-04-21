import React from 'react';
import { Cart } from '../cards/cardTeam';
import './teams.css';

export const AllTeams = ({ results }) => {
    
    return (
        <div className='container'>
             <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Liga</th>
                                <th>Country</th>
                                <th>Acciones</th>
                            </tr>
                            
                        </thead>
                        {
                            results.map(p => {
                                return (
                                 <tbody className='item' key={p.id}>
                                <Cart data={p}/>
                                </tbody>
                                )
                            })
                        }
                    </table>
            
        </div>
    )
}