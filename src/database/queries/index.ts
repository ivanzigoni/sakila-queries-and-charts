export interface Query {
    name: string;
    description: string;
    rawQuery: string;
}

export interface QueryMap {
    [key: string]: Query
}


const queries: QueryMap = {

    "total-revenue-store": {
        name: "total-revenue-store",
        description: "total revenue for each store",
        rawQuery: `
            select
            s.store_id ,
            concat(a.district, " ", c2.city) as store_address ,
            sum(p.amount) as revenue
            from payment p 
            join rental r on r.rental_id = p.rental_id 
            join customer c on c.customer_id = r.customer_id 
            join store s on s.store_id = c.store_id 
            join address a on a.address_id = s.address_id 
            join city c2 on c2.city_id  = a.city_id 
            group by s.store_id;
        `,
    },

    "rental_qty_per_film": {
        name: "rental_qty_per_film",
        description: "number of times each film has been rented",
        rawQuery: `
            select
            count(r.rental_id) as total_rentals,
            f.film_id,
            f.title 
            from rental r 
            join inventory i ON r.inventory_id  = i.inventory_id 
            join film f on f.film_id = i.film_id 
            group by f.film_id 
            order by total_rentals desc
            limit 10;
        `
    },

    "rental_qty_per_year-month": {
        name: "rental_qty_per_year/month",
        description: "number of rentals for each year/month",
        rawQuery: `
        select 
        res.total_rentals as total_rentals,
        date(concat(res.rental_year, "-", res.rental_month, "-", "1")) as rental_date
        from (
            select
            count(r.rental_id) as total_rentals,
            year(r.rental_date) as rental_year,
            month(r.rental_date) as rental_month
            from rental r
            group by year(r.rental_date), month(r.rental_date)
            order by total_rentals desc
        ) as res
        order by rental_date;
        `
    },

    "most_rented_movies_year-month": {
        name: "most_rented_movies_year/month",
        description: "most rented films for each year/month",
        rawQuery: `
        select
        date(concat(res1.rental_year, "-" , res1.rental_month, "-" , "1")) as rental_date,
        res1.film_title,
        res1.film_count
        from (
            select
            year(r.rental_date) as rental_year,
            month(r.rental_date) as rental_month,
            f.title as film_title,
            count(f.title) as film_count
            from
            rental r 
            join inventory i on i.inventory_id = r.inventory_id 
            join film f on f.film_id = i.film_id 
            group by year(r.rental_date), month(r.rental_date), film_title
        ) as res1
        join (
            select
            max(res.film_count) as max_count,
            res.rental_year,
            res.rental_month
            from (
                select
                year(r.rental_date) as rental_year,
                month(r.rental_date) as rental_month,
                f.title as film_title,
                count(f.title) as film_count
                from
                rental r 
                join inventory i on i.inventory_id = r.inventory_id 
                join film f on f.film_id = i.film_id 
                group by year(r.rental_date), month(r.rental_date), film_title
            ) as res
            group by res.rental_year, res.rental_month
        ) as res2
        on res2.rental_year = res1.rental_year and res2.rental_month = res1.rental_month and res2.max_count = res1.film_count
        `
    },

    "films_rented_customer_year-month": {
        name: "films_rented_customer_year/month",
        description: "films rented by customer_id for each year/month",
        rawQuery: `
        select
        res.customer_id,
        res.customer_name,
        res.film_title,
        date(concat(res.rental_year, "-", res.rental_month, "-", "1")) as rental_date
        from (
            select
            year(r.rental_date) as rental_year,
            month(r.rental_date) as rental_month,
            concat(c.first_name, " ", c.last_name) as customer_name,
            c.customer_id,
            f.title as film_title
            from customer c 
            join rental r on r.customer_id = c.customer_id 
            join inventory i on i.inventory_id = r.inventory_id 
            join film f on f.film_id = i.film_id 
            group by year(r.rental_date), month(r.rental_date), c.customer_id, f.film_id 
            having c.customer_id = ?
        ) as res
        `
    },

    "actors_from_most_rented_film": {
        name: "actors_from_most_rented_film",
        description: "all actors and/or actresses from most rented film",
        rawQuery: `
        select
        res.*,
        a.actor_id,
        concat(a.first_name, " ", a.last_name) as actor_name
        from actor a 
        join film_actor fa on fa.actor_id = a.actor_id 
        join film f on f.film_id = fa.film_id 
        join (
            select
            count(r.rental_id) as rental_sum,
            f.film_id
            from rental r 
            join inventory i on i.inventory_id = r.inventory_id 
            join film f on i.film_id = f.film_id 
            group by f.film_id 
            order by rental_sum desc
            limit 1
        ) as res on res.film_id = f.film_id 
        `
    }

}

export { queries };
