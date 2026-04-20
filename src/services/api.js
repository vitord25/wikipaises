import axios from 'axios'

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
})


export const getAllCountries = () =>
  api.get('/all?fields=name,flags,capital,region,population,cca3')


export const getCountriesByRegion = (region) =>
  api.get(`/region/${region}?fields=name,flags,capital,region,population,cca3`)


export const getCountriesByName = (name) =>
  api.get(`/name/${name}?fields=name,flags,capital,region,population,cca3`)


export const getCountryByCode = (code) =>
  api.get(`/alpha/${code}`)

// O ?fields= limita quais campos a API retorna — deixa a resposta menor e mais rápida

export default api