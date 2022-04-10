const database = require("../utils/dataBase");
const Users = require("../models/user").Users;
const Cards = require("../models/card").Cards;
const Logs = require("../models/log");

Cards.belongsTo(Users);
Users.hasMany(Cards);

database.sync().then(result => {
    console.log(result); 
})
.catch(err=>{
    console.log(err)
})
