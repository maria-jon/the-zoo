import { useOutletContext } from "react-router-dom";
import type { AnimalsCtx } from "./AnimalsLayout";

const formatTime = (iso?: string) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString(); // ev. toLocaleString("sv-SE")
  } catch {
    return iso;
  }
};

export const AnimalsOverview = () => {
  const { animals, loading, feedNow, toggleFed } = useOutletContext<AnimalsCtx>();

  if (loading) return <p>Laddar…</p>;
  if (!animals.length) return <p>Inga djur hittades.</p>;
  if (!Array.isArray(animals)) return <p>Fel format på data.</p>;

  return (
    <ul>
      {animals.map(a => (
        <li key={a.id} style={{ marginBottom: 12 }}>
          <strong>{a.name}</strong> ({a.latinName}) — {a.isFed ? "Matad ✅" : "Hungrig 🍽️"}
          <br />
          Senast matad: {formatTime(a.lastFed)}
          <div style={{ marginTop: 6 }}>
            <button onClick={() => feedNow(a.id)}>Mata nu</button>
            <button onClick={() => toggleFed(a.id)} style={{ marginLeft: 8 }}>
              Växla status
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};