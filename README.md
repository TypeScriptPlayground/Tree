# Tree
Generate a tree of all folders/files/symlinks.

```ts
import { tree } from "./tree.ts";

console.log(tree('./', true).treeString);
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
```

## TODO
Add formatting options like color and style for folders/files/symlinks
