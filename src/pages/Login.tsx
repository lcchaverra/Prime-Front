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
    const { login, loading } = useAuth();
    const { toast, showToast } = useToast();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (password.length < 6) {
            showToast('warn', 'Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        const payload = { email: username, password };
        const success = await login(payload);
        if (success) {
            showToast('success', 'Exitoso', 'Inicio de Sesión exitoso');
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        }
        else {
            showToast('error', 'Error', 'Hubo un problema al iniciar sesión. Intenta nuevamente.');
        }
    };

    return (
        <BlockUI blocked={loading}>
            <div className="flex min-h-screen w-screen">
                <Toast ref={toast} />
                
                {/* Left side - Login Form */}
                <div className="flex-none w-full lg:w-5 xl:w-4 surface-0 p-6 flex flex-col justify-center align-items-center relative">
                    {loading ? (
                        <div className="flex align-items-center justify-content-center">
                            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
                        </div>
                    ) : (
                        <div className="w-full">
                            <div className="text-center mb-8">
                                <img src={Logo} alt="Logo" height={60} className="mb-4" loading="lazy"/>
                                <h1 className="text-900 text-4xl font-bold mb-2">¡Bienvenido de nuevo!</h1>
                                <p className="text-600 text-xl">Inicia sesión para continuar</p>
                            </div>

                            <form className="flex flex-column gap-4 w-full" onSubmit={handleLogin}>
                                <div className="flex flex-column gap-2 ">
                                    <label htmlFor="username" className="text-900 font-medium">
                                        Correo Electrónico
                                    </label>
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-envelope" />
                                        <InputText
                                            id="username"
                                            type="email"
                                            placeholder="nombre@ejemplo.com"
                                            className="w-full"
                                            value={username}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </span>
                                </div>

                                <div className="flex flex-column gap-2">
                                    <label htmlFor="password" className="text-900 font-medium">
                                        Contraseña
                                    </label>
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-lock" />
                                        <InputText
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button
                                        label="Iniciar Sesión"
                                        icon="pi pi-user"
                                        type="submit"
                                        className="w-full"
                                    />
                                    <Button
                                        label="Volver al Inicio"
                                        icon="pi pi-arrow-left"
                                        severity="secondary"
                                        className="w-full"
                                        onClick={() => navigate("/")}
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Right side - Banner Image */}
                <div 
                    className="hidden lg:block flex-1 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80")'
                    }}
                >
                </div>
            </div>
        </BlockUI>
    );
};

export default Login;