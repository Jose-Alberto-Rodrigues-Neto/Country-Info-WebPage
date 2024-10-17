import { AvailableCountriesModal } from "@/services/CountryService";
import CountryCard, { CountryCardSkeleton } from "./CountryCard";

interface CountryCardListProps{
    countries: AvailableCountriesModal[]
}
export default function CountryCardList({countries}: CountryCardListProps){
    return(
    <ul className="w-full p-4 gap-6 self-center grid md:grid-cols-3 ">
        {countries.map((country, key)=>(
            <CountryCard key={key} country={country.country} countryCode={country.countryCode} flag={country.flag}/>
        ))}
    </ul>
    )
    
}

export function CountryCardListSkeleton(){
    return <ul className="grid grid-cols-3 w-full gap-6 p-4">
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
            <CountryCardSkeleton/>
        </ul>
}