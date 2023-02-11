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

    let padding = "💊".repeat((24 - arrBinary.length * 8 % 24) / 8 % 3);


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

    let base64chars = ["🤮","👍","😐","👎","🤡","💖","😱","🤔","🔥","😘","👏","😁","🤯","🤬","😢","🎉","🤩","💩","🙏","👌","👺","😎","😪","😍","🐳","😛","🔥","🌚","🌭","💯","🤣","⚡️","🍌","🏆","💔","🤨","🍓","🍾","💋","🖕","😈","😴","😭","🤓","👻","😡","👀","🎃","🙈","😇","😨","🤝","😵","🤗","🦄","🎅","🎄","⛄","💅","🤪","🗿","🆒","💘","🙉","😘"];;

    let codedText = "";

    arrBinaryTriples.forEach(element => {
        element.match(/.{1,6}/g).forEach(byte => {
            codedText += base64chars[parseInt(byte,2)];
        });
    });
    codedText += padding;
    return codedText;
}

