export interface ChecklistItem {
  text: string;
  done: boolean;
}

export type ChecklistData = Record<string, ChecklistItem[]>;
