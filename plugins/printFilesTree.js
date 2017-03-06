function print(files){
    const splited = Object.keys(files).sort().map(name => name.split('/'));
    const createNode = (name, path) => ({
        name,
        path,
        nodes: [],
        lists: []
    });
    const root = createNode('', '');
    let current = root;
    splited.forEach(path => {
        const len = path.length;

        for(let i = 0; i < len; i++) {
            const isList = i + 1 === len;
            const nextPath = current.path + '/' + path[i];
            let nextNode = current.nodes.find(child => child.path === nextPath);

            if (!nextNode) {
                nextNode = createNode(path[i], nextPath);
                if (isList) {
                    current.lists.push(nextNode);
                } else {
                    current.nodes.push(nextNode);
                }
            }

            current = nextNode
        }

        current = root;
    });

    function print(node, prefix, parentIsLast){
        process.stdout.write(prefix.join('') + node.name + '\n');
        const children = node.nodes.concat(node.lists);

        if (children.length) {
            const len = children.length;
            for(let i = 0; i < len; i++) {
                const isLast = i + 1 === len;
                const nextPrefix = prefix.slice();
                if (parentIsLast) {
                    nextPrefix.pop();
                    nextPrefix.push('    ')
                }

                nextPrefix.push(isLast ? '   -' : '  |-');

                print(children[i], nextPrefix, isLast)
            }
        }
    }

    print(root, [''], true);
}

module.exports = print;