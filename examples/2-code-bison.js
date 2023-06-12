const { sendRequest, writeResponseLocally, saveCodeToFile } = require("../utils/google-foundation-models");
const params = {
  apiEndpoint: "YOUR_API_ENDPOINT",
  projectId: "YOUR_PROJECT_ID",
  modelId: "code-bison@001",
  instances: [
    {
      prefix:
        "Write me an encapsulated leaflet focused on san fran in a single jsx file",
    },
  ],
  parameters: { temperature: 0.2, maxOutputTokens: 2000, topP: 0.8, topK: 40 },
};
sendRequest(params)
  .then((response) => {
    console.log(response);
    writeResponseLocally(params, response);
    saveCodeToFile(params, response)
  })
  .catch((error) => {
    console.error(error);
  });
