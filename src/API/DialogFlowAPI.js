
const structjson = require('./structjson.js');
const pump = window.require('pump');
const through2 = window.require('through2');
const record = window.require('node-record-lpcm16');
const projectId = 'devil-36d63';
const sessionId = 'AIzaSyBiJcs0FYCHTc5C95L29lfVuOWgE1GPqVg';
const languageCode = 'en-US';
const sampleRateHertz = 16000;
const encoding = 'AUDIO_ENCODING_LINEAR16';


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
function streamingMicDetectIntent() {
  const dialogflow = window.require('dialogflow');
  const sessionClient = new dialogflow.SessionsClient();
  let sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const initialStreamRequest = {
    session: sessionPath,
    queryParams: {
      session: sessionClient.sessionPath(projectId, sessionId),
    },
    queryInput: {
      audioConfig: {
        audioEncoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
      },
      singleUtterance: true,
      // output_audio_config: ,
    },
  };

  // Create a stream for the streaming request.
  const detectStream = sessionClient
    .streamingDetectIntent()
    .on('error', console.error)
    .on('data', data => {
      if (typeof (data.recognitionResult) !== "undefined") {
        console.log(data);
      } else {
        console.log(`Detected intent:`);
        logQueryResult(sessionClient, data.queryResult);
        console.log(data.queryResult);
      }
    }).on('end', function (data) {
      console.log("End");
      console.log(data);
    });

  // Write the initial stream request to config for audio input.
  detectStream.write(initialStreamRequest);


  // Stream an audio file from disk to the Conversation API, e.g.
  // "./resources/audio.raw"
  pump(
    record
    .start({
      sampleRateHertz: '44100',
      threshold: 0.5,
      verbose: false,
      recordProgram: 'rec',
      silence: '1.0',
    })
    .on('error', console.error),
    // Format the audio stream into the request format.
    through2.obj((obj, _, next) => {
      next(null, {
        inputAudio: obj
      });
    }),
    detectStream
  );
  // [END dialogflow_detect_intent_streaming]
}

function logQueryResult(sessionClient, result) {
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates a context client
  const contextClient = new dialogflow.ContextsClient();

  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  const parameters = JSON.stringify(
    structjson.structProtoToJson(result.parameters)
  );
  console.log(`  Parameters: ${parameters}`);
  if (result.outputContexts && result.outputContexts.length) {
    console.log(`  Output contexts:`);
    result.outputContexts.forEach(context => {
      const contextId = contextClient.matchContextFromContextName(context.name);
      const contextParameters = JSON.stringify(
        structjson.structProtoToJson(context.parameters)
      );
      console.log(`    ${contextId}`);
      console.log(`      lifespan: ${context.lifespanCount}`);
      console.log(`      parameters: ${contextParameters}`);
    });
  }
}
export default {
  streamingMicDetectIntent,
  getResponce
};