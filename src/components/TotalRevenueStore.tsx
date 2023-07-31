"use client"

import {useEffect, useState} from "react";
import {TotalRevenueStore} from "@/database/queries/interfaces";
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

export function TotalRevenueStore() {
    const [res, setRes] = useState<TotalRevenueStore[]>([])

    useEffect(() => {
        (async () => {

            const r = await fetch("/api/query?queryname=total-revenue-store", { method: "GET" });
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
                text: 'Total revenue for each store',
            },
        },
    } as ChartOptions<"bar">;

    const colors = ['rgba(53, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)']

    const labels = res.map(s => s.store_address + " Store")

    const data = {
        labels,
        datasets: [
            {
                label: "Revenue",
                data: res.map(s => s.revenue),
                backgroundColor: colors.pop()
            }
        ]
    } as ChartData<"bar">;

    return (
        <div>
            <Bar data={data} options={options}/>
        </div>
    )

}