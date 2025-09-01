import { Link } from "react-router-dom";

import bearsImg from "../assets/two-brown-bears.jpg";
import deerImg from "../assets/child-feeding-deer.jpg";
import brokenImg from "../assets/broken-image.svg";

export const Start = () => {
    return(
        <>
            <section className="p-4 rounded-xl border-2 border-teal-700">
                <h2 className="text-4xl mb-6">Välkommen till Zoo-Bop-a-Lula!</h2>
                <div className="no-flex sm:flex justify-between">
                    <img 
                        src={deerImg}
                        alt="Barn som matar rådjur genom ett staket"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = brokenImg;
                        }}
                        className="w-full h-[30vh] sm:h-[40vh] sm:w-1/2 object-cover rounded-xl"
                    />
                    <div className="w-full pt-6 sm:w-1/2 sm:pt-0 sm:pl-6">
                        <p>Hos oss får du komma riktigt nära djuren - klappa, mata och upptäcka deras unika personligheter. Från mjuka kaniner till nyfikna illrar väntar oförglömliga möten för hela familjen.</p>
                        <p className="mt-4">Kom och upplev en dag fylld av lek, lärande och kärlek till djuren!</p>
                        <p className="mt-4"><Link to="/animals">Hälsa på djuren redan nu →</Link></p>
                    </div>
                </div>
            </section>
            <section className="p-4 rounded-xl border-2 border-teal-700 mt-12">
                <h3 className="text-3xl mb-4">Aktiviteter på Zoo-Bop-a-Lula</h3>
                <ul className="list-inside list-disc">
                    <li>Klappa och mata djuren i kontaktgården</li>
                    <li>Ge illrar och kaniner deras favoritgodis</li>
                    <li>Följ med på matstunder och lär dig mer om djuren</li>
                    <li>Guidad tur med roliga fakta och berättelser</li>
                    <li>Pysselhörna och lekfulla aktiviteter för barn</li>
                </ul>
            </section>

            <section className="p-4 rounded-xl border-2 border-teal-700 mt-12">
                <h3 className="text-3xl mb-4">Öppettider</h3>
                <div className="no-flex sm:flex justify-between">
                    <table className="text-left w-full mb-6 sm:mb-0 sm:mr-6 md:w-1/3">
                        <tbody>
                            <tr>
                                <th>Måndag</th>
                                <td>Stängt</td>
                            </tr>
                            <tr>
                                <th>Tisdag</th>
                                <td>10:00-16:00</td>
                            </tr>
                            <tr>
                                <th>Onsdag</th>
                                <td>10:00-18:00</td>
                            </tr>
                            <tr>
                                <th>Torsdag</th>
                                <td>10:00-18:00</td>
                            </tr>
                            <tr>
                                <th>Fredag</th>
                                <td>11:00-19:00</td>
                            </tr>
                            <tr>
                                <th>Lördag</th>
                                <td>11:00-19:00</td>
                            </tr>
                            <tr>
                                <th>Söndag</th>
                                <td>11:00-19:00</td>
                            </tr>
                        </tbody>
                    </table>
                    <img 
                        src={bearsImg}
                        alt="Två brunbjörnar"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = brokenImg;
                        }}
                        className="w-full h-[30vh] sm:h-[40vh] sm:w-1/2 md:w-full object-cover rounded-xl"
                    />
                </div>

            </section>
        </>
    )
}