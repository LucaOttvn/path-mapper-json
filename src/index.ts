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

    const insertPath = (tree: TreeItem[], path: string): void => {
        const sections = path.split("/").filter(s => s)
        if (sections.length === 0) return;

        const [head, ...rest] = sections;
        if (!head) return;

        let node = tree.find((item) => item.name === head);

        if (!node) {
            let isFile = false
            if (head.includes(".")) {
                console.log(head[0] + ' includes dot')
                isFile = head[0] !== '.'
            }
            node = {
                name: head,
                path: path,
                type: isFile ? TypesEnum.blob : TypesEnum.tree,
                children: []
            };
            tree.push(node);
        }
        insertPath(node.children, rest.join('/'));
    };

    for (const path of paths) {
        insertPath(tree, path);
    }

    console.log('///////')
    return tree;
};
