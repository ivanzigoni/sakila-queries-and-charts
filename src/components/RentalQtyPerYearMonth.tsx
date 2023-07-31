"use client"

import {useEffect, useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ChartOptions, ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {RentalQtyPerYearMonth} from "@/database/queries/interfaces";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function RentalQtyPerYearMonth() {
    const [res, setRes] = useState<RentalQtyPerYearMonth[]>([])

    useEffect(() => {
        (async () => {

            const r = await fetch("/api/query?queryname=rental_qty_per_year-month", { method: "GET" });
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
                text: 'Total rentals for each month/year',
            },
        },
    } as ChartOptions<"line">;

    const colors = ['rgba(53, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)']

    const labels = res.map(r => new Date(r.rental_date).toLocaleDateString("en"));

    const data = {
        labels,
        datasets: [
            {
                label: "Rental quantity",
                data: res.map(r => r.total_rentals),
                backgroundColor: colors.shift()
            }
        ]
    } as ChartData<"line">;

    return (
        <div>
            <Line data={data} options={options}/>
        </div>
    )

}