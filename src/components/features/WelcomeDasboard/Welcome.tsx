import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';

const Welcome = () => {
    const chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
        {
            label: 'Reservas',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: '#4CAF50',
            tension: 0.4
        }
    ]
    };

    const chartOptions = {
        plugins: {
        legend: {
            labels: {
            usePointStyle: true
            }
        }
        },
        scales: {
        y: {
            beginAtZero: true
        }
        }
    };

    return (
        <div className="grid">
        {/* Encabezado de bienvenida */}
        <div className="col-12">
            <div className="flex align-items-center justify-content-between mb-3">
            <div>
                <h1 className="text-4xl font-bold text-900 mb-2">¡Bienvenido de nuevo!</h1>
                <p className="text-600 text-xl m-0">Aquí tienes un resumen de tu actividad reciente</p>
            </div>
            <Button label="Ver Reportes" icon="pi pi-file-pdf" className="p-button-outlined" />
            </div>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="col-12 md:col-6 lg:col-3">
            <Card className="mb-3">
            <div className="flex align-items-center">
                <div className="flex-1">
                <span className="block text-600 font-medium mb-3">Reservas Totales</span>
                <div className="text-900 font-medium text-xl">248</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-calendar text-green-500 text-xl" />
                </div>
            </div>
            <span className="text-green-500 font-medium">+15% </span>
            <span className="text-600">desde el mes pasado</span>
            </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
            <Card className="mb-3">
            <div className="flex align-items-center">
                <div className="flex-1">
                <span className="block text-600 font-medium mb-3">Ingresos</span>
                <div className="text-900 font-medium text-xl">$12,480</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-dollar text-blue-500 text-xl" />
                </div>
            </div>
            <span className="text-blue-500 font-medium">+8% </span>
            <span className="text-600">desde el mes pasado</span>
            </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
            <Card className="mb-3">
            <div className="flex align-items-center">
                <div className="flex-1">
                <span className="block text-600 font-medium mb-3">Nuevos Clientes</span>
                <div className="text-900 font-medium text-xl">64</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-users text-orange-500 text-xl" />
                </div>
            </div>
            <span className="text-orange-500 font-medium">+12% </span>
            <span className="text-600">desde el mes pasado</span>
            </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
            <Card className="mb-3">
            <div className="flex align-items-center">
                <div className="flex-1">
                <span className="block text-600 font-medium mb-3">Calificación</span>
                <div className="text-900 font-medium text-xl">4.8/5.0</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-star-fill text-purple-500 text-xl" />
                </div>
            </div>
            <span className="text-purple-500 font-medium">+2% </span>
            <span className="text-600">desde el mes pasado</span>
            </Card>
        </div>

        {/* Gráfico de tendencias */}
        <div className="col-12 lg:col-8">
            <Card title="Tendencia de Reservas" className="mb-3">
            <Chart type="line" data={chartData} options={chartOptions} />
            </Card>
        </div>

        {/* Actividades recientes */}
        <div className="col-12 lg:col-4">
            <Card title="Actividades Recientes" className="mb-3">
            <div className="flex flex-column gap-3">
                {[
                { icon: 'pi pi-shopping-cart', text: 'Nueva reserva realizada', time: 'Hace 2 minutos', severity: 'success' },
                { icon: 'pi pi-comment', text: 'Nueva reseña recibida', time: 'Hace 15 minutos', severity: 'info' },
                { icon: 'pi pi-user-plus', text: 'Nuevo cliente registrado', time: 'Hace 34 minutos', severity: 'warning' },
                { icon: 'pi pi-ticket', text: 'Cupo confirmado', time: 'Hace 1 hora', severity: 'success' }
                ].map((activity, i) => (
                <div key={i} className="flex align-items-center gap-3 p-2 border-round hover:surface-100">
                    <div className={`flex align-items-center justify-content-center border-round bg-${activity.severity}-100`} style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className={`${activity.icon} text-${activity.severity}-500`} />
                    </div>
                    <div className="flex-1">
                    <span className="block font-medium text-900">{activity.text}</span>
                    <span className="text-600 text-sm">{activity.time}</span>
                    </div>
                </div>
                ))}
            </div>
            </Card>
        </div>
        </div>
    )
}

export default Welcome