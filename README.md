welcome

the following are charts and displays for some sakila queries i have built

queries at `/queries.sql` or `/src/database/queries/index.ts`

since i couldnt find a way to run docker-compose at a cloud service, this project wont be deployed

to run the project + db run `docker compose up -d` and the frondtend will be available at `localhost:3000`

tooling:

- nextjs + chartjs + raw html tags for displaying results
- mysql2 as mysql driver
- sakila/mysql image for sakila seeded db running on a container

query results preview:

`
-- total revenue for each store
`

![img.png](readme_images/img.png)

---

`-- number of times each film has been rented`

![img_1.png](readme_images/img_1.png)

---

`-- number of rentals for each year/month`

![img_2.png](readme_images/img_2.png)

---

`-- most rented films for each year/month`

![img_3.png](readme_images/img_3.png)

---

`-- films rented by customer_id`

![img_4.png](readme_images/img_4.png)

---

`-- films list per language`

![img_5.png](readme_images/img_5.png)

---

`-- all actors and/or actresses from most rented film`

![img_6.png](readme_images/img_6.png)