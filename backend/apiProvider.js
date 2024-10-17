const axios = require('axios').default;

class CountriesApi{
    constructor(){};
    
    async getAvailableCountries() {
        try {
            const countries = await axios.get("https://date.nager.at/api/v3/AvailableCountries")
            const flags = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`)
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
            const response  = await axios.get(`https://countriesnow.space/api/v0.1/countries/population`)
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
            const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`)
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
            const response = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
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