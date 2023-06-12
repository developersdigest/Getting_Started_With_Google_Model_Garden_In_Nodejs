const { sendRequest, writeResponseLocally } = require("../utils/google-foundation-models");
const params = {
  apiEndpoint: "YOUR_API_ENDPOINT",
  projectId: "YOUR_PROJECT_ID",
  modelId: "textembedding-gecko@001",
  instances: [{ content: "Hello World" }],
};
sendRequest(params)
  .then((response) => {
    console.log(response);
    writeResponseLocally(params, response);
  })
  .catch((error) => {
    console.error(error);
  });
