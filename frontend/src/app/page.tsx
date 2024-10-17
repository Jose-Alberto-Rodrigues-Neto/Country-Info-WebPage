"use client"
import CountryCard from "@/components/CountryCard";
import CountryCardList, { CountryCardListSkeleton } from "@/components/CountryCardsList";
import countryService, { AvailableCountriesModal } from "@/services/CountryService";
import React from "react";

export default function Home() {
  const [availableCountries, setAvailableCountries] = React.useState<AvailableCountriesModal[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchAvailableCountries = async () => {
    setIsLoading(true)
    try {
      const response = await countryService.getAvailableCountries()
      setAvailableCountries(response)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(()=>{
    fetchAvailableCountries()
  },[])
  
  if (isLoading) return (
    <section className="bg-white">
      <CountryCardListSkeleton/>
    </section>
  )

  return (
    <section className="flex flex-col w-full bg-white">
      <header className="flex items-center w-full h-32 bg-zinc-600">
        <h1 className="text-center text-2xl md:text-6xl w-full">Available Countries</h1>
      </header>
      <CountryCardList countries={availableCountries}/>
    </section>
  );
}
