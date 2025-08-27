import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { ApiAnimal } from "../models/ApiAnimal";

const LS_KEY = "animals:v1";

// --- Find array in API response ---
function extractAnimals(input: unknown): ApiAnimal[] {
    if (Array.isArray(input)) return input as ApiAnimal[];
  
    const commonKeys = ["animals", "data", "items", "results", "payload", "list"];
    if (input && typeof input === "object") {
        for (const k of commonKeys) {
            const v = (input as any)[k];
            if (Array.isArray(v)) return v as ApiAnimal[];
        }
        // Find first array value in object
        for (const v of Object.values(input as Record<string, unknown>)) {
            if (Array.isArray(v)) return v as ApiAnimal[];
        }
    }
    return [];
}

type Status = {
    loading: boolean;
    error: string | null;
};

export function useAnimals() {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const animalApi = import.meta.env.VITE_API_URL ?? "/animals";
    const api = axios.create({ baseURL });

    // Lazy init from localStorage
    const [animals, setAnimals] = useState<ApiAnimal[]>(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            const arr = extractAnimals(parsed);
            return Array.isArray(arr) ? arr : [];
        } catch {
            return []; 
        }
    });

    // Save to localStorage after first save
    const didMount = useRef(false);
    useEffect(() => {
        if (!didMount.current) { 
            didMount.current = true; return; 
        }
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(animals));
        } catch {}
    }, [animals]);

    // UI status
    const [status, setStatus] = useState<Status>({ 
        loading: false,
        error: baseURL ? null : "VITE_API_URL saknas.",
    });

    // Fetches API on mount
    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setStatus(s => ({ ...s, loading: true, error: null }));
            try {
                const res = await api.get(animalApi);
                if (cancelled) return;

                const fresh = extractAnimals(res.data);

                // Create local map
                setAnimals(prevLocal => {
                    const localById = new Map(prevLocal.map(a => [a.id, a]));
                    const merged = fresh.map(f => {
                        const local = localById.get(f.id);
                        if(!local) return f;
                        // Keep isFed and lastFed if they exist
                        return {
                            ...f,
                            isFed: local.isFed ?? f.isFed,
                            lastFed: local.lastFed ?? f.isFed,
                        };
                    });
                    return merged;
                });

                setStatus(s => ({ ...s, loading: false }));
            } catch (e: any) {
                if(!cancelled) {
                    setStatus({
                        loading: false,
                        error:
                            `Kunde inte hämta djur (${e?.response?.status ?? "nätverksfel"})`
                    });
                }
            }
        };
        load();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Helpers for local updates ---
    const setLocal = (id: string, mut: (a: ApiAnimal) => ApiAnimal) => {
        setAnimals(prev => prev.map(a => (a.id === id ? mut(a) : a)));
    };

    // --- Update isFed and lastFed ---

    /** Sets isFed to explicit value
     * If isFed is true and lastFed is missing or needs to be updated > sets to now
     * If isFed is false > keep lastFed 
     */
    const setFed = (id: string, isFed: boolean) => {
        //const nowISO = new Date().toISOString();
        const nowISO = new Date();

        setLocal(id, a => ({
            ...a,
            isFed,
            lastFed: isFed ? nowISO : a.lastFed, 
        }));
    };

    // Toggle isFed - lastFed only updated when true
    const toggleFed = (id: string) => {
        const current = animals.find(a => a.id === id);
        if (!current) return;
        setFed(id, !current.isFed);
    };

    // Find animal being fed and set to isFed=true, lastFed=now
    const feedNow = (id: string) => {
        setFed(id, true);
    };

  const clearError = () => setStatus(s => ({ ...s, error: null }));

  return {
    animals,
    loading: status.loading,
    error: status.error,
    setFed,
    toggleFed,
    feedNow,
    clearError,
  } as const;
};