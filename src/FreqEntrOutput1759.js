import { fileToString, getFileStats } from "./fileSystem1759.js";

export function frequency(text) {
    let freqAll = [];
    for (let i = 0; i < text.length; i++) {
        if (!freqAll.find(o => o.symbol === text[i])) {
            freqAll.push({ symbol: text[i], amount: 1 });
        }
        else{
            freqAll.find(o => o.symbol === text[i]).amount++;
        }
    }
    freqAll.sort(compareFreqAll)
    for (let i = 0; i < freqAll.length; i++) {
        freqAll[i].frequency = freqAll[i].amount / text.length;
    }
    return freqAll;
}

function compareFreqAll( a, b ) {
    if ( a.amount < b.amount ){
      return -1;
    }
    if ( a.amount > b.amount ){
      return 1;
    }
    return 0;
  }


export function avgEntropy(freqAll) {
    let sum = 0;
    for (let i = 0; i < freqAll.length; i++) {
        sum += freqAll[i].frequency * Math.log2(freqAll[i].frequency);
    }
    return -sum;
}

export function outputAll(filePath) {
    let text = fileToString(filePath);
    let freqAll = frequency(text);

    freqAll.forEach(obj => {
        console.log(`The symbol "${
            obj.symbol === "\n" ? "\\n" 
            : obj.symbol === "\r" ? "\\r" 
            : obj.symbol
            }"\toccurs in the text ${obj.amount} time${obj.amount>1?"s":""} with a frequency of ${obj.frequency}`);
    });

    let entropy = avgEntropy(freqAll)

    console.log("\nAverage entropy of the alphabet =", entropy);

    console.log(`\nAmount of information = ${Math.ceil(entropy * text.length / 8)} bytes`);
}

export function outputZips(filePath){
    console.log(`${filePath} size = ${getFileStats(filePath).size} bytes`); 

    let zips = [".zip",".rar",".gz",".bz2",".xz"];   
    zips.forEach(name => {
        let newFilePath = filePath.replace(".txt",name);
        console.log(`${newFilePath} size = ${getFileStats(newFilePath).size} bytes`);
    });
}
