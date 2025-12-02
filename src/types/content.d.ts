export interface DocData {
  title?: string;
  description?: string;
  excerpt?: string;
  [key: string]: unknown;
}

export interface DocEntry {
  id?: string;
  slug: string;
  url?: string;
  data?: DocData;
  [key: string]: unknown;
}

export type DocsCollection = DocEntry[];
