import axios, { AxiosInstance } from "axios";

export type AvailableCountriesModal = {
    country: string,
    countryCode: string,
    flag: string | null
}

class CountryService{
    private instance: AxiosInstance
    constructor(){
        this.instance = axios.create(
            {
                baseURL: "http://localhost:8080"
            }
        )
    }

    async getAvailableCountries(){
        try {
            const res = await this.instance.get('/available-countries')
            return res.data
        } catch (error) {
            return error
        }
    }

    async getCountryInfoById(countryCode: string){
        try{
            const res = await this.instance.get(`/country-info/${countryCode}`)
            return res.data
        }catch(error){
            return error
        }
    }
}

const countryService = new CountryService()

export default countryService