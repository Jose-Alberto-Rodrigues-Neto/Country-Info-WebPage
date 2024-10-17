import { CountryInfoModal } from "@/app/country-info/[countrycode]/page";
import Image from "next/image";

interface CountryInfoHero{
    props: CountryInfoModal | null
}
export default function CountryInfoHero({props}: CountryInfoHero){
    if(!props){
        return(
            <div></div>
        )
    }
    return(
        <div className="grid md:grid-cols-2 w-full p-3 gap-5">
            <div className="relative">
                <Image src={props.flagURL} alt={props.countryName} height={180} width={180} className="object-cover w-full h-72 rounded-md"/>
                <h1 className="absolute bottom-8 md:bottom-16 left-2 text-xl lg:text-3xl text-slate-900">Country Name: {props.countryName}, {props.countryCode}</h1>
                <h2 className="absolute bottom-2 md:bottom-6 left-2 text-xl lg:text-3xl text-slate-900">Region: {props.region}</h2>
            </div>
                <div className="flex flex-col h-72">
                    <h1 className="text-2xl font-bold text-black my-2">Population by Year</h1>
                    <ul className="flex flex-col h-full overflow-y-auto gap-4 py-2 px-1 bg-slate-100 rounded-t-md">
                        {
                            props.populationData.map((data, key)=>(
                                <div key={key} className="flex flex-row gap-2 text-lg text-slate-600 w-full p-2 bg-slate-200 rounded-md">
                                    <h1>Year: {data.year}</h1>
                                    <h2>Population: {data.value}</h2>
                                </div>
                            ))
                        }
                    </ul>
                    <div className="w-full text-lg font-bold text-center text-slate-600 bg-slate-100 rounded-b-md">
                        ...
                    </div>
                </div>
        </div>
    )
}