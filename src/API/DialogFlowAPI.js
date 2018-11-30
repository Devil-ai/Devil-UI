const projectId = 'devil-36d63';
const sessionId = 'AIzaSyBiJcs0FYCHTc5C95L29lfVuOWgE1GPqVg';
const languageCode = 'en-US';

function  getResponce(query, store) {
  const dialogflow = window.require('dialogflow');
  const sessionClient = new dialogflow.SessionsClient();
  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(result.fulfillmentMessages[0].text.text[0]);
      store.dispatch({
        origin: "CHAT",
        type: "USER",
        data:  {
          isFinal: true,
          isUser: true,
          text: query,
        }
      });
      store.dispatch({
        origin: "CHAT",
        type: "USER",
        data: {}
      });
      store.dispatch({
        origin: "CHAT",
        type: "SYSTEM",
        data: {
          isUser: false,
          isFinal: true,
          text: result.fulfillmentMessages[0].text.text[0],
        }
      });
      store.dispatch({
        origin: "CHAT",
        type: "SYSTEM",
        data: {}
      });
    
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}
export default getResponce;
