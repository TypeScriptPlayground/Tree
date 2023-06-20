const pipes = [
    '.  ',
    '│  ',
    '├─ ',
    '└─ ',
    '   '
]

let depth = 0;
let paths : string[] = ['./']

console.log(pipes[0]);

function readDir(entryPath : string[], depth : number, lastFolder = false) {
    const dirEntries : Deno.DirEntry[] = [];
    for (const dirEntry of Deno.readDirSync(entryPath.join(''))) {
        dirEntries.push(dirEntry);
    }
    dirEntries.forEach((dir, dirIndex, dirs) => {
        
        if (dir.isFile) {
            if (dirIndex < dirs.length - 1) {
                if (lastFolder) {
                    console.log(`${pipes[1]}${pipes[4].repeat(depth - 1)}${pipes[2]}${dir.name}`);
                } else {
                    console.log(`${pipes[1].repeat(depth)}${pipes[2]}${dir.name}`);
                }
            } else {
                if (lastFolder) {
                    console.log(`${pipes[1]}${pipes[4].repeat(depth - 1)}${pipes[3]}${dir.name}`);
                } else {
                    console.log(`${pipes[1].repeat(depth)}${pipes[3]}${dir.name}`);
                }
            }
        } else

        if (dir.isDirectory) {
            entryPath.push(dir.name + '/');

            if (dirIndex < dirs.length - 1) {
                if (lastFolder) {
                    console.log(`${pipes[1]}${pipes[4].repeat(depth - 1)}${pipes[2]}[${dir.name}]`);
                } else {
                    console.log(`${pipes[4].repeat(depth)}${pipes[2]}[${dir.name}]`);
                }
                lastFolder = false;
            } else {
                if (lastFolder) {
                    console.log(`${pipes[1]}${pipes[4].repeat(depth - 1)}${pipes[3]}[${dir.name}]`);
                } else {
                    console.log(`${pipes[1].repeat(depth)}${pipes[3]}[${dir.name}]`);
                }
                lastFolder = true;
            }
            
            readDir(entryPath, depth + 1, lastFolder);

            entryPath.pop();
        }
    })
}

readDir(paths, depth);
