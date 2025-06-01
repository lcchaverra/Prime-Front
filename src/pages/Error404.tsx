import Layout from '../layouts/Layout';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <>
            <Layout>
                <div className="my-5 px-5 py-5 text-center">
                    <div className="flex align-items-center justify-content-center min-h-screen bg-primary-50">
                        <Card className="w-full md:w-8 lg:w-6 text-center p-6">
                            <div className="mb-5">
                            <i className="pi pi-compass text-primary text-8xl animate-spin-slow"></i>
                            </div>
                            
                            <h1 className="text-900 font-bold text-8xl mb-2">404</h1>
                            <h2 className="text-600 font-bold text-4xl mb-4">¡Parece que te has perdido!</h2>
                            
                            <div className="text-700 text-xl line-height-3 mb-5">
                            <p>La página que estás buscando podría haber sido movida o no existe.</p>
                            <p>No te preocupes, tenemos las mejores rutas para ti.</p>
                            </div>

                            <div className="flex flex-column md:flex-row gap-3 justify-content-center">
                            <Button 
                                label="Volver al Inicio" 
                                icon="pi pi-home"
                                onClick={() => navigate('/')}
                                className="p-button-primary"
                            />
                            {/* <Button 
                                label="Ver Tours Disponibles" 
                                icon="pi pi-map"
                                onClick={() => navigate('/tours')}
                                className="p-button-outlined"
                            /> */}
                            </div>

                            <div className="mt-6 surface-ground p-4 border-round">
                            <h3 className="text-xl font-semibold mb-3">¿Necesitas ayuda?</h3>
                            <div className="flex flex-column gap-2">
                                <div className="flex align-items-center gap-2">
                                <i className="pi pi-phone text-primary"></i>
                                <span>Llámanos: +51 123 456 789</span>
                                </div>
                                <div className="flex align-items-center gap-2">
                                <i className="pi pi-envelope text-primary"></i>
                                <span>Escríbenos: info@turismoaventura.com</span>
                                </div>
                                <div className="flex align-items-center gap-2">
                                <i className="pi pi-whatsapp text-primary"></i>
                                <span>WhatsApp: +51 987 654 321</span>
                                </div>
                            </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Layout>
        </>
  )
}

export default Error404