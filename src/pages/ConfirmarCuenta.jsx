import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta'

export default function ConfirmarCuenta() {

    const [ confirmada, setConfirmada ] = useState({});
    const [ cargando, setCargando ] = useState(true);
    const [ alerta, setAlerta ] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const confirmarCuenta = async () => {

            try {
                const url = `/veterinarios/confirmar/${id}`;

                const { data } = await clienteAxios(url);

                setConfirmada(true);
                setAlerta({
                    msg: data.msg,
                    error: false
                })

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }

            setCargando(false);
        }

        confirmarCuenta();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirma tu cuenta y comienza a administrar a <span className="text-black">tus pacientes</span>
                </h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {
                    !cargando && 
                        <Alerta alerta={alerta} />
                }
                {
                    confirmada &&
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