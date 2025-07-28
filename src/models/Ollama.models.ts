export interface IModeleOllama {
  nom: string;
  temperature: number;
}

export enum RoleMessageOllama {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
  TOOL = "tool",
}
