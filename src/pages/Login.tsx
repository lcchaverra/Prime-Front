import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import Logo from '../assets/react.svg';
import { useToast } from "../hooks/useToast";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const navigate = useNavigate();
    const { login, loading} = useAuth();
    const { toast, showToast } = useToast();
    

    const handleLogin = async (e:any) => {
        e.preventDefault();
        if(password.length < 6) {
            showToast('warn', 'Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres.');
            return; 
        }
        const payload = {email: username, password};
        const success = await login(payload);
        console.log(success);
        if (success) {
            showToast('success', 'Exitoso', 'Inicio de Sesión exitoso');
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        }
        else {
            showToast('error', 'Error', 'Hubo un problema al iniciar sesión. Intenta nuevamente.');
        }
    };

    return (
        <BlockUI blocked={loading}>
        <div className="bg-gray-100 py-8 px-4 md:px-6 lg:px-8 w-screen h-screen">
        <Toast ref={toast} />
        {
            loading ?
            <div className="flex align-items-center justify-content-center">
                (<ProgressSpinner style={{width: '150px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '200px', alignSelf: 'center' }} strokeWidth="4" fill="var(--surface-ground)" animationDuration=".5s" />)
            </div>
            :
        <div className="flex align-items-center justify-content-center">
            <form className="surface-card p-4 shadow-2 border-round w-full lg:w-6" method="POST">
                <div className="text-center mb-5">
                    <img src={Logo} alt="Logo" height={50} className="mb-3" loading="lazy"/>
                    <div className="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                </div>
                <div>
                    <label htmlFor="username" className="block text-900 font-medium mb-2">Correo Electronico</label>
                    <InputText id="username" 
                        type="text" 
                        placeholder="ingrese su correo electronico" 
                        className="w-full mb-3" 
                        value={username} 
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                    <InputText id="password" 
                        type="password" 
                        placeholder="Contraseña" 
                        className="w-full mb-3" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex align-items-center justify-content-between">
                        <Button label="Iniciar Sesión" icon="pi pi-user" className="w-2/4 mr-2" onClick={handleLogin}  />
                        <Button label="Volver" severity="secondary" icon="pi pi-arrow-left" className="w-2/4" onClick={() => navigate("/")} />
                    </div>
                </div>
            </form>
        </div>
        }
    </div>
    </BlockUI>
    )
}

export default Login