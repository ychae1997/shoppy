export type ButtonType = {
  text: string;
  onClick: () => void;
};

export type ProtectedRouteType = {
  children: React.ReactNode;
  requiredAdmin?: boolean;
};
