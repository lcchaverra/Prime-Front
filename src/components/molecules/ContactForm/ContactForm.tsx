import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useToast } from '../../../hooks/useToast';
import { useApiFetch } from '../../../hooks/useApiFetch';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const { toast, showToast } = useToast();
    const { fetchData, loading } = useApiFetch();

    const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      // Envía la solicitud POST con los datos del formulario
      const data = await fetchData(`email/send-contact`, 'POST', formData);
      if (data) {
        showToast('success', 'Mensaje Enviado', 'Gracias por contactarnos. Te responderemos pronto.');
        setFormData({ name: '', email: '', message: ''});
      } 
    } catch (error) {
      showToast('error','Error','Hubo un problema al enviar tu mensaje, por favor intenta de nuevo.')
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <>
        <section className="py-8">
            <Toast ref={toast} />
            <div className="container">
            <div className="grid">
                <div className="col-12 md:col-6">
                <div className="p-4">
                    <h2 className="text-4xl font-bold mb-4">Contáctanos</h2>
                    <p className="text-700 mb-6">
                    Estamos aquí para ayudarte a planificar tu próxima aventura
                    </p>
                </div>
                </div>

                <div className="col-12 md:col-6">
                <div className="p-4 surface-50 border-round-xl">
                    <form onSubmit={handleSubmit} className="flex flex-column gap-4">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className="font-medium">Nombre</label>
                        <span className="p-input-icon-left w-full">
                        <InputText
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Tu nombre completo"
                            className="w-full"
                            required
                        />
                        </span>
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <span className="p-input-icon-left w-full">
                        <InputText
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="tu@email.com"
                            className="w-full"
                            required
                        />
                        </span>
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="message" className="font-medium">Mensaje</label>
                        <InputTextarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        placeholder="¿En qué podemos ayudarte?"
                        className="w-full"
                        required
                        />
                    </div>

                    <Button
                        type="submit"
                        label={`${loading? 'Enviando...' : "Enviar Mensaje"}`}
                        icon="pi pi-send"
                        className="w-full"
                        severity="success"
                        disabled={loading}
                    />
                    </form>
                </div>
                </div>
            </div>
            </div>
        </section>
    </>
  )
}

export default ContactForm