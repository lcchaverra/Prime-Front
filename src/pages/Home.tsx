import Hero from "../components/molecules/Hero/Hero"
import Product from "../components/molecules/products/Product"
import CallToAction from "../components/molecules/CallToAction/CallToAction"
import Pricing from "../components/molecules/Pricing/Pricing"
import ContactForm from "../components/molecules/ContactForm/ContactForm"
import Layout from "../layouts/layout"

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