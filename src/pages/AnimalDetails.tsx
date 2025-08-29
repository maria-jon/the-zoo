import { useMemo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { AnimalsCtx } from "./AnimalsLayout";
import type { ApiAnimal } from "../models/ApiAnimal";

import brokenImg from "../assets/broken-image.svg";

export const AnimalDetails = () => {
    const navigate = useNavigate();
    const { id: rawId } = useParams<{ id: string }>();
    const id = rawId ? decodeURIComponent(rawId).trim() : "";

    const { 
        animals, 
        loading, 
        error, 
        feedNow, 
        toggleFed, 
        getTimeSinceFed, 
        isFedOlderThan 
    } = useOutletContext<AnimalsCtx>();

    if (loading) return <p>Laddar…</p>;
    if (error) return <p role="alert">{error}</p>;

    // Find animal 
    const animal: ApiAnimal | undefined = useMemo(() => {
        if(!id) return undefined;
        return animals.find(a => String(a.id).trim() === id);
    }, [animals, id]);
    
    if (!animal) {
        return (
          <div>
                <p role="alert">Hittade inget djur med id: {id}</p>
                <button onClick={() => navigate("/animals")}>Tillbaka till listan</button>
          </div>
        );
    }

    // Food warnings
    const since = getTimeSinceFed(animal.id); 
    const warn3h = isFedOlderThan(animal.id, { hours: 3 });
    const warn4h = isFedOlderThan(animal.id, { hours: 4 });
    const warn5h = isFedOlderThan(animal.id, { hours: 5 });

    const color = warn5h ? "crimson" : warn3h ? "darkorange" : "inherit";
    const message = warn5h ? "är jättehungrig och behöver mat nu!" : warn3h ? "behöver bli matad snart." : "behöver ingen mer mat just nu.";
    let buttonAttribute: boolean = false;
    if (warn4h) {
        buttonAttribute = true;
    } else {
        buttonAttribute = false;
    }
    
    return (
        <>
            <header className="p-4 rounded-xl border-2 border-teal-700 order-first sm:col-span-2 lg:col-span-3">
                <button onClick={() => navigate(-1)} aria-label="Gå tillbaka" style={{ marginBottom: 12 }}>
                    ← Tillbaka
                </button>
                <div className="flex items-start gap-4">
                    <img
                    src={animal.imageUrl}
                    alt={animal.name}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = brokenImg;
                    }}
                    className="size-[240px] object-cover rounded-xl"
                    />
                    <div>
                        <h3 className="text-3xl mb-4">{animal.name}</h3>
                        <p className="italic text-teal-700">{animal.latinName}</p>
                        <p>Född: {animal.yearOfBirth}</p>
                        <p>Status: {animal.isFed ? "Matad" : "Hungrig"}</p>
                        <p>Senast matad {since.text}. <span style={{color}}>{animal.name} {message}</span></p>
                        <div className="flex justify-evenly mt-6">
                            {buttonAttribute === true 
                            ? <button onClick={() => feedNow(animal.id)}>Mata nu</button>
                            : <button disabled onClick={() => feedNow(animal.id)}>Mata nu</button>
                            }
                            <button onClick={() => toggleFed(animal.id)}>Växla status</button>
                        </div>
                    </div>
                </div>
            </header>

            <section className="p-4 rounded-xl border-2 border-teal-700 order-2">
                <h4 className="text-xl mb-4">Kort beskrivning</h4>
                <p>{animal.shortDescription}</p>
            </section>

            <section className="p-4 rounded-xl border-2 border-teal-700 order-last sm:col-span-2 order-4 lg:col-span-3">
                <h4 className="text-xl mb-4">Lång beskrivning</h4>
                <p>{animal.longDescription}</p>
            </section>

            <section className="p-4 rounded-xl border-2 border-teal-700 order-last sm:order-3 md:order-last">
                <h4 className="text-xl mb-4">Medicin</h4>
                <p>{animal.medicine || "-"}</p>
            </section>
        </>
    );
}