"use client"

import {useEffect, useState} from "react";
import {RentalQtyPerFilm, TotalRevenueStore} from "@/database/queries/interfaces";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ChartOptions, ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function RentalQtyPerFilm() {
    const [res, setRes] = useState<RentalQtyPerFilm[]>([])

    useEffect(() => {
        (async () => {

            const r = await fetch("/api/query?queryname=rental_qty_per_film", { method: "GET" });
            const j = await r.json();

            setRes(j);
        })()

    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Total rental for the top 10 most rented films',
            },
        },
    } as ChartOptions<"bar">;

    const colors = ['rgba(53, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)']

    const labels = res.map(r => r.title);

    const data = {
        labels,
        datasets: [
            {
                label: "Rentals",
                data: res.map(r => r.total_rentals),
                backgroundColor: colors.shift()
            }
        ]
    } as ChartData<"bar">;

    return (
        <div>
            <Bar data={data} options={options}/>
        </div>
    )

}