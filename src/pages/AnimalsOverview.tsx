import { Link, useOutletContext } from "react-router-dom";
import type { AnimalsCtx } from "./AnimalsLayout";

import "./AnimalsOverview.css";

export const AnimalsOverview = () => {
    const {
        animals, 
        loading, 
        error,
        getTimeSinceFed, 
        isFedOlderThan 
    } = useOutletContext<AnimalsCtx>();

    if (loading) return <p>Laddar…</p>;
    if (error) return <p role="alert">{error}</p>;
    if (!animals.length) return <p>Inga djur hittades.</p>;
    if (!Array.isArray(animals)) return <p>Fel format på data.</p>;


    return (
        <>
            {animals.map((a) => {
            // Food warnings
            const since = getTimeSinceFed(a.id);
            const warn3h = isFedOlderThan(a.id, { hours: 3 });
            const warn5h = isFedOlderThan(a.id, { hours: 5 });

            const color = warn5h ? "crimson" : warn3h ? "darkorange" : "inherit";
            const message = warn5h ? "är jättehungrig och behöver mat nu!" : warn3h ? "behöver bli matad snart." : "behöver ingen mer mat just nu.";

            return (
                <article key={a.id} className="max-w-full">
                    <h3>
                        <Link to={`/animals/${a.id}`}>{a.name}</Link>
                    </h3>
                    <p>({a.latinName}) — {a.isFed ? "Matad ✅" : "Hungrig 🍽️"}</p>
                    <img src={a.imageUrl} className="h-[30vh] w-full object-cover" />
                    <div>
                    <span style={{ color }}>{a.name} blev matad {since.text}. </span>
                    <span>{a.name} {message}</span>
                    </div>
                    <Link to={`/animals/${a.id}`}>
                        Hälsa på {`${a.name}`}
                    </Link>
                </article>
            );
        })}
        </>
    );
};