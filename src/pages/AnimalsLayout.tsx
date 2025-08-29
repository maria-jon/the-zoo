import { Outlet } from "react-router-dom";
import { useAnimals } from "../hooks/useAnimals";

export type AnimalsCtx = ReturnType<typeof useAnimals>;

export const AnimalsLayout = () => {
    const ctx = useAnimals();

    return(
        <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" /*className="flex flex-col gap-6 sm:flex-row flex-wrap"*/>
            {ctx.error && (
                <p role="alert" style={{ color: "crimson" }}>
                    {ctx.error} <button onClick={ctx.clearError}>Stäng</button>
                </p>
            )}
            {/* Global loading indicator goes here */}
            <Outlet context={ctx} />
        </section>
    );
}