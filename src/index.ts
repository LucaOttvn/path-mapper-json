export enum TypesEnum {
    tree = 'tree',
    blob = 'blob'
}

export interface TreeItem {
    name: string;
    type: TypesEnum;
    children: TreeItem[];
}

export const buildTree = (paths: string[]): TreeItem[] => {
    const tree: TreeItem[] = [];

    const insertPath = (tree: TreeItem[], sections: string[]): void => {
        if (sections.length === 0) return;

        const [head, ...rest] = sections;
        if (!head) return;

        let node = tree.find((item) => item.name === head);

        if (!node) {
            node = {
                name: head,
                type: head.includes(".") ? TypesEnum.blob : TypesEnum.tree,
                children: []
            };
            tree.push(node);
        }
        insertPath(node.children, rest);
    };

    for (const path of paths) {
        insertPath(tree, path.split("/").filter(s => s));
    }

    return tree;
};
