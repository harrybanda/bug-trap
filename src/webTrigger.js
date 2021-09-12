import { storage } from "@forge/api";

const buildOutput = () => ({
  body: "",
  headers: {
    "Content-Type": ["application/json"],
  },
  statusCode: 200,
  statusText: "OK",
});

const getUsers = (arr) => {
  var tempResult = {};

  for (let { userId } of arr)
    tempResult[userId] = {
      userId,
      count: tempResult[userId] ? tempResult[userId].count + 1 : 1,
    };

  let result = Object.values(tempResult);

  return result.length;
};

export const run = async (req) => {
  //await storage.delete("error_group_04ee14e0-bedc-5235-b570-3762f12accd7");

  let errorsId = JSON.parse(req.body).errorData.errorsId;
  let errorData = JSON.parse(req.body).errorData;

  const errors = await storage.get(errorsId);

  if (errors === undefined) {
    const error = {
      message: errorData.fullErrorMessage,
      occurrences: 1,
      users: 1,
      date: errorData.date,
      errors: [errorData],
    };

    await storage.set(errorsId, error);
  } else {
    const currentErrors = [errorData, ...(errors.errors ? errors.errors : [])];
    const occurrences = currentErrors.length;
    const users = getUsers(currentErrors);

    const error = {
      message: errorData.fullErrorMessage,
      occurrences: occurrences,
      users: users,
      date: errorData.date,
      errors: currentErrors,
    };

    await storage.set(errorsId, error);
  }

  return buildOutput();
};
