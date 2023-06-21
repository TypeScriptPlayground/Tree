# Tree
Generate a tree of all folders/files/symlinks.

```ts
import { tree } from "./tree.ts";

console.log(tree('./', true).treeString);
```
```
├─ [.vscode]
│   └─ "settings.json" 
├─ "generate_string.ts"
├─ "main.ts"
├─ "read_dir.ts"       
└─ "tree.ts"
```

![image](https://github.com/TypeScriptPlayground/Tree/assets/62719703/56dd4ce6-d6f2-46dd-91d5-8d771d6a98a5)

## TODO
Add formatting options like color and style for folders/files/symlinks
