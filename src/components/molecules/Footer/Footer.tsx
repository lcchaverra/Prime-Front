import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const Footer = () => {
    return (
        <footer className="surface-ground">
            <div className="py-6 px-4">
                <div className="grid">
                    <div className="col-12 md:col-3">
                        <h3 className="text-xl font-semibold mb-3">TourApp</h3>
                        <p className="line-height-3 text-700">
                            Descubre los mejores destinos y experiencias únicas con nosotros. 
                            Tu próxima aventura comienza aquí.
                        </p>
                        <div className="flex gap-3 mt-3">
                            <Button icon="pi pi-facebook" rounded text />
                            <Button icon="pi pi-twitter" rounded text />
                            <Button icon="pi pi-instagram" rounded text />
                            <Button icon="pi pi-youtube" rounded text />
                        </div>
                    </div>

                    <div className="col-12 md:col-3">
                        <h3 className="text-xl font-semibold mb-3">Enlaces Rápidos</h3>
                        <ul className="list-none p-0">
                            <li className="mb-2">
                                <a className="text-700 hover:text-primary cursor-pointer">Inicio</a>
                            </li>
                            <li className="mb-2">
                                <a className="text-700 hover:text-primary cursor-pointer">Tours</a>
                            </li>
                            <li className="mb-2">
                                <a className="text-700 hover:text-primary cursor-pointer">Experiencias</a>
                            </li>
                            <li className="mb-2">
                                <a className="text-700 hover:text-primary cursor-pointer">Sobre Nosotros</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 md:col-3">
                        <h3 className="text-xl font-semibold mb-3">Contacto</h3>
                        <ul className="list-none p-0">
                            <li className="mb-2 flex align-items-center">
                                <i className="pi pi-phone mr-2"></i>
                                <span className="text-700">+1 234 567 890</span>
                            </li>
                            <li className="mb-2 flex align-items-center">
                                <i className="pi pi-envelope mr-2"></i>
                                <span className="text-700">info@tourapp.com</span>
                            </li>
                            <li className="mb-2 flex align-items-center">
                                <i className="pi pi-map-marker mr-2"></i>
                                <span className="text-700">123 Tour Street, City</span>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 md:col-3">
                        <h3 className="text-xl font-semibold mb-3">Newsletter</h3>
                        <p className="line-height-3 text-700 mb-3">
                            Suscríbete para recibir las últimas novedades y ofertas especiales.
                        </p>
                        <div className="p-inputgroup">
                            <InputText placeholder="Tu email" />
                            <Button label="Suscribirse" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="surface-card px-4 py-3 text-center">
                <span className="text-700">
                    © 2024 TourApp. Todos los derechos reservados.
                </span>
            </div>
        </footer>
    );
};

export default Footer;