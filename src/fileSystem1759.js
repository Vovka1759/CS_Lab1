import fs from "fs";

export function fileToString(filePath) {
    return fs.readFileSync(filePath).toString();
}
export function getFileStats(filePath) {
    return fs.statSync(filePath);
}