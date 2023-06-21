import { generateNameString } from "./generate_name_string.ts";
import { generatePathString } from "./generate_path_string.ts";

let treeString = ''
const dirProperties = {
    files: 0,
    symlinks: 0,
    directories: 0
}

export function readDir(pathEntries : string[], indents : boolean[] = []) {

    [...Deno.readDirSync(pathEntries.join(''))].forEach((dirEntry, dirIndex, dirs) => {
        const isLast = (dirIndex == dirs.length - 1);

        treeString = treeString + generatePathString(indents, {
            straight: '│   ',
            empty: '    '
        }) + generateNameString(
            dirEntry.name,
            isLast,
            {
                isFile: dirEntry.isFile,
                isDirectory: dirEntry.isDirectory,
                isSymlink: dirEntry.isSymlink
            },
            {
                end: '└─ ',
                breakout: '├─ '
            }
        ) + '\n';

        if (dirEntry.isFile) {
            dirProperties.files++
        }
        if (dirEntry.isSymlink) {
            dirProperties.symlinks++
        }
        if (dirEntry.isDirectory) {
            dirProperties.directories++
            indents.push(!isLast);
            pathEntries.push(`${dirEntry.name}/`);
            readDir(pathEntries, indents);
        }
    })

    indents.pop();
    pathEntries.pop();

    return {treeString, dirProperties};
}
