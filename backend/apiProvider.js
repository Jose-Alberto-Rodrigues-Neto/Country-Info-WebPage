const axios = require('axios').default;
const dotenv = require('dotenv')

dotenv.config()
class CountriesApi{
    constructor(){
        this.apiDateNager = process.env.API_DATE_NAGER;
        this.apiCountriesNow = process.env.API_COUNTRIES_NOW
    };
    
    async getAvailableCountries() {
        try {
            const countries = await axios.get(`${this.apiDateNager}/AvailableCountries`)
            const flags = await axios.get(`${this.apiCountriesNow}/flag/images`)
            const availableCountries = countries.data.map(country => {
                const flagUrl = flags.data.data.find(flag => flag.name === country.name)
                return {
                    country: country.name,
                    countryCode: country.countryCode,
                    flag: flagUrl ? flagUrl.flag : null
                }
            })
            return availableCountries
        } catch (error) {
          console.error(error);
          return error
        }
    };
    
    async getPopulationData(countryName){
        try {
            const response  = await axios.get(`${this.apiCountriesNow}/population`)
            const countries = response.data.data
                                    .find(country => country.country === countryName)        
            const populationCounts = countries.populationCounts
            return populationCounts
        } catch (error) {
            return error
        }
    }
    
    async getFlagURL(countryName){
        try{
            const response = await axios.get(`${this.apiCountriesNow}/flag/images`)
            const countries = response.data.data
                                .find(country => country.name === countryName)
            const flagURL = countries.flag               
            return flagURL
        }catch(error){
            return error
        }
    }

    async getCountryInfo(countryCode){
        try {
            const response = await axios.get(`${this.apiDateNager}/CountryInfo/${countryCode}`)
            const countryName = response.data.commonName
            const region = response.data.region
            const borders = response.data.borders
            const populationData = await this.getPopulationData(countryName)
            const flagURL = await this.getFlagURL(countryName)
            const countryInfo = {
                countryName,
                countryCode,
                region,
                borders,
                populationData,
                flagURL
            }
            return countryInfo

        } catch (error) {
            
        }
    }
}

const apiProvider = new CountriesApi()

module.exports = apiProvider;