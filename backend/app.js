const express = require('express')
const dotenv = require('dotenv')
const apiProvider = require('./apiProvider')

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

const provider = apiProvider

app.get('/available-countries', async (req, res) =>{
    const countries = await provider.getAvailableCountries();
    res.send(countries);
})

app.get('/country-info/:countryCode', async (req, res) =>{
    const countryCode = req.params.countryCode
    const population = await provider.getCountryInfo(countryCode)
    res.send(population)
})

app.listen(port, () => 
    console.log(`Example app listening on port ${port}!`)
)