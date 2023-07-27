import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';





function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch('https://tie-demo-api-4e7b456d2a5c.herokuapp.com/api/o/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Si la respuesta es correcta, guarda el token en sessionStorage
            console.log(JSON.stringify(data));
            const token = data.data.message;
            alert('Usuario registrado con éxito! Tu token es: ' + token);
            sessionStorage.setItem('token', token);
            alert('Inicio de sesión exitoso!');
            navigate('sesion');



        } else {
            // Aquí puedes manejar los errores
            console.error(data);
            alert('Error al iniciar sesión: ' + data.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
            <div className="bg-white p-16 rounded shadow-2xl w-2/3">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Iniciar sesión</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full px-4 py-3 rounded text-gray-700 focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full px-4 py-3 rounded text-gray-700 focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-3 rounded bg-blue-600 text-white"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <p className="mt-5">No tienes una cuenta? <Link to="/register" className="text-blue-500">Regístrate!</Link></p>
            </div>
        </div>
    );
}

export default Login;
