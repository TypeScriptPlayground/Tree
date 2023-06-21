const pipes = [
    '.  ',
    '│  ',
    '├─ ',
    '└─ ',
    '   '
]

let depth : boolean[] = [];
let paths : string[] = ['../ESD-Scanner/']

console.log(pipes[0]);

function generateString(
    name : string,
    depths : boolean[],
    isFile : boolean,
    isDirectory : boolean,
    isSymlink : boolean,
    isLast : boolean,
) : string {
    let indentString = ''
    depths.forEach((depth) => {
        if (depth) {
            indentString += '│  ';
        } else {
            indentString += '   ';
        }
    })

    if (isLast) {
        indentString += '└─ ';
    } else {
        indentString += '├─ ';
    }

    if (isFile) {
        indentString += `"${name}"`;
    }

    if (isDirectory) {
        indentString += `[${name}]`;
    }

    if (isSymlink) {
        indentString += `<${name}>`;
    }

    return indentString
}

function readDir(entryPath : string[], depths : boolean[] = []) {
    const dirEntries : Deno.DirEntry[] = [];
    // console.log('Reading dir:', entryPath.join(''));
    
    for (const dirEntry of Deno.readDirSync(entryPath.join(''))) {
        dirEntries.push(dirEntry);
    }
    dirEntries.forEach((dir, dirIndex, dirs) => {
        const isLast = (dirIndex == dirs.length - 1);

        console.log(generateString(dir.name, depths, dir.isFile, dir.isDirectory, dir.isSymlink, isLast));

        if (dir.isDirectory) {
            depths.push(!isLast);
            entryPath.push(`${dir.name}/`);
            readDir(entryPath, depths);
        }

        
        
    })

    depths.pop();
    entryPath.pop();
}

readDir(paths, depth);
