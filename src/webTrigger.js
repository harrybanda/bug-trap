import { storage, startsWith } from "@forge/api";

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

const saveError = async (req) => {
  let errorGroupId = JSON.parse(req.body).errorData.errorGroupId;
  let errorData = JSON.parse(req.body).errorData;

  const errors = await storage.get(errorGroupId);

  if (errors === undefined) {
    const error = {
      message: errorData.fullErrorMessage,
      occurrences: 1,
      users: 1,
      date: errorData.date,
      errors: [errorData],
    };

    await storage.set(errorGroupId, error);
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

    await storage.set(errorGroupId, error);
  }
};

const saveFeedback = async (req) => {
  let feedback = JSON.parse(req.body).feedback;
  let feedbackId = feedback.errorId;
  await storage.set(feedbackId, feedback);
};

export const run = async (req) => {
  //await deleteAll();
  if ("errorData" in JSON.parse(req.body)) {
    await saveError(req);
  } else if ("feedback" in JSON.parse(req.body)) {
    await saveFeedback(req);
  }
  return buildOutput();
};

const deleteAll = async () => {
  const _feedbacks = await storage
    .query()
    .where("key", startsWith("error_id_"))
    .getMany();

  _feedbacks.results.forEach(async (f) => {
    await storage.delete(f.key);
  });

  const _errors = await storage
    .query()
    .where("key", startsWith("error_group_"))
    .getMany();

  _errors.results.forEach(async (e) => {
    await storage.delete(e.key);
  });
};
