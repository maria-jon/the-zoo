import { Outlet, Link } from "react-router-dom";
import "./RootLayout.css";

export const RootLayout = () => {
    return(<>
        <header>
            <h1 className="title"><Link to="/">Zoo-Bop-a-Lula</Link></h1>
            <nav>
                <Link to="/">Hem</Link> | <Link to="/animals">Djuren</Link>
            </nav>
        </header>
        <main><Outlet /></main>
    </>)
}