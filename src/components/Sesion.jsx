import React, { useEffect, useState } from 'react';

function Session() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null); // Añadimos un estado para el error

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('token');

            const response = await fetch('https://tie-demo-api-4e7b456d2a5c.herokuapp.com/api/o/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUserData(data.data); // Aquí estamos extrayendo los datos del usuario del objeto devuelto
            } else {
                // Si algo sale mal, establecemos el error en el estado
                setError(data.error || 'Algo salió mal al obtener los datos del usuario.');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Bienvenido, {userData.name}</h1>
            <p>Tu correo electrónico es: {userData.email}</p>
        </div>
    );
}

export default Session;
