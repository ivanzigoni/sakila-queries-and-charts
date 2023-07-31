"use client"

import {useEffect, useState} from "react";
import {MostRentedMoviesYearMonth, RentalQtyPerFilm} from "@/database/queries/interfaces";


export function MostRentedMoviesYearMonth() {
    const [res, setRes] = useState<{ date: string, films: string[], count: number }[]>([])

    useEffect(() => {
        (async () => {

            const r = await fetch("/api/query?queryname=most_rented_movies_year-month", { method: "GET" });
            const j = await r.json() as MostRentedMoviesYearMonth[];

            console.log(j)

            const serialized = j.reduce((acc, el) => {
                if (!acc[el.rental_date]) {
                    acc[el.rental_date] = {
                        date: el.rental_date,
                        films: [el.film_title],
                        count: el.film_count
                    }
                } else {
                    acc[el.rental_date].films.push(el.film_title);
                    acc[el.rental_date].count = el.film_count;
                }

                return acc;
            }, {}) as { [key:string]: { date: string, films: string[], count: number } }

            setRes(Object.values(serialized));
        })()

    }, [])


    return (
        <div className={"text-center m-2"}>
            <p>Most rented films by month/year</p>
            {
                res.map(r => (
                    <div className={""} key={r.date}>
                        {
                            r.films.length === 1
                            ? <p>For the date {new Date(r.date).toLocaleDateString("en")}, the following film was rented {r.count} time</p>
                            : <p>For the date {new Date(r.date).toLocaleDateString("en")}, the following films were rented {r.count} times</p>
                        }

                        <details>
                            <summary>Films list</summary>
                            <ul>
                                {r.films.map(f => <li key={f}>{f}</li>)}
                            </ul>
                        </details>
                    </div>
                ))
            }
        </div>
    )

}