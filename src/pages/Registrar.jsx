import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

export default function Registrar() {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetir, setRepetir] = useState('');
    
    const [alerta, setAlerta] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([ nombre, email, password, repetir ].includes('')) {
            setAlerta({ msg: 'Hay campos vacios', error: true })
            return
        }

        if(password !== repetir) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true })
            return
        }

        if(password.length < 6) {
            setAlerta({ msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true })
            return
        }

        setAlerta('')

        try {
            await clienteAxios.post('/veterinarios', { nombre, email, password });

            setAlerta({
                msg: 'Creado correctamente, revisa tu email',
                error: false
            })
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
                    Crea tu cuenta y administra <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                <Alerta alerta={alerta} />
                <form onSubmit={ handleSubmit }>
                    <div className="my-5">
                        <label className="text-gray-600 uppercase block text-xl font-bold">
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            placeholder="Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={ e => setNombre(e.target.value) }
                        />
                    </div>
                    <div className="my-5">
                        <label className="text-gray-600 uppercase block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="ejemplo@email.com"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={ e => setEmail(e.target.value) }
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
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </div>
                    <div className="my-5">
                        <label className="text-gray-600 uppercase block text-xl font-bold">
                            Repetir password
                        </label>
                        <input 
                            type="password" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetir}
                            onChange={ e => setRepetir(e.target.value) }
                        />
                    </div>
                    <input 
                        type="submit" 
                        value='Registrar'
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <div>
                    <nav className='mt-10 lg:flex lg:justify-between'>
                        <Link 
                            to="/"
                            className='block text-center my-5 text-gray-500'
                        >
                            ¿Ya tienes una cuenta? Inicia sesion
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