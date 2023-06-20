const pipes = [
    '.  ',
    '│  ',
    '├─ ',
    '└─ ',
    '   '
]

let depth = 0;
let paths : string[] = ['./folder/']

console.log(pipes[0]);

function readDir(entryPath : string[], depth : number, inLastFolder = false, lastInFolder = false) {
    const dirEntries : Deno.DirEntry[] = [];
    for (const dirEntry of Deno.readDirSync(entryPath.join(''))) {
        dirEntries.push(dirEntry);
    }
    dirEntries.forEach((dir, dirIndex, dirs) => {
        
        if (dir.isFile) {
            if (dirIndex < dirs.length - 1) {
                lastInFolder = false;
                if (inLastFolder) {
                    console.log(`${pipes[1]}${pipes[4].repeat(depth - 1)}${pipes[2]}${dir.name}`, inLastFolder, lastInFolder);
                } else {
                    console.log(`${pipes[1].repeat(depth)}${pipes[2]}${dir.name}`, inLastFolder, lastInFolder);
                }
            } else {
                lastInFolder = true;
                if (inLastFolder) {
                    console.log(`${pipes[1]}${pipes[4].repeat(depth - 1)}${pipes[3]}${dir.name}`, inLastFolder, lastInFolder);
                } else {
                    console.log(`${pipes[1].repeat(depth)}${pipes[3]}${dir.name}`, inLastFolder, lastInFolder);
                }
            }
        } else

        if (dir.isDirectory) {
            entryPath.push(dir.name + '/');

            if (dirIndex < dirs.length - 1) {
                lastInFolder = false;
                if (inLastFolder) {
                    console.log(`${pipes[1]}${pipes[4].repeat(depth - 1)}${pipes[2]}[${dir.name}]`, inLastFolder, lastInFolder);
                } else {
                    console.log(`${pipes[4].repeat(depth)}${pipes[2]}[${dir.name}]`, inLastFolder, lastInFolder);
                }
                inLastFolder = false;
            } else {
                lastInFolder = true;
                if (inLastFolder) {
                    console.log(`${pipes[1]}${pipes[4].repeat(depth - 1)}${pipes[3]}[${dir.name}]`, inLastFolder, lastInFolder);
                } else {
                    console.log(`${pipes[1].repeat(depth)}${pipes[3]}[${dir.name}]`, inLastFolder, lastInFolder);
                }
                inLastFolder = true;
            }
            
            readDir(entryPath, depth + 1, inLastFolder);

            entryPath.pop();
        }
    })
}

readDir(paths, depth);

function generateFileString(
    name : string,
    depth : number,
    isLastFile : boolean,
    isParentLastFolder : boolean
) {
    
}
