const User = require("../src/user").User;
const Cards = require("../models/card").Cards;
const Users = require("../models/user").Users;

//====================== add user ======================
test("should add user if not exists and data is valid", async () => {
  const user = new User();
  const usr = await user.addUser("mina", "golzari", "164", "165", "F", "hired");
  const sameUser = await user.addUser("mina", "golzari", "164", "165", "F","hired");
  const count1 = await user.searchUser("mina", "golzari", "164");
  const count2 = await user.searchUser("amin", "moradi", "098765111");
  expect(count1 > 0).toBe(true);
  expect(count2 > 0).toBe(false);
  expect(sameUser).toBe(false);
});

test("should not add user in the case of invalid input", async () => {
  const user = new User();
  const validation = await user.addUser("sara", "98765", "9786250", "9876543");
  expect(validation).toBe(false);
});

test("should not add user in the case of invalid input", async () => {
  const user = new User();
  const validation = await user.deleteUser("654", "talebnejad", "98765");
  await expect(validation).toBe(false);
});

//====================== delete user======================
test("should delete user", async () => {
  const userObj = new User();
  const exist = await userObj.deleteUser("mina", "golzari", "164");
  await expect(exist).toBe(true);
});

test("should delete user from card table", async () => {
  const user = new User();
  const usersId = await Users.findOne({ where: { personalId: "164" } });
  const cardCount = await Cards.findAndCountAll({
    where: { userId: usersId.userId },
  });
  await expect(cardCount.count).toEqual(0);
});

test("should check user activeMode to be changed to unhired after delete", async () => {
  const user = new User();
  await user.addUser("mina", "golzari", "165");
  await user.deleteUser("mina", "golzari", "165");
  const owner = await Users.findOne({ attributes:["activeMode"] , where: { personalId: "165" } });
  const activeMode = owner.activeMode;
  await expect(activeMode).toEqual("unhired");
});

//====================== update user ======================
test("should update user cardId in card table", async () => {
  const user = new User();
  await user.addUser("sara", "doe", "18", "18", "M", "hired");
  const owner = await Cards.findOne({ where: { cardId: "18" } });
  await user.updateUser("18", "19");
  const cardOwner = await Cards.findOne({ where: { userId: owner.userId } });

  await expect(cardOwner.cardId).toEqual("19");
});
