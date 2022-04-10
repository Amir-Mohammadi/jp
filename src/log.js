const Logs = require("../models/log").Logs;
const Cards = require("../models/card").Cards;
const Users = require("../models/user").Users;
const JalaliDateTime = require("jalali-date-time").JalaliDateTime;
const jalali = JalaliDateTime();
const Joi = require("joi");

const userSchema = Joi.object().keys({
  fName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(30),
  lName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(30),
  pId: Joi.number(),
  cId: Joi.number(),
  timeStamp: Joi.date().iso(),
});

const time = jalali.now({
  // timezone: "+03:30",
  fullTextFormat: "W, D N Y H:I:S",
  titleFormat: "W, D N Y",
  dateFormat: "Y-M-D",
  timeFormat: "H:I:S",
});

class Log {
  async personInside(userId) {
    return await Logs.findOne({
      limit: 1,
      where: { userId: userId },
      order: [["createdAt", "DESC"]],
    })
      .then((user) => {
        if (user == null || user.isInside == false) console.log("Welcome");
        else console.log("Bye");

        if (user == null) return false;
        else return user.isInside;
      })
      .catch((err) => {
        return err;
      });
  }

  async login(cardId) {
    return await Cards.findByPk(cardId)
      .then(async (cardOwner) => {
        return Logs.create({
          userId: cardOwner.userId,
          timeStamp: time,
          isInside: !(await this.personInside(cardOwner.userId)),
        });
      })
      .then((record) => {
        return record;
      })
      .catch((err) => {
        return err;
      });
  }

  async manualLogin(personalId, timeStamp) {
    let dataToValidate = {
      pId: personalId,
      timeStamp: timeStamp,
    };
    const { error, value } = userSchema.validate(dataToValidate);
    if (error) {
      // return error;
      console.log(error);
    } else {
      const usrId = await Users.findOne({
        where: { personalId: personalId },
      });
      const Id = usrId.userId;
      console.log("+++++++", Id);

      return await Cards.findByPk(Id)
        .then(async (cardOwner) => {
          return await Logs.create({
            userId: Id,
            timeStamp: timeStamp,
            isInside: !(await this.personInside(Id)),
          });
        })
        .then((record) => {
          return record;
        })
        .catch((err) => {
          return err;
        });
    }
  }
}

const log = new Log();
log.manualLogin("8765", "1399-07-22 15:00:20");
// log.login("8765");
module.exports = { Log: Log };
