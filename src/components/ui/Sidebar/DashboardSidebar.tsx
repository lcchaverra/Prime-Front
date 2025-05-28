import { Sidebar } from 'primereact/sidebar';
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardSidebarProps {
  visible: boolean;
  onHide: () => void;
}

const DashboardSidebar = ({ visible, onHide }: DashboardSidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    const menuItems = [
        {
        label: 'Inicio',
        icon: 'pi pi-home',
        path: '/dashboard'
        },
        {
        label: 'Usuarios',
        icon: 'pi pi-users',
        path: '/dashboard/users'
        },
        // {
        // label: 'Ubicaciones',
        // icon: 'pi pi-map-marker',
        // path: '/dashboard/locations'
        // },
        // {
        // label: 'Rutas',
        // icon: 'pi pi-map',
        // path: '/dashboard/routes'
        // },
        // {
        // label: 'Experiencias',
        // icon: 'pi pi-compass',
        // path: '/dashboard/experiences'
        // },
        // {
        // label: 'Planes',
        // icon: 'pi pi-gift',
        // path: '/dashboard/plans'
        // },
        // {
        // label: 'Compradores',
        // icon: 'pi pi-shopping-bag',
        // path: '/dashboard/buyers'
        // },
        // {
        // label: 'Reservas',
        // icon: 'pi pi-calendar',
        // path: '/dashboard/bookings'
        // },
        // {
        // label: 'Cupos',
        // icon: 'pi pi-ticket',
        // path: '/dashboard/quotas'
        // },
        // {
        // label: 'Estadísticas',
        // icon: 'pi pi-chart-line',
        // path: '/dashboard/stats'
        // },
        // {
        // label: 'Reseñas',
        // icon: 'pi pi-star',
        // path: '/dashboard/reviews'
        // }
    ];

    return (
        <Sidebar 
        visible={visible} 
        onHide={onHide}
        className="w-280 border-none"
        showCloseIcon={false}
        modal={false}
        position="left"
        >
        <div className="flex flex-column h-full">
            <div className="flex-1 overflow-y-auto">
            <ul className="list-none p-3 m-0">
                {menuItems.map((item, index) => (
                <li key={index} className="mb-2">
                    <a
                    onClick={() => navigate(item.path)}
                    className={`
                        flex align-items-center cursor-pointer p-3 border-round
                        hover:surface-200 transition-colors transition-duration-150
                        ${location.pathname === item.path ? 'surface-200' : ''}
                    `}
                    >
                    <i className={`${item.icon} mr-3 text-primary`}></i>
                    <span className="font-medium text-900">{item.label}</span>
                    </a>
                </li>
                ))}
            </ul>
            </div>

            <div className="p-3 border-top-1 surface-border">
            <div className="flex align-items-center p-3 border-round surface-100">
                <i className="pi pi-user text-xl text-primary mr-3"></i>
                <div>
                <div className="font-medium text-900">{user.name}</div>
                <span className="text-600">{user.email}</span>
                </div>
            </div>
            </div>
        </div>
        </Sidebar>
    );
};

export default DashboardSidebar;