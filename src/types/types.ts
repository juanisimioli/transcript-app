export type Role = "user" | "agent";

export type Bubble = {
  start: number;
  end: number;
  role: Role;
  content: string;
};
