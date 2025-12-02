import { useState, useEffect, useRef } from 'react';

interface SearchProps {
  docs: Array<{
    slug: string;
    title: string;
    description?: string;
  }>;
}

export default function Search({ docs }: SearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof docs>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      // Defer state updates to avoid synchronous setState in effect
      queueMicrotask(() => {
        setResults([]);
        setIsOpen(false);
      });
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = docs
      .filter(doc => {
        const titleMatch = doc.title.toLowerCase().includes(lowerQuery);
        const slugMatch = doc.slug.toLowerCase().includes(lowerQuery);
        const descMatch = doc.description?.toLowerCase().includes(lowerQuery);
        return titleMatch || slugMatch || descMatch;
      })
      .slice(0, 8);

    // Defer state updates to avoid synchronous setState in effect
    queueMicrotask(() => {
      setResults(filtered);
      setIsOpen(true);
      setSelectedIndex(0); // Reset selection when results change
    });
  }, [query, docs]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('wiki-search-input')?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <label htmlFor="wiki-search-input" className="sr-only">Search wiki documentation</label>
      <div className="relative group">
        <input
          id="wiki-search-input"
          type="text"
          role="combobox"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Search wiki... (Ctrl+K)"
          className="w-full px-4 py-3 pl-11 pr-20 bg-surface-800 border-2 border-surface-700 rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all hover:border-primary/30"
          aria-label="Search wiki documentation"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-haspopup="listbox"
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface-750 border border-surface-700 rounded text-xs text-text-subtle font-mono hidden sm:inline-block">
          Ctrl+K
        </kbd>
      </div>

      {/* Results dropdown with glassmorphism */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-surface-800/95 backdrop-blur-lg border border-surface-700 rounded-xl shadow-2xl overflow-hidden pattern-noise"
        >
          <div className="p-2">
            {results.map((doc, index) => (
              <a
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="group flex items-start gap-3 px-3 py-3 hover:bg-primary/10 hover:border-l-2 hover:border-primary transition-colors rounded-lg border-b border-surface-700/50 last:border-b-0"
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => setIsOpen(false)}
              >
                <div className="shrink-0 w-6 h-6 rounded-md bg-secondary-subtle flex items-center justify-center text-secondary-dark text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">
                    {doc.title}
                  </div>
                  <div className="text-xs text-text-muted mt-1 font-mono truncate">{doc.slug}</div>
                </div>
                <svg className="w-4 h-4 text-text-subtle group-hover:text-primary transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          className="absolute z-50 w-full mt-2 bg-surface-800/95 backdrop-blur-lg border border-surface-700 rounded-xl shadow-2xl p-6"
        >
          <div className="text-center">
            <svg className="w-12 h-12 text-text-subtle mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-text-muted">No results found for <span className="text-white font-medium">"{query}"</span></p>
            <p className="text-xs text-text-subtle mt-2">Try a different search term</p>
          </div>
        </div>
      )}
    </div>
  );
}
