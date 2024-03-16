import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {

    const { cerrarSesion } = useAuth();

    return(
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto text-center flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200">
                    Administrador de Pacientes de <span className="text-white font-black">Veterinaria</span>
                </h1>
                <nav className="flex gap-4 flex-col lg:flex-row mt-5">
                    <Link to='/admin' className="text-white text-xl uppercase font-bold">Pacientes</Link>
                    <Link to='/admin/perfil' className="text-white text-xl uppercase font-bold">Perfil</Link>
                    <button onClick={cerrarSesion} type="button" className="text-white text-xl uppercase font-bold">Cerrar sesion</button>
                </nav>
            </div>
        </header>
    )
}