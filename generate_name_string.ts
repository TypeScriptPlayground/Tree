export function generateNameString(
    name : string,
    isLast : boolean,
    properies : {
        isFile : boolean,
        isDirectory : boolean,
        isSymlink : boolean
    },
    pathStyle : {
        end : string,
        breakout : string
    }
) : string {
    let nameString = '';

    if (isLast) {
        nameString += pathStyle.end;
    } else {
        nameString += pathStyle.breakout;
    }

    if (properies.isFile) {
        nameString += `"${name}"`;
    } else

    if (properies.isDirectory) {
        nameString += `[${name}]`;
    } else

    if (properies.isSymlink) {
        nameString += `<${name}>`
    } else {
        nameString += `?${name}?`;
    }

    return nameString
}
