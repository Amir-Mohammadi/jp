const Users = require("../models/user").Users;
const Cards = require("../models/card").Cards;
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
});
class User {
  async searchUser(firstName, lastName, personalId) {
    let dataToValidate = {
      fName: firstName,
      lName: lastName,
      pId: personalId,
    };
    const { error, value } = userSchema.validate(dataToValidate);
    if (error) {
      return error;
    } else {
      return Users.findAndCountAll({
        where: {
          firstName: firstName,
          lastName: lastName,
          personalId: personalId,
        },
      })
        .then((user) => {
          return user.count;
        })
        .catch((err) => {
          return err;
        });
    }
  }

  async addUser(firstName, lastName, personalId, cardId) {
    let dataToValidate = {
      fName: firstName,
      lName: lastName,
      pId: personalId,
      cId: cardId,
    };
    const { error, value } = userSchema.validate(dataToValidate);
    if (error) {
      return false; //error
    } else {
      try {
        const user = await Users.create({
          firstName: firstName,
          lastName: lastName,
          personalId: personalId,
        });
        const userId = user.userId;
        await Cards.create({ cardId: cardId, userId: userId });
      } catch (err) {
        return false; //err
      }
    }
  }

  async deleteUser(firstName, lastName, personalId) {
    let dataToValidate = {
      fName: firstName,
      lName: lastName,
      pId: personalId,
    };
    const ifExists = await this.searchUser(firstName, lastName, personalId);
    const { error, value } = userSchema.validate(dataToValidate);
    if (error) {
      return false;
    } else if (ifExists === 0) {
      return false; //user does not exists.
    } else {
      try {
        const usersId = await Users.findOne({
          where: { personalId: personalId },
        });
        await Cards.destroy({
          where: {
            userId: usersId.userId,
          },
          truncate: { cascade: true },
        });
        await Users.update(
          { activeMode: "unhired" },
          {
            where: {
              userId: usersId.userId,
            },
          }
        );
        return true;
      } catch (err) {
        return err;
      }
    }
  }

  async updateUser(oldCardId, newCardId) {
    let dataToValidate = {
      cId: newCardId,
    };
    const { error, value } = userSchema.validate(dataToValidate);
    if (error) {
      return false; //console.log(error);
    } else {
      try {
        return await Cards.update(
          { cardId: newCardId },
          { where: { cardId: oldCardId } }
        );
      } catch (err) {
        return false; //err;
      }
    }
  }
}

const usr = new User();

module.exports = {
  User: User
};
