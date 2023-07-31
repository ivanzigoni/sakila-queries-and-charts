export interface TotalRevenueStore {
    store_id: number;
    store_address: string;
    revenue: number;
}

export interface RentalQtyPerFilm {
    film_id: number;
    total_rentals: number;
    title: string;
}

export interface RentalQtyPerYearMonth {
    total_rentals: number;
    rental_date: string
}

export interface MostRentedMoviesYearMonth {
    rental_date: string;
    film_title: string;
    film_count: number
}

export interface FilmsRentedCustomerYearMonth {
    customer_id: number;
    customer_name: string;
    film_title: string;
    rental_date: string;
}

export interface ActorsFromMostRentedFilm {
    rental_sum: number;
    film_id: number;
    actor_id: number;
    actor_name: string;
}



