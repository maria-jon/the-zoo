import { useMemo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { AnimalsCtx } from "./AnimalsLayout";
import type { ApiAnimal } from "../models/ApiAnimal";

const formatTime = (lastFed?: Date) => {
    if (!lastFed) return "—";
    try {
        const d = new Date(lastFed);
        return d.toLocaleString("sv-SE"); 
    } catch {
        return lastFed.toLocaleString("sv-SE");
    }
};

export const AnimalDetails = () => {
    const navigate = useNavigate();
    const { id: rawId } = useParams<{ id: string }>();
    const id = rawId ? decodeURIComponent(rawId).trim() : "";

    const { animals, loading, error, feedNow, toggleFed } = useOutletContext<AnimalsCtx>();

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
    
    
  return (
    <article style={{ maxWidth: 720 }}>
        <button onClick={() => navigate(-1)} aria-label="Gå tillbaka" style={{ marginBottom: 12 }}>
            ← Tillbaka
        </button>

        <header style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <img
            src={animal.imageUrl}
            alt={animal.name}
            style={{ width: 200, height: 200, objectFit: "cover", borderRadius: 8 }}
            />
            <div>
            <h3 style={{ margin: 0 }}>{animal.name}</h3>
            <p><em>{animal.latinName}</em></p>
            <p>Född: {animal.yearOfBirth}</p>
            <p>Status: {animal.isFed ? "Matad ✅" : "Hungrig 🍽️"}</p>
            <p>Senast matad: {formatTime(animal.lastFed)}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={() => feedNow(animal.id)}>Mata nu</button>
                <button onClick={() => toggleFed(animal.id)}>Växla status</button>
            </div>
            </div>
        </header>

        <section>
            <h4>Kort beskrivning</h4>
            <p>{animal.shortDescription}</p>
        </section>

        <section>
            <h4>Lång beskrivning</h4>
            <p>{animal.longDescription}</p>
        </section>

        <section>
            <h4>Medicin</h4>
            <p>{animal.medicine || "-"}</p>
        </section>
    </article>
  );
}