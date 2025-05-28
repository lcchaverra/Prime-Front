import Hero from "../components/ui/Hero/Hero"
import Product from "../components/ui/products/Product"
import CallToAction from "../components/ui/CallToAction/CallToAction"
import Pricing from "../components/ui/Pricing/Pricing"
import ContactForm from "../components/ui/ContactForm/ContactForm"
import Layout from "../layouts/Layout"

const Home = () => {
  return (
    <Layout>
        <Hero />
        <Product />
        <CallToAction />
        <Pricing />
        <ContactForm />
    </Layout>
  )
}

export default Home