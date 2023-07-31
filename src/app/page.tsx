import Image from 'next/image'
import {TotalRevenueStore} from "@/components/TotalRevenueStore";
import {RentalQtyPerFilm} from "@/components/RentalQtyPerFilm";
import {RentalQtyPerYearMonth} from "@/components/RentalQtyPerYearMonth";
import {MostRentedMoviesYearMonth} from "@/components/MostRentedMoviesYearMonth";
import {FilmsRentedCustomerYearMonth} from "@/components/FilmsRentedCustomerYearMonth";

export default function Home() {
  return (
      <div className={""}>
            <div>
                <p>welcome</p>
                <p>the following are drafts for data visualization from querying results on sakila mysql sample database</p>
                <p>nextjs + chartjs deployed alongside a already seeded mysql sakila db through docker-compose</p>
            </div>
            <RentalQtyPerYearMonth />
            <MostRentedMoviesYearMonth />
            <RentalQtyPerFilm />
            <TotalRevenueStore />
            <FilmsRentedCustomerYearMonth />
      </div>
  )
}
