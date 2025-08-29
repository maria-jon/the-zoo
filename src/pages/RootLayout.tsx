import { Outlet, Link } from "react-router-dom";
import "./RootLayout.css";

export const RootLayout = () => {
    return(<>
        <header className="bg-cyan-100">
            <h1 className="hover"><Link to="/">Zoo-Bop-a-Lula</Link></h1>
            <nav>
                <Link to="/">Hem</Link> | <Link to="/animals">Djuren</Link>
            </nav>
        </header>
        <main className="mx-8 my-4">
            <Outlet />
        </main>
    </>)
}