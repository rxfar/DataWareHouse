const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5500;
const app = express();

app.use(express.json());
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});

const {userOK, userValidation, companieValidation, regionValidation, countryValidation, cityValidation, contactValidation} = require('./middlewares');
const {signUp,  logIn, getUsers, deleteUser, updateUser, createCompany, getCompanies, updateCompany, deleteCompany, createContact, getContacts, updateContact, deleteContact, createRegion, getRegions, updateRegion, deleteRegion, createCountry, getCountries, updateCountry, deleteCountry, createCity, getCities, updateCity, deleteCity} = require('./functions');

// USERS
app.post('/users', signUp);
app.post('/users/login', userValidation, logIn);
app.get('/users', getUsers); 
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

// COMPANIES
app.post("/companies", userOK, createCompany);
app.get("/companies", userOK, getCompanies);
app.put("/companies/:company_id", userOK, companieValidation, updateCompany);
app.delete("/companies/:company_id", userOK, companieValidation, deleteCompany);

// CONTACTS
app.post("/contacts", userOK, createContact);
app.get("/contacts", userOK, getContacts);
app.put("/contacts/:contact_id", userOK, contactValidation, updateContact);
app.delete("/contacts/:contact_id", userOK, contactValidation, deleteContact);

// REGIONS
app.post("/regions", userOK, createRegion); 
app.get("/regions", userOK, getRegions);
app.put("/regions/:region_id", userOK, regionValidation, updateRegion);
app.delete("/regions/:region_id", userOK, regionValidation, deleteRegion);

// COUNTRIES
app.post("/countries", userOK, createCountry);
app.get("/countries", userOK, getCountries);
app.put("/countries/:country_id", userOK, countryValidation, updateCountry);
app.delete("/countries/:country_id", userOK, countryValidation, deleteCountry);

// CITIES
app.post("/cities", userOK, createCity);
app.get("/cities", userOK, getCities);
app.put("/cities/:city_id", cityValidation, userOK, updateCity);
app.delete("/cities/:city_id", cityValidation, userOK, deleteCity);
