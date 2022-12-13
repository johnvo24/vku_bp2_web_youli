import Footer from "../Components/Footer";
import Header from "../Components/Header";
import NavigationBar from "../Components/NavigationBar";

function Layout({children}) {

    return (
        <>
            <Header>
                <NavigationBar />
            </Header>
            <div className="Main_main">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout;