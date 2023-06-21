const pipesWithColor = {
    ROOT: '\x9b31m.  \x9b0m',
    STRAIGHT: '\x9b38;5;250m│   \x9b0m',
    BREAKOUT: '\x9b38;5;250m├─ \x9b0m',
    END: '\x9b38;5;250m└─ \x9b0m',
    EMPTY: '    '
} as const

const pipesWithoutColor = {
    ROOT: '.  ',
    STRAIGHT: '│   ',
    BREAKOUT: '├─ ',
    END: '└─ ',
    EMPTY: '    '
} as const

function fileString(name : string, color : boolean) : string {
    return color ? `\x9b32m"${name}"\x9b0m` : `"${name}"`;
}

function directoryString(name : string, color : boolean) : string {
    return color ? `\x9b1;34m[${name}]\x9b0;22m` : `[${name}]`;
}

function symlinkString(name : string, color : boolean) : string {
    return color ? `\x9b35m<${name}>\x9b0m` : `<${name}>`;
}

export function generateString(
    name : string,
    parents : boolean[],
    isFile : boolean,
    isDirectory : boolean,
    isSymlink : boolean,
    isLast : boolean,
    color : boolean
) : string {
    let indentString = ''
    parents.forEach((parent) => {
        if (parent) {
            indentString += color ? pipesWithColor.STRAIGHT : pipesWithoutColor.STRAIGHT;
        } else {
            indentString += color ? pipesWithColor.EMPTY : pipesWithoutColor.EMPTY;
        }
    })

    if (isLast) {
        indentString += color ? pipesWithColor.END : pipesWithoutColor.END;
    } else {
        indentString += color ? pipesWithColor.BREAKOUT : pipesWithoutColor.BREAKOUT;
    }

    if (isFile) {
        indentString += fileString(name, color);
    }

    if (isDirectory) {
        indentString += directoryString(name, color);
    }

    if (isSymlink) {
        indentString += symlinkString(name, color);
    }

    return indentString;
}
