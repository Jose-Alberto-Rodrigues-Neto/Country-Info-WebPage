"use client"
import {BorderCountryList, BorderCountryListSkeleton} from "@/components/BorderCountry"
import CountryInfoHero from "@/components/CountryInfoHero"
import { BarChartByYear } from "@/components/ui/BarChartByYear"
import countryService from "@/services/CountryService"
import React from "react"

export type CountryBorders = {
    commonName: string
    officialName: string
    countryCode: string
    region: string
    borders: null
}

export type PoputalionModal = {
    year: string
    value: string
}

export interface CountryInfoModal{
    countryName: string
    countryCode: string
    region: string
    borders: CountryBorders[],
    populationData: PoputalionModal[]
    flagURL: string
}

interface CountryInfoProps{
    params: {countrycode: string}
}
export default function CountryInfo({params}: CountryInfoProps){
    const [countryInfo, setCountryInfo] = React.useState<CountryInfoModal>()
    const [bordersInfo, setBordersInfo] = React.useState<CountryBorders[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchCountryInfo = async() => {
        setIsLoading(true)
        try {
            const res = await countryService.getCountryInfoById(params.countrycode)
            setCountryInfo(res)
            setBordersInfo(res.borders)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(()=>{
        fetchCountryInfo()
    },[])

    if(isLoading){
        return(
            <section className="h-full w-full bg-white">
                <div className="w-full grid md:grid-cols-2 h-72 p-4 gap-4">
                    <div className="relative h-full w-full bg-slate-200 rounded-md">
                        <h1 className="absolute bottom-4 left-3 w-1/3 bg-slate-300 h-10 rounded-sm"></h1>
                    </div>
                    <div className="flex flex-col items-center h-full w-full bg-slate-200 rounded-md">
                        <h1 className="w-1/2 mt-4 justify-center bg-slate-300 h-10 rounded-sm"></h1>
                        <h1 className="w-1/2 mt-4 justify-center bg-slate-300 h-10 rounded-sm"></h1>
                        <h1 className="w-1/2 mt-4 justify-center bg-slate-300 h-10 rounded-sm"></h1>
                    </div>
                </div>
                <div className="flex flex-col w-full px-10 gap-4">
                    <h2 className="text-2xl md:text-3xl">
                        Borders Countries
                    </h2>
                    <BorderCountryListSkeleton/>
                </div>
                
            </section>
        )
    }
    return(
        <section className="flex flex-col w-full bg-white pb-10">
            <CountryInfoHero props={countryInfo? countryInfo: null}/>
            <div className="p-10">
                <BarChartByYear data={countryInfo? countryInfo.populationData : []}/>
            </div>
            
            <div className="flex flex-col w-full gap-4 px-10 text-black">
                <h2 className="text-2xl md:text-3xl">
                    Borders Countries
                </h2>
                <BorderCountryList props={bordersInfo}/>
            </div>
        </section>
    )
}