import { Link, useOutletContext } from "react-router-dom";
import type { AnimalsCtx } from "./AnimalsLayout";

import "./AnimalsOverview.css";

const formatTime = (lastFed?: Date) => {
    if (!lastFed) return "—";
    try {
        const d = new Date(lastFed);
        return d.toLocaleString("sv-SE"); 
    } catch {
        return lastFed.toLocaleString("sv-SE");
    }
};

export const AnimalsOverview = () => {
    const { animals, loading } = useOutletContext<AnimalsCtx>();

    if (loading) return <p>Laddar…</p>;
    if (!animals.length) return <p>Inga djur hittades.</p>;
    if (!Array.isArray(animals)) return <p>Fel format på data.</p>;

    return (
        <section>
            <h2>Möt djuren!</h2>
            {animals.map(a => (
                <article key={a.id} style={{ marginBottom: 12 }}>
                <h3>
                    <Link to={`/animals/${a.id}`}>{a.name}</Link>
                </h3>
                <p>({a.latinName}) — {a.isFed ? "Matad ✅" : "Hungrig 🍽️"}</p>
                <img src={a.imageUrl} />
                <p>Senast matad: {formatTime(a.lastFed)}</p>
                </article>
            ))}
        </section>
    );
};