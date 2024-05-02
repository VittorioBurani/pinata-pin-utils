require('dotenv').config()
const pinataSDK = require('@pinata/sdk');


const pinataJWTKey = process.env.PINATA_JWT_KEY;
const pinata = new pinataSDK({ pinataJWTKey: pinataJWTKey});


const parseArgs = (args) => {
    const parsedArgs = {};

    args.forEach((arg) => {
        if (arg === "--help") {
            parsedArgs["help"] = true;
            return;
        } else {
            const parts = arg.split("=");
            parsedArgs[parts[0].replace("--", "")] = parts[1];
        }
    });

    return parsedArgs;
};
const args = parseArgs(process.argv.slice(2));
const fileToPin = args.file;
const directoryToPin = args.dir;
const help = args.help;


async function pinSomethingToPinata(filePath) {
    var res = await pinata.pinFromFS(filePath);
    return res;
}

if (help || help !== undefined) {
    console.log("pinata.js [--file=<path>] [--dir=<path>] [--help]");
} else {
    if (fileToPin || fileToPin !== undefined) {
        pinSomethingToPinata(fileToPin)
        .then(res => console.log(res.IpfsHash))
        .catch(res => console.log(res.error));
    }

    if (directoryToPin || directoryToPin !== undefined) {
        pinSomethingToPinata(directoryToPin)
        .then(res => console.log(res.IpfsHash))
        .catch(res => console.log(res.error));
    }
}
