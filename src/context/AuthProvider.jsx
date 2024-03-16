import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
                setCargando(false);
                return
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);

                setAuth(data);
            } catch (error) {
                console.error(error.response.data.msg);
                setAuth({})
            }
            setCargando(false);
        }

        autenticarUsuario();
    }, [])

    function cerrarSesion() {
        localStorage.removeItem('token');
        setAuth({});
    }

    async function actualizarPerfil(datos) {
        const token = localStorage.getItem('token');

        if(!token) {
            setCargando(false);
            return
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config);

            setAuth(data);

            return {
                msg: 'Almacenado correctamente',
                error: false
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    async function guardarPassword(datos) {
        const token = localStorage.getItem('token');

        if(!token) {
            setCargando(false);
            return
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const url = '/veterinarios/actualizar-password';

            const{ data } = await clienteAxios.put(url, datos, config);
            return {
                msg: data.msg,
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth, 
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>    
    )
}

export default AuthContext;