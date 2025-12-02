// Global typings for project convenience
// Allows attaching small runtime flags to HTMLElements without TS errors

interface HTMLElement {
  __listenerAttached?: boolean;
}

declare interface MediaQueryList {
  addListener?: (callback: (e: MediaQueryListEvent) => void) => void;
  removeListener?: (callback: (e: MediaQueryListEvent) => void) => void;
}

declare module 'pagefind.js' {
  const Pagefind: any;
  export default Pagefind;
}
