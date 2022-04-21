import { useState, useEffect } from 'react';

export const UseFetch = (url, headers) => {
    const [resultado, setResultado] = useState({ cargando: true, data: null });

    useEffect(() => {
        getDatos(url);
    }, [url]);

    async function getDatos(url) {
        try {
            setResultado({ cargando: true, data: null });
            const resp = await fetch(url, headers);
            const data = await resp.json();
            setResultado({ cargando: false, data });

        } catch (err) {
            console.log(err);
        }
    }

    return resultado;
}