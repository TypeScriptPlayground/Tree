# Tree
Generate a tree of all folders/files/symlinks.

```ts
import { tree } from "./tree.ts";

const dirTree = tree('./');

console.log(dirTree.treeString);
console.log('F', dirTree.files);
console.log('S', dirTree.symlinks);
console.log('D', dirTree.directories);
```
```
├─ [.vscode]
│   └─ "settings.json"
├─ [lib]
│   └─ [Tree]
│       ├─ "generate_name_string.ts"
│       ├─ "generate_path_string.ts"
│       ├─ [interface]
│       │   └─ "tree_options.d.ts"  
│       ├─ "read_dir.ts"
│       └─ "tree.ts"
├─ "main.ts"
└─ "tsconfig.json"

F 8
S 0
D 4
```

## TODO
Add formatting options like color and style for folders/files/symlinks
