import { useState } from 'react';
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
      <a
        href="/"
        className={`sidebar-item ${isHome ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
      >
        <Home size={18} className="sidebar-item-icon" />
        <span>Wiki Home</span>
      </a>

      <div className="sidebar-docs-label">
        <FileText size={16} className="sidebar-docs-icon" />
        <span className="sidebar-docs-title">
          Documentation
        </span>
      </div>

      <nav className="sidebar-nav">
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
      >
        <FileText size={16} className="sidebar-item-icon" />
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
      >
        <ChevronRight
          size={16}
          className={`sidebar-folder-arrow ${isOpen ? 'sidebar-folder-arrow-open' : ''}`}
        />
        <div
          className={`sidebar-folder-icon ${
            isActive
              ? 'sidebar-folder-icon-active'
              : isParent
              ? 'sidebar-folder-icon-parent'
              : 'sidebar-folder-icon-inactive'
          }`}
        >
          <Folder size={16} className={isActive || isParent ? 'text-text-white' : 'text-text-muted'} />
        </div>
        <span className="flex-1 text-left">{node.title}</span>
      </button>

      {isOpen && (
        <div className="sidebar-folder-children">
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
                >
                  <span
                    className={`sidebar-child-indicator ${
                      childActive ? 'sidebar-child-indicator-active' : 'sidebar-child-indicator-inactive'
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
