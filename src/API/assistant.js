const path = window.require('path');
const GoogleAssistant = window.require('google-assistant');

const config = {
    auth: {
        keyFilePath: path.resolve('./devil-36d63-5166a7175387.json'),
        savedTokensPath: path.resolve('./tokens.json'),
    },
    conversation: {
        lang: 'en-US', // language code for input/output (defaults to en-US)
        textQuery: 'What time is it?', // if this is set, audio input is ignored
        isNew: true, // set this to true if you want to force a new conversation and ignore the old state
        screen: {
            isOn: true, // set this to true if you want to output results to a screen
        },
    },
};

const assistant1 = new GoogleAssistant(config.auth);

function assistant(query, store) {
    const startConversation = (conversation) => {
        conversation
            .on('response', text =>{ 
                console.log('Assistant Response:', text);
                store.dispatch({
                    origin: "CHAT",
                    type: "SYSTEM",
                    data: {
                      isUser: false,
                      isFinal: true,
                      text: text,
                    }
                  });
                  store.dispatch({
                    origin: "CHAT",
                    type: "SYSTEM",
                    data: {}
                  });
                
            })
            .on('ended', (error, continueConversation) => {
                if (error) {
                    console.log('Conversation Ended Error:', error);
                } else {
                    conversation.end();
                }
            })
            .on('error', (error) => {
                console.log('Conversation Error:', error);
            });
    };
    // starts a new conversation with the assistant
    config.conversation.textQuery = query;
    assistant1.start(config.conversation, startConversation);

}
export default assistant;