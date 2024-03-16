import { useState, useEffect } from "react"
import Alerta from '../components/Alerta'
import usePacientes from "../hooks/usePacientes";

export default function Formulario() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [propietario, setPropietario] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState('');

    const { guardarPaciente, paciente } = usePacientes();


    const handleSubmit = (e) => {
        e.preventDefault();

        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
            return
        }

        setAlerta('');
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
        setAlerta({msg: 'Guardado correctamente', error: false});
        setNombre('');
        setEmail('');
        setPropietario('');
        setFecha('');
        setSintomas('');
        setId('')
    }

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setEmail(paciente.email);
            setPropietario(paciente.propietario);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id)
        }
    }, [paciente]);

    return(
        <>
            <h2 className='font-black text-3xl text-center' >Administrador de pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Agrega tus pacientes y <span className="text-indigo-600 font-bold">administralos</span>
            </p>
            <form 
                className="bg-white py-10 px-5 mb-10 md:mb-0 shadow-sm rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
                        Nombre mascota
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Snowball"
                        className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">
                        Nombre propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Juan Gonzalez"
                        className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">
                        Email propietario
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="correo@correo.com"
                        className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
                <Alerta alerta={alerta} />
                <input
                    type="submit"
                    value={id ? 'Guardar cambios' : 'Agregar paciente'}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors"
                />
            </form>
        </>
    )
}