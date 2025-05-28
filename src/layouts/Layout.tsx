import Header from '../components/ui/Header/Header'
import Footer from '../components/ui/Footer/Footer'

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