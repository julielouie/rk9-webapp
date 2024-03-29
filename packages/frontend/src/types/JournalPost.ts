export interface JournalPost {
  id?: string;
  title: string;
  date: Date;
  oneOnOneUserId: string;
  notes: string;
  workOn?: string;
  links?: string[];
  misc?: string;
}
