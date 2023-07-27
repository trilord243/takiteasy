import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch('https://tie-demo-api-4e7b456d2a5c.herokuapp.com/api/o/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Si la respuesta es correcta, guarda el token en sessionStorage
            sessionStorage.setItem('token', data.token);
            alert('Usuario registrado con éxito!');
        } else {
            // Aquí puedes manejar los errores
            console.error(data);
            alert('Error al registrar usuario: ' + data.error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
            <div className="bg-white p-16 rounded shadow-2xl w-2/3">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Crear una nueva cuenta</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        className="w-full px-4 py-3 rounded text-gray-700 focus:outline-none focus:shadow-outline"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
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
                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        className="w-full px-4 py-3 rounded text-gray-700 focus:outline-none focus:shadow-outline"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-3 rounded bg-blue-600 text-white"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="mt-5">Ya tienes una cuenta? <Link to="/login" className="text-blue-500">Inicia sesión!</Link></p>
            </div>
        </div>
    );
}

export default Register;
