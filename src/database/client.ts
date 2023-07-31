import { createConnection, Connection as MysqlConnection } from "mysql2"
import {Query} from "@/database/queries";

class Connection {

    public static instance: Connection;

    private constructor(private mysqlCon: MysqlConnection) {}

    static async getInstance() {
        if (!Connection.instance) {
            try {
                console.log("aki")
                const c: MysqlConnection = createConnection({
                    host: "database",
                    port: 3306,
                    user: "root",
                    password: "p_ssW0rd",
                    database: "sakila"
                });
                await c.connect();

                Connection.instance = new Connection(c);
            } catch (err) {
                console.log(err);
            }
        }

        return Connection.instance;
    }

    public async executeQuery(q: Query, params?: { [key:string]: string }) {

        try {
            const injectId = params ? [params["customerid"]] : null;

            const [res] = await this.mysqlCon.promise().query(q.rawQuery, injectId);

            return res;
        } catch (err) {
            console.log(err);
        }

    }

}

export { Connection };
