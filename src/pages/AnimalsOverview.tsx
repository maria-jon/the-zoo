import { Link, useOutletContext } from "react-router-dom";
import type { AnimalsCtx } from "./AnimalsLayout";

import "./AnimalsOverview.css";
import brokenImg from "../assets/broken-image.svg";

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
                    <h3 className="text-4xl">
                        <Link to={`/animals/${a.id}`}>{a.name}</Link>
                    </h3>
                    <p>({a.latinName})</p>
                    <img 
                        src={a.imageUrl} 
                        alt={a.name}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = brokenImg;
                        }}
                        className="h-[50vh] w-full object-cover sm:h-[30vh]" 
                    />
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