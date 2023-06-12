const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
async function sendRequest(options) {
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });
  const client = await auth.getClient();
  const accessToken = (await client.getAccessToken()).token;
  const data = { instances: options.instances, parameters: options.parameters };
  
  const response = await fetch(
    `https://${options.apiEndpoint}/v1/projects/${options.projectId}/locations/us-central1/publishers/google/models/${options.modelId}:predict`, 
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
  );
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}
async function writeResponseLocally(params, response) {
  const outputDir = path.join(__dirname, "../examples_output");
  fs.writeFile(
    path.join(outputDir, `${params.modelId}.json`),
    JSON.stringify(response),
    function (err) {
      if (err) return console.log(err);
      console.log(`Writing to ${params.modelId}.json`);
    }
  );
}
async function saveCodeToFile(params, response) {
  const fileContent = response.predictions[0].content;
  const fileTypePattern = /^```(\w+)\n/;
  const fileTypeMatch = fileContent.match(fileTypePattern);
  const fileType = fileTypeMatch ? fileTypeMatch[1] : "txt"; // default to .txt if no match found
  const outputDir = path.join(__dirname, "../examples_output");

  const cleanedCode = fileContent
    .replace(fileTypePattern, "")
    .replace(/```$/, "");
  fs.writeFile(
    path.join(outputDir, `${params.modelId}.${fileType}`),
    cleanedCode,
    function (err) {
      if (err) return console.log(err);
      console.log(`Writing to ${params.modelId}.${fileType}`);
    }
  );
}
module.exports = { sendRequest, writeResponseLocally, saveCodeToFile };
