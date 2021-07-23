const sequelize = require('sequelize');
const DataBase = require('./connection');
const jwt = require('jsonwebtoken')
const firm = 'datawarehouse' 

module.exports = {

    userOK: (req, res, next) => {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const verifyToken = jwt.verify(token, firm)
            if(verifyToken){
                req.user = verifyToken;
                return next()
            }
        } catch (err){
            res.json({error: 'El usuario no es válido'})
        }
    },

    userValidation: async (req, res, next) => {
        const { email } = req.body;
        const db = await DataBase.query(`SELECT * FROM users WHERE email = ?`, {
            replacements: [email],
            type: sequelize.QueryTypes.SELECT})
        const dbFind = db.find(item => item.email == req.body.email)
        if(!dbFind){
            return res.status(400).json('El usuario o contraseña ingresada no es válida');
        } 
        next() 
    },

    companieValidation: async (req, res, next) => {
      const company_id = req.params.company_id
      const db = await DataBase.query(`SELECT * FROM companies WHERE company_id = "${company_id}"`, {type: sequelize.QueryTypes.SELECT})
      const dbFind = db.find(item => item.company_id == company_id)
      if(!dbFind){
          return res.status(400).json('La compañía ingresada no existe');
      } 
      next() 
    },

    contactValidation: async (req, res, next) => {
      const id = req.params.contact_id
      const db = await DataBase.query(`SELECT * FROM contacts WHERE contact_id = "${id}"`, {type: sequelize.QueryTypes.SELECT})
      const dbFind = db.find(item => item.contact_id == id)
      if(!dbFind){
          return res.status(400).json('El contacto ingresado no existe');
      } 
      next() 
    },

    cityValidation: async (req, res, next) => {
      const id = req.params.city_id
      const db = await DataBase.query(`SELECT * FROM cities WHERE city_id = "${id}"`, {type: sequelize.QueryTypes.SELECT})
      const dbFind = db.find(item => item.city_id == id)
      if(!dbFind){
          return res.status(400).json('La ciudad ingresada no existe');
      } 
      next() 
    },

    countryValidation: async (req, res, next) => {
      const id = req.params.country_id
      const db = await DataBase.query(`SELECT * FROM countries WHERE country_id = "${id}"`, {type: sequelize.QueryTypes.SELECT})
      const dbFind = db.find(item => item.country_id == id)
      if(!dbFind){
          return res.status(400).json('El pais ingresado no existe');
      } 
      next() 
    },

    regionValidation: async (req, res, next) => {
      const id = req.params.region_id
      const db = await DataBase.query(`SELECT * FROM regions WHERE region_id = "${id}"`, {type: sequelize.QueryTypes.SELECT})
      const dbFind = db.find(item => item.region_id == id)
      if(!dbFind){
          return res.status(400).json('La región ingresada no existe');
      } 
      next() 
    }
}
       
