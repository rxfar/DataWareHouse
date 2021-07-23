const sequelize = require('sequelize');
const DataBase = require('./connection');
const jwt = require('jsonwebtoken')
const firm = 'datawarehouse' 

  module.exports ={

    signUp: async (req, res) =>{
        const reqemail = req.body.email;
        const db = await DataBase.query(`SELECT * FROM users WHERE email = "${reqemail}"`, { type: sequelize.QueryTypes.SELECT })
        const dbFind = db.find(item => item.email == reqemail)

        if (dbFind) {
            res.status(400).json({ msj: "Usuario existente - Correo registrado" });
        } else {
            DataBase.query(
                `INSERT INTO users (email, pass, first_name, last_name) VALUES ("${reqemail}", :pass, :first_name, :last_name)`,{
                    replacements: req.body
                })
            .then(result => (console.log(result)) || res.status(200).json("Usuario creado exitosamente"))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))  
        }
    },


    logIn: async (req,res) =>{
        const reqemail = req.body.email
        const reqPass = req.body.pass

        try {
          const data = await DataBase.query(`SELECT * FROM users WHERE email="${reqemail}" AND pass="${reqPass}"`, {
            type: sequelize.QueryTypes.SELECT,
          });
          if (data.length == 0) {
            res.status(401).json({ msj: "Error en LogIn" });
          } else {
            const dataToken = {
              id: data[0].id,
              email: data[0].email,
              first_name: data[0].first_name,
              last_name: data[0].last_name,
              is_admin: data[0].is_admin,
            };
            infoToken = jwt.sign(dataToken, firm, { expiresIn: "365d" });
            //console.log(infoToken);
            //console.log(dataToken);
            res.status(200).json({token: infoToken, admin: data[0].is_admin });
          }
        } catch (err) {
          console.log("error" + err);
        }
    },

    getUsers: (req,res)=>{
        DataBase.query('SELECT * FROM users', { type: sequelize.QueryTypes.SELECT }).then(result =>res.status(200).json(result))
    },

    deleteUser: (req, res) => { 
        const id = req.params.id   
            DataBase.query(`DELETE FROM users WHERE id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("User successfully deleted"))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))  
    },

    updateUser: (req,res) => {
        const id = req.params.id
        const { email, pass, first_name, last_name, is_admin}= req.body
        DataBase.query(`UPDATE users SET email = '${email}', pass = '${pass}', first_name = '${first_name}', last_name = '${last_name}', is_admin='${is_admin}' WHERE id = ${id} `,{type: sequelize.QueryTypes.SET})
        .then(result => (console.log(result)) || res.status(200).json('Usuario modificado exitosamente'))
        .catch(error => console.log(error) || res.status(400).send('Invalid status'))
    },

    createCompany: async (req, res) => {
        const { name, adress, email, phone, city_id} = req.body;
        try {
          const companyExistente = await DataBase.query("SELECT name FROM companies WHERE name=?", {
            replacements: [name],
            type: sequelize.QueryTypes.SELECT,
          });
          if (companyExistente.length == 0) {
            try {
              const data = await DataBase.query(
                `INSERT INTO companies (city_name, name,adress,email,phone,city_id) VALUES ((SELECT name FROM cities WHERE city_id = ${city_id}),?,?,?,?,?)`,
                {
                  replacements: [name, adress, email, phone, city_id],
                  type: sequelize.QueryTypes.INSERT,
                }
              );
              res.status(201).json({ msj: "Compañia creada exitosamente" });
            } catch (err) {
              console.log("error");
            }
          } else {
            res.status(400).json({ msj: "Compañia existente - registrada" });
          }
        } catch (err) {
          console.log("error");
        }
    },

    getCompanies: (req, res) => {
        DataBase.query('SELECT * FROM companies', { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).send('Error'))

    },

    updateCompany: async (req, res) => {
        const id = req.params.company_id
        const { name, adress, email, phone, city_id } = req.body;
        const idCompany = req.params.company_id;
        try {
          const companyExistente = await DataBase.query(`SELECT company_id FROM companies WHERE company_id=${id}`, {
            type: sequelize.QueryTypes.SELECT,
          });
          if (companyExistente.length != 0) {
            if (name && adress && email && phone && city_id) {
              try {
                const data = await DataBase.query(
                    `UPDATE companies SET name=?, adress=?, email=?, phone=?, city_id=? WHERE company_id=${id}`,
                  {
                    replacements: [name, adress, email, phone, city_id, idCompany],
                    type: sequelize.QueryTypes.UPDATE,
                  }
                );
                console.log(data);
                res.status(200).json({ msj: "Compañia modificada exitosamente" });
              } catch (err) {
                console.log("error");
              }
            } else {
              res.status(400).json({ msj: "Todos los campos deben estar completos" });
            }
          } else {
            res.status(400).json({ msj: "Id compañia erroneo - No se encuentra en Base de Datos" });
          }
        } catch (err) {
          console.log("error");
        }
      },

    deleteCompany: async (req, res) => {
        const company_id = req.params.company_id;
        const db = await DataBase.query(`SELECT * FROM contacts WHERE company_id = "${company_id}"`, { type: sequelize.QueryTypes.SELECT })
        const dbFind = db.find(item => item.company_id == company_id)

        if (dbFind) {
            res.status(400).json({ msj: "La compañia esta en uso, no esta permitido eliminarla" });
        } else {
            DataBase.query(
                `DELETE FROM companies WHERE company_id=${company_id}`, {type: sequelize.QueryTypes.DELETE
                })
            .then(result => (console.log(result)) || res.status(200).json('Compañia eliminada exitosamente'))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))
            }
        },

    createContact: async (req, res) => {
        const reqemail = req.body.email;
        const reqcityid = req.body.city_id;
        const company_id = req.body.company_id;
        const db = await DataBase.query(`SELECT * FROM contacts WHERE email = "${reqemail}"`, { type: sequelize.QueryTypes.SELECT })
        const dbFind = db.find(item => item.email == reqemail)

        if (dbFind) {
            res.status(400).json({ msj: "Contacto existente - Correo registrado" });
        } else{
            DataBase.query(
                `INSERT INTO contacts (first_name,last_name,charge,email,company_id,company_name,city_name, city_id, adress,interest,whatsapp_user,whatsapp_preferences,instagram_user,instagram_preferences,linkedin_user,linkedin_preferences) VALUES (:first_name,:last_name,:charge,"${reqemail}","${company_id}",(SELECT name FROM companies WHERE company_id = "${company_id}"), (SELECT name FROM cities WHERE city_id = "${reqcityid}"), "${reqcityid}", :adress,:interest,:whatsapp_user,:whatsapp_preferences,:instagram_user,:instagram_preferences,:linkedin_user,:linkedin_preferences)`,{
                replacements: req.body
            })
            .then(result => (console.log(result)) || res.status(200).json("Contacto creado exitosamente"))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))
        }
    },

    getContacts: async (req, res) => {
        DataBase.query('SELECT * FROM contacts', { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).send('Error'))
    },
          
    updateContact: async (req, res) => {
        const id = req.params.contact_id;
        const reqcityid = req.body.city_id;
        const {first_name,last_name,charge,email,company_id,adress,interest,whatsapp_user,whatsapp_preferences,instagram_user,instagram_preferences,linkedin_user,linkedin_preferences} = req.body;

        DataBase.query(`UPDATE contacts SET first_name="${first_name}",last_name="${last_name}",charge="${charge}",email="${email}",company_id="${company_id}",city_id="${reqcityid}",adress="${adress}",interest="${interest}",whatsapp_user="${whatsapp_user}",whatsapp_preferences="${whatsapp_preferences}",instagram_user="${instagram_user}",instagram_preferences="${instagram_preferences}",linkedin_user="${linkedin_user}",linkedin_preferences="${linkedin_preferences}" WHERE contact_id = ${id} `,{
            type: sequelize.QueryTypes.SET})
        .then(result => (console.log(result)) || res.status(200).json('Contact successfully updated'))
        .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    },

    deleteContact: async (req, res) => {
        const id = req.params.contact_id;
        DataBase.query(
                `DELETE FROM contacts WHERE contact_id="${id}"`, {
                type: sequelize.QueryTypes.DELETE,
            })
            .then(result => (console.log(result)) || res.status(200).json('Contacto eliminado exitosamente'))
            .catch(error => console.log(error) || res.status(400).send('Algo salió mal'))
    },

    createCountry: async(req,res) =>{
      const {name, region_id} = req.body;
      const db = await DataBase.query(`SELECT * FROM countries WHERE name = "${name}"`, {type: sequelize.QueryTypes.SELECT})
      const dbFind = db.find(item => item.name == name)

      if(dbFind){
        res.status(400).json({ msj: "El país ya se encuentra registrado" });
        } else{
            DataBase.query(
                `INSERT INTO countries (name, region_id) VALUES ("${name}","${region_id}")`, {
                type: sequelize.QueryTypes.INSERT,
            })
            .then(result => (console.log(result)) || res.status(200).json('País creado exitosamente'))
            .catch(error => console.log(error) || res.status(400).send('Algo salió mal'))
        }
    },

    createRegion: async(req,res) =>{
      const name = req.body.name;
      try {
        const regionExistente = await DataBase.query("SELECT name FROM regions WHERE name=?", {
          replacements: [name],
          type: sequelize.QueryTypes.SELECT,
        });
        if (regionExistente.length == 0) {
          try {
            const data = await DataBase.query(
              "INSERT INTO regions (name) VALUES (?)",
              {
                replacements: [name],
                type: sequelize.QueryTypes.INSERT,
              }
            );
            res.status(201).json({ msj: "Region creada exitosamente" });
          } catch (err) {
            console.log("error");
          }
        } else {
          res.status(400).json({ msj: "Region existente - registrada" });
        }
      } catch (err) {
        console.log("error");
      }
    },

    getCities: async(req,res) =>{
      DataBase.query('SELECT * FROM cities', { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).send('Error'))
    },

    getCountries: async(req,res) =>{
      DataBase.query('SELECT * FROM countries', { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).send('Error'))
    },

    getRegions: async(req,res) =>{
      DataBase.query('SELECT * FROM regions', { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).send('Error'))
    },

    updateCity: async(req,res) =>{
      const id = req.params.city_id
      const { name, country_id } = req.body;

      DataBase.query(`UPDATE cities SET name="${name}", country_id="${country_id}" WHERE city_id="${id}"`,{
            type: sequelize.QueryTypes.SET})
      .then(result => (console.log(result)) || res.status(200).json('Ciudad modificada exitosamente'))
      .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    },

    updateCountry: async(req,res) =>{
      const id = req.params.country_id
      const { name } = req.body;

      DataBase.query(`UPDATE countries SET name="${name}" WHERE country_id="${id}"`,{
            type: sequelize.QueryTypes.SET})
      .then(result => (console.log(result)) || res.status(200).json('País modificado exitosamente'))
      .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    },

    updateRegion: async(req,res) =>{
      const id = req.params.region_id
      const { name } = req.body;

      DataBase.query(`UPDATE regions SET name="${name}" WHERE region_id="${id}"`,{
            type: sequelize.QueryTypes.SET})
      .then(result => (console.log(result)) || res.status(200).json('Región modificada exitosamente'))
      .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    },

    deleteCity: async(req,res) =>{
      const id = req.params.city_id;
      DataBase.query(
              `DELETE FROM cities WHERE city_id="${id}"`, {
              type: sequelize.QueryTypes.DELETE,
        })
        .then(result => (console.log(result)) || res.status(200).json('Ciudad desactivada exitosamente'))
        .catch(error => console.log(error) || res.status(400).send('Algo salió mal'))
    },

    deleteCountry: async(req,res) =>{
      const id = req.params.country_id;
      const db = await DataBase.query(`SELECT * FROM cities WHERE country_id = "${id}"`, { type: sequelize.QueryTypes.SELECT })
      const dbFind = db.find(item => item.company_id == id)

      if (dbFind) {
          res.status(400).json({ msj: "El país está en uso, no esta permitido desactivarlo" });
      } else {
        DataBase.query(
          `DELETE FROM countries WHERE country_id=${id}`, {type: sequelize.QueryTypes.DELETE
        })
        .then(result => (console.log(result)) || res.status(200).json('País eliminado exitosamente'))
        .catch(error => console.log(error) || res.status(400).send('Invalid data'))
      }
    },

    deleteRegion: async(req,res) =>{
      const id = req.params.region_id;
      const db = await DataBase.query(`SELECT * FROM countries WHERE region_id = "${id}"`, { type: sequelize.QueryTypes.SELECT })
      const dbFind = db.find(item => item.company_id == id)

      if (dbFind) {
          res.status(400).json({ msj: "La región está en uso, no esta permitido eliminarla" });
      } else {
        DataBase.query(
          `DELETE FROM regions WHERE region_id=${id}`, {type: sequelize.QueryTypes.DELETE
        })
        .then(result => (console.log(result)) || res.status(200).json('Región eliminada exitosamente'))
        .catch(error => console.log(error) || res.status(400).send('Invalid data'))
      }
    },

    createCity: async(req,res) =>{
      const {name, country_id} = req.body;
      try {
        const cityExistente = await DataBase.query("SELECT name FROM cities WHERE name=?", {
          replacements: [name],
          type: sequelize.QueryTypes.SELECT,
        });
        if (cityExistente.length == 0) {
          try {
            const data = await DataBase.query(
              `INSERT INTO cities (name,country_id) VALUES ("${name}","${country_id}")`,
              {type: sequelize.QueryTypes.INSERT}
            );
            res.status(201).json({ msj: "Ciudad creada exitosamente" });
          } catch (err) {
            console.log("error");
          }
        } else {
          res.status(400).json({ msj: "Ciudad existente - registrada" });
        }
      } catch (err) {
        console.log("error");
      }
    }
  }