export interface Message {
  type: string;
}

export interface ErrorMessage extends Message {
  message: string;
}

export interface RegisterMessage extends Message {
  name: string;
}
