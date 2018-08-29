module.exports = (sessionPath, sessionClient, options) => {

  return new Promise((resolve, reject) => {
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: options.query,
          languageCode: options.languageCode,
        },
      },
    };

    sessionClient
      .detectIntent(request)
      .then(responses => {
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log(`  No intent matched.`);
        }

        return resolve(result)
      })
      .catch(err => {
        console.error('ERROR:', err);
        return reject(err)
      });
  });

}