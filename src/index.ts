enum TypesEnum {
    tree = 'tree',
    blob = 'blob'
}

interface TreeItem {
    name: string;
    path: string
    type: TypesEnum;
    children: TreeItem[];
}

export const buildTree = (paths: string[]): TreeItem[] => {
    const tree: TreeItem[] = [];

    const insertPath = (currentLevel: TreeItem[], pathSections: string[], parentPath: string): void => {
        if (pathSections.length === 0) return;

        const [head, ...rest] = pathSections;

        // Construct the full path for this node
        // If parentPath is empty, it's just "head", otherwise "parent/head"
        const currentFullPath = parentPath ? `${parentPath}/${head}` : head;

        let node = currentLevel.find((item) => item.name === head);

        if (!node && head) {
            const isFile = head.includes(".");

            node = {
                name: head,
                path: currentFullPath || '',
                type: isFile ? TypesEnum.blob : TypesEnum.tree,
                children: [],
            };
            currentLevel.push(node);
        }

        insertPath(node!.children, rest, currentFullPath!);
    };

    for (const path of paths) {
        const sections = path.split("/").filter((s) => s);
        insertPath(tree, sections, "");
    }

    return tree;
};

export const findByPath = (tree: TreeItem[], targetPath: string): TreeItem | null => {
    for (const node of tree) {
        if (node.path === targetPath) return node;

        if (node.type === TypesEnum.tree && node.children.length > 0) {
            const found = findByPath(node.children, targetPath);
            if (found) return found;
        }
    }
    return null;
};