import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

export default function CambiarPassword() {

    const { guardarPassword } = useAuth();

    const [alerta, setAlerta] = useState('');
    const [password, setPassword] = useState({
        pass_actual: '',
        pass_nuevo: ''
    });

    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some(campo => campo === '')){ 
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
            return;
        }

        if(password.pass_nuevo.length < 6) {
            setAlerta({ msg: 'Password debe tener al menos 6 caracteres', error: true })
            return;
        }

        const respuesta = await guardarPassword(password);

        setAlerta(respuesta);
    }
    
    return(
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Cambiar password</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu <span className="text-indigo-600 font-bold">password aqui</span>
            </p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    <Alerta alerta={alerta} />
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Password actual
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pass_actual"
                                placeholder="password"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Nuevo password
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pass_nuevo"
                                placeholder="nuevo passoword"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <input 
                            type="submit"
                            value="Guardar cambios"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}