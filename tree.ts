import { TreeOptions } from "./interface/tree_options.d.ts";
import { readDir } from "./read_dir.ts";

export function tree(rootPath = '.', treeOptions? : TreeOptions) {
    const dir = readDir([rootPath], [])
    return {
        treeString: dir.treeString,
        files: dir.dirProperties.files,
        symlinks: dir.dirProperties.symlinks,
        directories: dir.dirProperties.directories,
    }       
}
