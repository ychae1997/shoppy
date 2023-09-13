export type ButtonType = {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
};

export type ProtectedRouteType = {
  children: React.ReactNode;
  requiredAdmin?: boolean;
};

export type InputType = {
  type: string;
  name: string;
  value?: string | number;
  text?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
