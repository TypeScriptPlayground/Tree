const pipes = {
    ROOT: '\x9b31m.  \x9b0m',
    STRAIGHT: '\x9b38;5;250m│   \x9b0m',
    BREAKOUT: '\x9b38;5;250m├─ \x9b0m',
    END: '\x9b38;5;250m└─ \x9b0m',
    EMPTY: '    '
} as const

function fileString(name : string) : string {
    return `\x9b32m"${name}"\x9b0m`
}

function directoryString(name : string) : string {
    return `\x9b1;34m[${name}]\x9b0;22m`
}

function symlinkString(name : string) : string {
    return `\x9b35m<${name}>\x9b0m`
}

const rootPath : string[] = ['../Fresh/']
let files = 0;

console.log(pipes.ROOT);

function generateString(
    name : string,
    parents : boolean[],
    isFile : boolean,
    isDirectory : boolean,
    isSymlink : boolean,
    isLast : boolean,
) : string {
    let indentString = ''
    parents.forEach((parent) => {
        if (parent) {
            indentString += pipes.STRAIGHT;
        } else {
            indentString += pipes.EMPTY;
        }
    })

    if (isLast) {
        indentString += pipes.END;
    } else {
        indentString += pipes.BREAKOUT;
    }

    if (isFile) {
        indentString += fileString(name);
    }

    if (isDirectory) {
        indentString += directoryString(name);
    }

    if (isSymlink) {
        indentString += symlinkString(name);
    }

    return indentString;
}

function readDir(entryPath : string[], depths : boolean[] = []) {
    const dirEntries : Deno.DirEntry[] = [];
    
    for (const dirEntry of Deno.readDirSync(entryPath.join(''))) {
        dirEntries.push(dirEntry);
    }
    dirEntries.forEach((dir, dirIndex, dirs) => {
        const isLast = (dirIndex == dirs.length - 1);

        console.log(generateString(dir.name, depths, dir.isFile, dir.isDirectory, dir.isSymlink, isLast));

        if (dir.isFile) {
            files++;
        }

        if (dir.isDirectory) {
            depths.push(!isLast);
            entryPath.push(`${dir.name}/`);
            readDir(entryPath, depths);
        }
    })

    depths.pop();
    entryPath.pop();
}

readDir(rootPath, []);

console.log(`Files: ${files}`);
