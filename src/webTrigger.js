const buildOutput = () => ({
  body: "",
  headers: {
    "Content-Type": ["application/json"],
  },
  statusCode: 200,
  statusText: "OK",
});

export const run = async (req) => {
  console.log(JSON.parse(req.body));
  return buildOutput();
};
