import { useState, useEffect } from 'react';
import { ChevronRight, Folder, FileText, Home } from 'lucide-react';

interface Page {
  slug: string;
  title: string;
  children: Page[];
}

interface SidebarTreeProps {
  navigation: Page[];
  currentPath: string;
  isHome: boolean;
}

export function SidebarTree({ navigation, currentPath, isHome }: SidebarTreeProps) {
  return (
    <div className="space-y-2">
      {/* Wiki Home Link */}
      <a
        href="/"
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
          isHome
            ? 'bg-primary text-white shadow-lg'
            : 'text-text-muted hover:text-white hover:bg-surface-800'
        }`}
        style={isHome ? { boxShadow: '0 0 20px var(--color-primary-glow)' } : undefined}
      >
        <Home size={18} />
        <span>Wiki Home</span>
      </a>

      {/* Documentation Label */}
      <div className="flex items-center gap-2 px-3 mt-6 mb-4">
        <FileText size={16} className="text-primary" />
        <span className="text-xs font-bold text-text-subtle uppercase tracking-wider">
          Documentation
        </span>
      </div>

      {/* Navigation Tree */}
      <nav className="space-y-1">
        {navigation.map((node) => (
          <FolderGroup
            key={node.slug}
            node={node}
            currentPath={currentPath}
            level={0}
          />
        ))}
      </nav>
    </div>
  );
}

interface FolderGroupProps {
  node: Page;
  currentPath: string;
  level: number;
}

function FolderGroup({ node, currentPath, level }: FolderGroupProps) {
  const hasChildren = node.children.length > 0;
  const isActive = currentPath === node.slug || currentPath === `${node.slug}/index`;
  const isParent = currentPath.startsWith(node.slug + '/') && !isActive;
  
  // Auto-expand if current page is inside this folder, or allow manual toggle
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const isOpen = isManuallyToggled || isParent || isActive;

  if (!hasChildren) {
    // Leaf node (page without children)
    return (
      <a
        href={`/docs/${node.slug}`}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? 'bg-primary text-white shadow-lg'
            : 'text-text-muted hover:text-white hover:bg-surface-800'
        }`}
        style={isActive ? { boxShadow: '0 0 20px var(--color-primary-glow)' } : undefined}
      >
        <FileText size={16} />
        <span className="flex-1">{node.title}</span>
      </a>
    );
  }

  return (
    <div>
      {/* Folder Header - Clickable to expand/collapse */}
      <button
        type="button"
        onClick={() => setIsManuallyToggled(!isOpen)}
        className={`flex items-center w-full gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          isActive
            ? 'bg-primary text-white shadow-lg'
            : isParent
            ? 'text-white bg-surface-800'
            : 'text-text-muted hover:text-white hover:bg-surface-800'
        }`}
        style={isActive ? { boxShadow: '0 0 20px var(--color-primary-glow)' } : undefined}
      >
        <ChevronRight
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        />
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
            isActive
              ? 'bg-white/20'
              : isParent
              ? 'bg-primary/10'
              : 'bg-surface-750 group-hover:bg-primary/10'
          }`}
        >
          <Folder size={16} className={isActive || isParent ? 'text-white' : 'text-text-muted'} />
        </div>
        <span className="flex-1 text-left">{node.title}</span>
      </button>

      {/* Children - Collapsible */}
      {isOpen && (
        <div className="ml-11 mt-2 space-y-1">
          {node.children
            .filter((child) => !child.slug.endsWith('/index'))
            .map((child) => {
              const childActive = currentPath === child.slug;
              const childIsParent = currentPath.startsWith(child.slug + '/') && !childActive;
              const childHasChildren = child.children.length > 0;

              if (childHasChildren) {
                // Recursive folder
                return (
                  <FolderGroup
                    key={child.slug}
                    node={child}
                    currentPath={currentPath}
                    level={level + 1}
                  />
                );
              }

              // Leaf page
              return (
                <a
                  key={child.slug}
                  href={`/docs/${child.slug}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                    childActive
                      ? 'text-white font-semibold bg-primary/15 border-l-2 border-primary'
                      : childIsParent
                      ? 'text-white font-medium bg-surface-850'
                      : 'text-text-muted hover:text-white hover:bg-surface-850'
                  }`}
                >
                  <span
                    className={`text-lg leading-none transition-colors ${
                      childActive ? 'text-primary' : 'text-primary/40'
                    }`}
                  >
                    ▹
                  </span>
                  <span className="flex-1">{child.title}</span>
                </a>
              );
            })}
        </div>
      )}
    </div>
  );
}
