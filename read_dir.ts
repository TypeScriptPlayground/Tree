import { generateString } from "./generate_string.ts";

let treeString = ''
let files = 0

export function readDir(entryPath : string[], color = true, depths : boolean[] = []) {
    const dirEntries : Deno.DirEntry[] = [];
    
    for (const dirEntry of Deno.readDirSync(entryPath.join(''))) {
        dirEntries.push(dirEntry);
    }
    dirEntries.forEach((dir, dirIndex, dirs) => {
        const isLast = (dirIndex == dirs.length - 1);

        treeString = treeString + generateString(dir.name, depths, dir.isFile, dir.isDirectory, dir.isSymlink, isLast, color) + '\n';

        if (dir.isFile) {
            files++;
        }

        if (dir.isDirectory) {
            depths.push(!isLast);
            entryPath.push(`${dir.name}/`);
            readDir(entryPath, color, depths);
        }
    })

    depths.pop();
    entryPath.pop();

    return {treeString, files};
}
