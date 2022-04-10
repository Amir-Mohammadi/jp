const user = require("../src/user").User;
const Log = require("../src/log").Log;
const Logs = require("../models/log").Logs;
const Cards = require("../models/card").Cards;
const Users = require("../models/user").Users;
const database = require("../utils/database");

expect.extend({
  toBeBoolean(received) {
    return typeof received === "boolean"
      ? {
          message: () => `expected ${received} to be boolean`,
          pass: true,
        }
      : {
          message: () => `expected ${received} to be boolean`,
          pass: false,
        };
  },
});

test("should record a log", async () => {
  const recordObject = new Log();
  const newRecord = await recordObject.login("145");
  console.log(typeof newRecord);
  expect(newRecord).toBeBoolean();
});





