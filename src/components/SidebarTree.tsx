import { useState } from 'react';
import { ChevronRight, Folder, FolderOpen, FileText, Home } from 'lucide-react';

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
      <a
        href="/"
        className={`sidebar-item ${isHome ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
        aria-current={isHome ? 'page' : undefined}
      >
        <Home size={18} className="sidebar-item-icon" aria-hidden="true" />
        <span>Wiki Home</span>
      </a>

      <div className="sidebar-docs-label">
        <FileText size={16} className="sidebar-docs-icon" aria-hidden="true" />
        <span className="sidebar-docs-title">
          Documentation
        </span>
      </div>

      <nav className="sidebar-nav" aria-label="Documentation sections">
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
  
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const isOpen = isManuallyToggled || isParent || isActive;

  if (!hasChildren) {
    return (
      <a
        href={`/docs/${node.slug}`}
        className={`sidebar-item ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className="flex-1">{node.title}</span>
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsManuallyToggled(!isOpen)}
        className={`sidebar-folder-header ${
          isActive
            ? 'sidebar-folder-header-active'
            : isParent
            ? 'sidebar-folder-header-parent'
            : 'sidebar-folder-header-inactive'
        }`}
        aria-expanded={isOpen}
        aria-controls={`folder-children-${node.slug}`}
      >
        <ChevronRight
          size={16}
          className={`sidebar-folder-arrow ${isOpen ? 'sidebar-folder-arrow-open' : ''}`}
          aria-hidden="true"
        />
        <div
          className={`sidebar-folder-icon ${
            isActive
              ? 'sidebar-folder-icon-active'
              : isParent
              ? 'sidebar-folder-icon-parent'
              : 'sidebar-folder-icon-inactive'
          }`}
          aria-hidden="true"
        >
          {isOpen ? (
            <FolderOpen size={16} className={isActive || isParent ? 'text-text-white' : 'text-text-muted'} />
          ) : (
            <Folder size={16} className={isActive || isParent ? 'text-text-white' : 'text-text-muted'} />
          )}
        </div>
        <span className="flex-1 text-left font-semibold">{node.title}</span>
      </button>

      {isOpen && (
        <div 
          id={`folder-children-${node.slug}`}
          className="sidebar-folder-children"
          role="group"
          aria-label={`${node.title} pages`}
        >
          {node.children
            .filter((child) => !child.slug.endsWith('/index'))
            .map((child) => {
              const childActive = currentPath === child.slug;
              const childIsParent = currentPath.startsWith(child.slug + '/') && !childActive;
              const childHasChildren = child.children.length > 0;

              if (childHasChildren) {
                return (
                  <FolderGroup
                    key={child.slug}
                    node={child}
                    currentPath={currentPath}
                    level={level + 1}
                  />
                );
              }

              return (
                <a
                  key={child.slug}
                  href={`/docs/${child.slug}`}
                  className={`sidebar-child-item ${
                    childActive
                      ? 'sidebar-child-item-active'
                      : childIsParent
                      ? 'sidebar-child-item-parent'
                      : 'sidebar-child-item-inactive'
                  }`}
                  aria-current={childActive ? 'page' : undefined}
                >
                  <span className="flex-1 text-sm">{child.title}</span>
                </a>
              );
            })}
        </div>
      )}
    </div>
  );
}
