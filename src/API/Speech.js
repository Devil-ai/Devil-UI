import getResponce from './DialogFlowAPI';
async function Speech(store) {
    // Imports the Google Cloud client library
    const speech = window.require('@google-cloud/speech');
    const fs = window.require('fs');
    // Creates a client
    const client = new speech.SpeechClient();

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    const filename = './audio.raw';
    const encoding = 'Encoding of the audio file, e.g. LINEAR16';
    const sampleRateHertz = 16000;
    const languageCode = 'BCP-47 language code, e.g. en-US';

    const request = {
        config: {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
        },
        interimResults: false, // If you want interim results, set this to true
    };

    // Stream the audio to the Google Cloud Speech API
    const recognizeStream = client
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', data => {
            getResponce(data.results[0].alternatives[0].transcript, store);
            console.log(
                `Transcription: ${data.results[0].alternatives[0].transcript}`
            );
        });

    // Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
    fs.createReadStream(filename).pipe(recognizeStream);
}
export default Speech;