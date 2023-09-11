// user 정보 타입
export type NullableUser = any | null;
// onUserStateChange 콜백함수 타입
export type UserCallback = (user: NullableUser) => void;

export type AuthType = {
  user: NullableUser;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
};
