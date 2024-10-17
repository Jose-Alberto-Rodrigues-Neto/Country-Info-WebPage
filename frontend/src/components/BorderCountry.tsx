import { CountryBorders } from "@/app/country-info/[countrycode]/page";
import Link from "next/link";

export function BorderCountry({...props}:CountryBorders){
    return(
        <Link href={`/country-info/${props.countryCode}`} className="flex flex-row w-full gap-2 p-2 rounded-sm bg-slate-300 text-black">
            <h1>{props.commonName},</h1> 
            <h2>{props.countryCode}</h2> 
            <h2>Region:{props.region}</h2>
        </Link>
    )
}

function BorderCountrySkeleton(){
    return(
        <div className="flex flex-row w-full gap-2 p-2 rounded-sm bg-slate-300 animate-pulse">
            <h1 className="w-24 bg-slate-400 animate-pulse h-1/2 p-4 rounded-sm"></h1> 
            <h2 className="w-24 bg-slate-400 animate-pulse h-1/2 p-4 rounded-sm"></h2> 
            <h2 className="w-24 bg-slate-400 animate-pulse h-1/2 p-4 rounded-sm"></h2>
        </div>
    )
}

interface BorderCountryListProps{
    props: CountryBorders[]
}
export function BorderCountryList({props}: BorderCountryListProps){
    return(
        <div className="flex flex-col gap-4">
            {
                props.map((info, key)=>(
                    <BorderCountry key={key} commonName={info.commonName} officialName={info.officialName} countryCode={info.countryCode} region={info.region} borders={info.borders} />                   
                ))
            }
        </div>
    )
    
}

export function BorderCountryListSkeleton(){
    return(
        <ul className="flex flex-col gap-4">
            <BorderCountrySkeleton/>
            <BorderCountrySkeleton/>
            <BorderCountrySkeleton/>
            <BorderCountrySkeleton/>
        </ul>
    )
}