import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from "primereact/button";
import Logo from '../../../assets/react.svg';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useContext } from 'react';

interface DashboardHeaderProps {
    onMenuToggle: () => void;
}

const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
    const navigation = useNavigate();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.removeItem("rolesAndPermissions");
        navigation("/login");
    };

    const items = [
        {
        label: 'Home',
        icon: 'pi pi-home',
        // onclick: () => navigation('/dashboard'),
        // path: '/dashboard'
        }
    ];

    const start = (
        <div className="flex align-items-center gap-3">
        <Button 
            icon="pi pi-bars"
            onClick={onMenuToggle}
            className="p-button-text p-button-rounded"
            aria-label="Menu"
        />
        <div className="flex align-items-center">
            <img alt="logo" src={Logo} height="40" className="mr-2" loading="lazy" />
            <span className="font-bold text-xl text-900">Dashboard</span>
        </div>
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
        <Button 
            icon="pi pi-sign-out" 
            rounded 
            text 
            severity="danger" 
            onClick={handleLogout}
            aria-label="Logout"
        />
        </div>
    );

    return (
        <div className="shadow-2">
        <Menubar 
            model={items} 
            start={start} 
            end={end}
            className="border-none surface-card"
        />
        </div>
    );
};

export default DashboardHeader;