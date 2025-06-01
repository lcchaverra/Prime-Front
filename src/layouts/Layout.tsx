import Header from '../components/ui/Header/Header'
import Footer from '../components/ui/Footer/Footer'

const Layout = ({ children }:any) => {
  return (
    <>    
        <Header/>
            <main className='w-full'>
                {children}
            </main>
        <Footer/>
    </>
  )
}

export default Layout