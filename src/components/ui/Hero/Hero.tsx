import { Button } from 'primereact/button'
import HeroImg from '../../../assets/hero.jpg'
const Hero = () => {
    
  return (
    <div className="grid grid-nogutter surface-0 text-800 pb-4 w-full">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
            <section>
                <span className="block text-6xl font-bold mb-1">Create the screens</span>
                <div className="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
                <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                <Button label="Learn More" type="button" className="mr-3 p-button-raised" />
                <Button label="Live Demo" type="button" className="p-button-outlined" />
            </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
            <img src={HeroImg} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
        </div>
    </div>
  )
}

export default Hero