// Navigation tree structure and utilities
export type NavItem = {
  title: string;
  slug: string;
  weight: number;
  children: NavItem[];
  path: string[];
};

/**
 * Build a hierarchical navigation tree from flat docs collection
 */
export function buildNavigationTree(docs: Array<{ slug: string; data: { title: string; weight?: number } }>): NavItem[] {
  const tree: Map<string, NavItem> = new Map();

  // First pass: create all nodes
  docs.forEach(doc => {
    const parts = doc.slug.split('/');
    const isIndex = parts[parts.length - 1] === 'index';

    if (isIndex && parts.length === 1) return; // Skip root index

    // Create node for this doc
    const nodeKey = doc.slug;
    if (!tree.has(nodeKey)) {
      tree.set(nodeKey, {
        title: doc.data.title,
        slug: doc.slug,
        weight: doc.data.weight || 999,
        children: [],
        path: parts
      });
    } else {
      // Update existing node with doc data
      const node = tree.get(nodeKey)!;
      node.title = doc.data.title;
      node.weight = doc.data.weight || 999;
    }
  });

  // Second pass: build parent-child relationships
  const rootNodes: NavItem[] = [];
  const nodesBySlug = new Map(Array.from(tree.entries()));

  nodesBySlug.forEach((node, _slug) => {
    const parts = node.path;

    if (parts.length === 1) {
      // Top level
      rootNodes.push(node);
    } else {
      // Find parent
      const parentPath = parts.slice(0, -1);
      const parentSlug = parentPath.join('/');
      const parentIndexSlug = parentSlug + '/index';

      let parent = nodesBySlug.get(parentSlug) || nodesBySlug.get(parentIndexSlug);

      if (parent && !node.slug.endsWith('/index')) {
        parent.children.push(node);
      } else if (!parent && parts.length === 2) {
        // Parent doesn't exist, add to root
        rootNodes.push(node);
      }
    }
  });

  // Sort recursively
  function sortNodes(nodes: NavItem[]): NavItem[] {
    return nodes
      .sort((a, b) => {
        // Index pages first
        if (a.slug.endsWith('/index') && !b.slug.endsWith('/index')) return -1;
        if (!a.slug.endsWith('/index') && b.slug.endsWith('/index')) return 1;
        return a.weight - b.weight;
      })
      .map(node => ({
        ...node,
        children: sortNodes(node.children)
      }));
  }

  return sortNodes(rootNodes);
}

/**
 * Find the next and previous pages in the navigation tree for linear navigation
 */
export function findAdjacentPages(
  navigation: NavItem[],
  currentSlug: string
): { prev: NavItem | null; next: NavItem | null } {
  // Flatten the tree into a linear array (depth-first traversal)
  const flatList: NavItem[] = [];

  function flatten(nodes: NavItem[]) {
    for (const node of nodes) {
      // Don't include index pages in linear navigation
      if (!node.slug.endsWith('/index')) {
        flatList.push(node);
      }
      if (node.children.length > 0) {
        flatten(node.children);
      }
    }
  }

  flatten(navigation);

  // Find current page index
  const currentIndex = flatList.findIndex(
    item => item.slug === currentSlug || item.slug === currentSlug + '/index'
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? flatList[currentIndex - 1] : null,
    next: currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null
  };
}

/**
 * Check if a slug is the active page
 */
export function isActivePage(currentPath: string, slug: string): boolean {
  return currentPath === slug || currentPath === slug.replace('/index', '');
}

/**
 * Check if a slug is a parent of the active page
 */
export function isParentOfActivePage(currentPath: string, slug: string): boolean {
  return currentPath.startsWith(slug + '/') || currentPath.startsWith(slug.replace('/index', '') + '/');
}
