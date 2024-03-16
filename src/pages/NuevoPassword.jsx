import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

export default function NuevoPassword() {

    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.length < 6) {
            setAlerta({
                msg: 'El password debe ser minimo de 6 caracteres',
                error: true
            })
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password })
            
            setAlerta({msg: data.msg, error: false})
            setPasswordModificado(true);
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({
                    msg: 'Coloca tu nuevo password',
                    error: false
                })

                setTokenValido(true);
            } catch (error) {
                setAlerta({ msg: 'Hubo un error en el enlace', error: true })
            }
        }

        comprobarToken();
    }, [])

    return(
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Restablece tu password y no pierdas acceso a <span className="text-black">tus pacientes</span>
                </h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                <Alerta alerta={alerta} />
                {
                    tokenValido &&
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label className="text-gray-600 uppercase block text-xl font-bold">
                                    Nuevo password
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
                                value='Restablecer password'
                                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800 md:w-auto"
                            />
                        </form>
                }
                {
                    passwordModificado && 
                        <Link 
                            to="/"
                            className='block text-center my-5 text-gray-500'
                        >
                            Inicia sesion
                        </Link>
                }

            </div>
        </>
    )
}