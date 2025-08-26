import { Outlet, /*Link*/ } from "react-router-dom";

export const AnimalsLayout = () => {
    return(<>
        {/*<header>
            <nav>
                <Link to="/">Hem</Link> | <Link to="/animals">Djuren</Link>
            </nav>
    </header>*/}
        <section>
            <h2>Djuren</h2>
            <Outlet />
        </section>
    </>)
}