export function generatePathString(
    indents : boolean[],
    pathStyle : {
        straight : string,
        empty : string
    }
) {
    let indentString = ''

    indents.forEach((isPipe) => {
        if (isPipe) {
            indentString += pathStyle.straight;
        } else {
            indentString += pathStyle.empty;
        }
    })

    return indentString;
}
