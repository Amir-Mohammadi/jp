const Logs = require("../models/log").Logs;
const Cards = require("../models/card").Cards;
const Users = require("../models/user").Users;
const Sequelize = require("sequelize");

class Report {
  async reporter(personalId, startDate, endDate) {
    try {
      const currentUser = await Users.findOne({
        where: {
          personalId: personalId,
        },
      });
      const usr = await Logs.findAll({
        attributes: ["timeStamp"],
        where: { userId: currentUser.userId },
      });
      const userLogs = JSON.stringify(usr);
      console.log(userLogs);

      let tempstr = userLogs.split(",");

      let strDateTime = [];
      for (let i = 0; i < tempstr.length; i++) {
        if (i === 0) strDateTime[i] = tempstr[i].slice(15, 34);
        else strDateTime[i] = tempstr[i].slice(14, 33);
      }
      console.log(strDateTime.sort());
      strDateTime = strDateTime.sort();

      let tempArr = [];
      for (let k = 0; k < strDateTime.length; k++) {
        tempArr[k] = strDateTime[k].slice(0, 10);
      }

      let startIndex = tempArr.indexOf(startDate);
      let endIndex = tempArr.lastIndexOf(endDate);

      let arrayDate = [];
      for (let j = startIndex; j <= endIndex; j++) {
        arrayDate[j] = new Date(strDateTime[j]);
      }
      if (arrayDate.length % 2 !== 0) {
        console.log("logs are not in pairs!");
      }

      let difference = 0;
      let sumDifference = 0;
      for (let i = 0; i < arrayDate.length; i += 2) {
        difference = arrayDate[i + 1] - arrayDate[i];
        sumDifference = difference + sumDifference;
      }
      console.log(msToTime(sumDifference));
    } catch (err) {
      console.log(err);
    }
  }
}

const x = new Report();
x.reporter("8765", "1399-07-22", "1399-07-24");

module.exports = { Report: Report };

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor(duration / (1000 * 60 * 60));

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
