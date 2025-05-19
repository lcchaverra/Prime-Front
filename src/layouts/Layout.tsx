import Header from '../components/molecules/Header/Header'
import Footer from '../components/molecules/Footer/Footer'

const Layout = ({ children }) => {
  return (
    <>    
        <Header/>
            <main>
                {children}
            </main>
        <Footer/>
    </>
  )
}

export default Layout