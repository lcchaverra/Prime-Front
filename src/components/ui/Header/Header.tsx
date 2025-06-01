import { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import LogoMenu from '../../../assets/react.svg'
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Header = () => {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    // const isLoggedIn = localStorage.getItem('token');

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        // {
        //     label: 'Tours',
        //     icon: 'pi pi-map',
        //     items: [
        //         {
        //             label: 'Destinos Populares',
        //             icon: 'pi pi-star',
        //             command: () => navigate('/popular-destinations')
        //         },
        //         {
        //             label: 'Próximas Salidas',
        //             icon: 'pi pi-calendar',
        //             command: () => navigate('/upcoming-tours')
        //         }
        //     ]
        // },
        // {
        //     label: 'Experiencias',
        //     icon: 'pi pi-compass',
        //     command: () => navigate('/experiences')
        // },
        {
            label: 'Sobre Nosotros',
            icon: 'pi pi-users',
            command: () => navigate('/about')
        },
        {
            label: 'Contacto',
            icon: 'pi pi-envelope',
            command: () => navigate('/contact')
        }
    ];

    const start = (
        <div className="flex align-items-center gap-2 pr-2">
            <img 
                alt="logo" 
                src={LogoMenu} 
                height="40" 
                className="mr-2 border-round-lg"
            />
            <span className="text-xl font-bold text-900 hidden md:block">Prime Front</span>
        </div>
    );

    const end = (
        <div className="flex align-items-center gap-2">
            <Button 
                icon={isDarkMode ? "pi pi-sun" : "pi pi-moon"}
                rounded 
                text 
                severity="secondary" 
                onClick={toggleTheme}
                tooltip={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                tooltipOptions={{ position: 'bottom' }}
            />
            <Button label="Iniciar Sesión" icon="pi pi-sign-in" className="p-button-outlined" onClick={() => navigate('/login')}/>
            {/* {isLoggedIn ? (
                <>
                    <Button 
                        icon="pi pi-user" 
                        className="p-button-rounded p-button-text"
                        onClick={() => navigate('/profile')}
                    />
                    <Button 
                        label="Cerrar Sesión" 
                        icon="pi pi-sign-out" 
                        severity="danger" 
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/login');
                        }}
                    />
                </>
            ) : (
                <>
                    <Button 
                        label="Iniciar Sesión" 
                        icon="pi pi-sign-in" 
                        className="p-button-outlined"
                        onClick={() => navigate('/login')}
                    />
                    <Button 
                        label="Registrarse" 
                        icon="pi pi-user-plus"
                        onClick={() => navigate('/register')}
                    />
                </>
            )} */}
        </div>
    );

    return (
        <>
            <div className="card w-full">
                <Menubar 
                    model={items} 
                    start={start} 
                    end={end}
                    className="shadow-2 border-none surface-card"
                />
            </div>

            <Dialog
                visible={mobileMenuVisible}
                onHide={() => setMobileMenuVisible(false)}
                dismissableMask
                showHeader={false}
                className="md:hidden"
                style={{ width: '90vw' }}
            >
                <div className="flex flex-column gap-2">
                    {items.map((item, index) => (
                        <Button
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            className="p-button-text w-full justify-content-start"
                            onClick={() => {
                                if (item.command) item.command();
                                setMobileMenuVisible(false);
                            }}
                        />
                    ))}
                </div>
            </Dialog>
        </>
    );
};

export default Header;