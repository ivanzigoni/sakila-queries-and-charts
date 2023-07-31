"use client"

import {useEffect, useState} from "react";
import {FilmsRentedCustomerYearMonth, MostRentedMoviesYearMonth} from "@/database/queries/interfaces";

interface Serialized {
    customer_name: string;
    dates: {
        [key:string]: [string]
    }
}

const serialize = (res: FilmsRentedCustomerYearMonth[]) => Object.values(
    res.reduce((acc, c) => {
        const {
            customer_id,
            customer_name,
            film_title,
            rental_date
        } = c;

        if (!acc[customer_name]["dates"][rental_date]) {
            acc[customer_name]["customer_name"] = customer_name
            acc[customer_name]["dates"][rental_date] = [film_title]
        } else {
            acc[customer_name]["dates"][rental_date].push(film_title)
        }

        return acc
    }, { [res[0].customer_name]: { dates: {} } })
)[0] as Serialized

export function FilmsRentedCustomerYearMonth() {
    const [res, setRes] = useState<Serialized>({ dates: [] } as Serialized)

    const [cusId, setCusId] = useState(5);

    const fetchCustomer = async (cId: string | number) => {
        const r = await fetch(`/api/query?queryname=films_rented_customer_year-month&customerid=${cusId}`, { method: "GET" });
        const j = await r.json() as FilmsRentedCustomerYearMonth[];

        if (j.length === 0) {
            return res;
        }

        return serialize(j);

    }

    useEffect(() => {
        (async () => {

            const customer = await fetchCustomer(cusId);

            setRes(customer);

        })()
    }, [])

    const handleClick = async ()=> {
        const customer = await fetchCustomer(cusId)

        setRes(customer)
    }

    const handleInput = (e) => {
        setCusId(e.target.value)
    }

    return (
        <div className={"text-center"}>
            <p>Rented films by month/year given a valid customer id</p>
            <div>
                <span>customer_id </span>
                <input type={"number"} value={cusId} className={"border border-black"} onChange={handleInput}/>
                <button className={"border border-black"} onClick={handleClick}>OK</button>
            </div>
            <p>Customer {res.customer_name}</p>
            {Object.entries(res.dates).map(d => {
                const [date, films] = d;

                return (
                    <div key={date}>
                        <p>Date: {new Date(date).toLocaleDateString("en")}</p>
                        <details>
                            <summary>
                                Films list
                            </summary>
                            <ul>
                                {films.map(film => (
                                    <li key={film}>{film}</li>
                                ))}
                            </ul>
                        </details>
                    </div>
                )

            })}
        </div>
    )

}