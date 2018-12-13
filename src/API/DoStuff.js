const { exec } = window.require('child_process');
function dostuff(intent, params, store) {
    let SystemFunction;
    try{
        SystemFunction = params.SystemFunction.stringValue || " ";
    }catch(e){
        console.log("no function")
    }
        const intentName = intent.displayName;
        const SystemOperation = params.SystemOperation.stringValue || " ";
    console.log(intentName, SystemFunction, SystemOperation, params)
    // if(intent.isFallback === 'Default Fallback Intent')
    switch (intentName) {
        case "System":
            switch (SystemFunction) {
                case "bluetooth":
                    if (SystemOperation == "on") {
                        exec('bluetooth on');
                    } else {
                        exec('bluetooth off');
                    }
                break;
                case "wifi":
                    if (SystemOperation == "on") {
                        exec('systemctl start NetworkManager');
                    } else {
                        exec('systemctl stop NetworkManager');
                    }
                break;
                case "brightness":
                    if (SystemOperation == "up") {
                        exec('xdotool key "alt+r" XF86MonBrightnessUp');
                    } else {
                        exec('xdotool key "alt+r" XF86MonBrightnessDown');
                    }
                break;
                case "volume":
                if (SystemOperation == "up") {
                    exec('xdotool key XF86AudioLowerVolume');
                } else {
                    exec('xdotool key XF86AudioRaiseVolume');
                }
                break;
            }
            break;
        case "OpenApp":
            exec('bash google-chrome-stable --no-sandbox '+ params.any.stringValue + '&');
        break;
        default:
            console.log("action not found");
    }
}
export default dostuff;