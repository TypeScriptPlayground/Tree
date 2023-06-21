import { readDir } from "./read_dir.ts";

export function tree(rootDirectory : string, color = true) {
    return readDir([rootDirectory], color)
}
