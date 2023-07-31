import {NextRequest, NextResponse} from "next/server";
import {Connection} from "@/database/client";
import {queries} from "@/database/queries";
import {useParams} from "next/navigation";

export async function GET(req: Request) {

    const params = req
        .url
        .split("/")[req.url.split("/").length - 1]
        .split("?")[1]
        .split("&")
        .reduce((acc, p) => {
            const [key, value] = p.split("=")

            acc[key] = value;

            return acc;
        }, {} as { [key:string]: any })


    if (!params["queryname"] || !Object.keys(queries).includes(params["queryname"])) {
        return NextResponse.json("query not available")
    }

    if (params["customerid"] && isNaN(Number(params["customerid"]))) {
        return NextResponse.json("customerid must be a number")
    }

    const c = await Connection.getInstance();

    const query = queries[params["queryname"]];

    const res = await c.executeQuery(query, params);

    return NextResponse.json(res)
}