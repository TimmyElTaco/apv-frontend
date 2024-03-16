import { useState } from 'react';
import Formulario from '../components/Formulario';
import ListadoPacientes from '../components/ListadoPacientes';

export default function AdministrarPacientes() {
    const [mostrarForm, setMostrarForm] = useState(false);

    return(
        <div className='flex flex-col md:flex-row'>
            <button 
                onClick={
                    () => setMostrarForm(!mostrarForm)
                } 
                className='bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md md:hidden'
            >
                {mostrarForm ? 'Ocultar formulario' : 'Mostrar formulario'}
            </button>
            <div className={`${ mostrarForm ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5 block`}>
                <Formulario />
            </div>
            <div className='md:w-1/2 lg:w-3/5'>
                <ListadoPacientes />
            </div>
        </div>
    )
}