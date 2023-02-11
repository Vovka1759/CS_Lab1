import { fileToString, getFileStats } from "./fileSystem1759.js";
import { frequency, avgEntropy } from "./FreqEntrOutput1759.js";
function  byteToBinary (b) {
    let str = b.toString(2);
    while (str.length < 8) {
        str = '0' + str;
    }
    return str;
}

function stringToBinary (str) {
    return Array.from(Buffer.from(str, 'utf-8')).map(byteToBinary);
}

export function base64Encode1759(text) {
    let arrBinary = stringToBinary(text);
    let arrBinaryTriples = [];

    let padding = "=".repeat((24 - arrBinary.length * 8 % 24) / 8 % 3);


    for (let i = 0; i < arrBinary.length; i++) {
        if ((i-2)%3 === 0) {
            arrBinaryTriples.push(arrBinary[i-2] + arrBinary[i-1] + arrBinary[i]);
        } 
    }

    if (padding.length === 2) {
        arrBinaryTriples.push(arrBinary[arrBinary.length - 1] + "0000");
    }
    else if (padding.length === 1){
        arrBinaryTriples.push(arrBinary[arrBinary.length - 2] + arrBinary[arrBinary.length - 1] + "00");
    }

    let base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    let codedText = "";

    arrBinaryTriples.forEach(element => {
        element.match(/.{1,6}/g).forEach(byte => {
            codedText += base64chars[parseInt(byte,2)];
        });
    });
    codedText += padding;
    return codedText;
}

export function outputAmOfInfBase64(filePath){
    let text = fileToString(filePath);
    let freqAll = frequency(text);
    let entropy = avgEntropy(freqAll)

    let codedText = base64Encode1759(text);
    let freqAllCodedText = frequency(codedText);
    let entropyCodedText = avgEntropy(freqAllCodedText)

    console.log(`Amount of information ${filePath} = ${Math.ceil(entropy * text.length / 8)} bytes`);
    console.log(`${filePath} size = ${getFileStats(filePath).size} bytes`);

    console.log(`Amount of information ${filePath} coded Base64 = ${Math.ceil(entropyCodedText * codedText.length / 8)} bytes`);
}
