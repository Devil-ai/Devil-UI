import dostuff from './DoStuff'
// import assistant from './assistant';
const { exec } = window.require('child_process');

const projectId = 'devil-36d63';
const sessionId = 'AIzaSyBiJcs0FYCHTc5C95L29lfVuOWgE1GPqVg';
const languageCode = 'en-US';

function getResponce(query, store) {
  store.dispatch({
    origin: "CHAT",
    type: "USER",
    data: {
      isFinal: true,
      isUser: true,
      text: query,
    }
  });
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
      store.dispatch({
        origin: "CHAT",
        type: "USER",
        data: {}
      });
      const result = responses[0].queryResult;

      store.dispatch({
        origin: "CHAT",
        type: "SYSTEM",
        data: {
          isUser: false,
          isFinal: true,
          text: result.fulfillmentMessages[0].text.text[0],
        }
      });
      exec("espeak '"+result.fulfillmentMessages[0].text.text[0]+"'")
      dostuff(result.intent, result.parameters.fields, store);
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
