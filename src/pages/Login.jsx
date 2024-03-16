import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState('');
    
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === '' || password === '') {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true});
            return
        }

        if(password.length < 6) {
            setAlerta({msg: 'El password debe tener mas de 6 caracteres', error: true})
            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
            localStorage.setItem('token', data.token);

            setAuth(data)
            navigate('/admin')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }


    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Inicia Sesion y Administra tus <span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                <Alerta alerta={alerta} />
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="text-gray-600 uppercase block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="ejemplo@email.com"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="text-gray-600 uppercase block text-xl font-bold">
                            Password
                        </label>
                        <input 
                            type="password" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit" 
                        value='Iniciar Sesion'
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <div>
                    <nav className='mt-10 lg:flex lg:justify-between'>
                        <Link 
                            to="/registrar"
                            className='block text-center my-5 text-gray-500'
                        >
                            ¿No tienes una cuenta? Registrate
                        </Link>
                        <Link 
                            to="/olvide-password"
                            className='block text-center my-5 text-gray-500'
                        >
                            Olvide mi password
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}