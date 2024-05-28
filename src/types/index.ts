export type MessageType = {
  from: "user" | "computer";
  text: string;
  prompt?: string;
  error?: boolean;
};

export type ModelItem = {
  name?: string;
  description?: string;
  text_mode?: string[];
  region: string;
};

export type ModelItems = {
  [key: string]: ModelItem;
};

export type Parameters = {
  [key: string]: any;
};
