import { Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import { useState } from "react"
import Alerta from "../components/Alerta";

export default function OlvidePassword() {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === '' || email.length < 6) {
            setAlerta({msg: 'El email es obligatorio', error: true})
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });
            
            setAlerta({
                msg: data.msg
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
                    Recupera tu acceso y no pierdas <span className="text-black">tus pacientes</span>
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
                    <input
                        type="submit" 
                        value='Enviar'
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
                            to="/registrar"
                            className='block text-center my-5 text-gray-500'
                        >
                            ¿No tienes una cuenta? Registrate
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}