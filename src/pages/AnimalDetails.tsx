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

const checkIfHungry = (lastFed: Date) => {
    /** 
     * Om det gått mer än fyra timmar > klickbar knapp
     * Om det gått mindre än fyra timmar > oklickbar knapp
     * Om det gått mer än tre timmar > indikation om att det snart är matdags
    */
   try {
        const now: Date = new Date();
        const animalFed: Date = new Date(lastFed);

        // Time difference in Ms
        const milliDiff: number = now.getTime() - animalFed.getTime();

        // Converting time into hh:mm:ss format

        // Seconds
        const totalSeconds = Math.floor(milliDiff / 1000);
        // Minutes
        const totalMinutes = Math.floor(totalSeconds / 60);
        // Hours
        const totalHours = Math.floor(totalMinutes / 60);
        // Number of seconds left
        const remSeconds = totalSeconds % 60;
        // Number of minutes left
        const remMinutes = totalMinutes % 60;

        //console.log(`${totalHours}:${remMinutes}:${remSeconds}`);
        //return(`${totalHours}h${remMinutes}m${remSeconds}s`);
        if(totalHours >= 4) {
            return true;
        }
        if(totalHours < 4) {
            return false;
        }
    } catch {

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
            {/*<p>Det var {checkIfHungry(animal.lastFed)} sedan</p>*/}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {checkIfHungry(animal.lastFed) === true 
                ? <button onClick={() => feedNow(animal.id)}>Mata nu</button>
                : <button disabled onClick={() => feedNow(animal.id)}>Mata nu</button>
                }
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