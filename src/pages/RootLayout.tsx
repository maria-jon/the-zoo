import { Outlet, Link } from "react-router-dom";

export const RootLayout = () => {
    return(<>
        <header>
            <nav>
                <Link to="/">Hem</Link> | <Link to="/animals">Djuren</Link>
            </nav>
        </header>
        <main><Outlet /></main>
    </>)
}