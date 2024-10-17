import { AvailableCountriesModal } from "@/services/CountryService";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CountryCard({...props}: AvailableCountriesModal){
    return(
        <Link className="flex flex-row w-full h-44 bg-white rounded-md relative hover:shadow-xl" href={`/country-info/${props.countryCode}`}>
            <Image src={props.flag? props.flag : '/image.png'} alt={props.country} width={180} height={50} className="object-cover w-full rounded-md"/>
            <h1 className="absolute rounded-md text-2xl w-full bg-gradient-to-b from-transparent from-10% to-black bottom-0 font-bold text-white p-2">{props.country}</h1>
        </Link>
    )
}

export function CountryCardSkeleton(){
    return(
        <div className="flex flex-row w-full h-44 bg-white rounded-md relative hover:shadow-xl">
            <div className="object-cover w-full rounded-md bg-slate-300 animate-pulse"/>
            <h1 className="absolute w-1/3 h-8 rounded-sm p-2 left-2 bottom-4 bg-slate-400 animate-pulse"/>
        </div>
    )
}