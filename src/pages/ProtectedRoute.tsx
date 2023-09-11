import Loading from "./Loading";
import { Navigate } from "react-router-dom";
import { AuthType } from "../types/authTypes";
import { ProtectedRouteType } from "../types/elementTypes";
import { useAuthContext } from "../components/context/AuthContext";

export default function ProtectedRoute({
  children,
  requiredAdmin
}: ProtectedRouteType) {
  const { user, isLoading } = useAuthContext() as AuthType;

  if (isLoading) {
    return <Loading />;
  } else if (!user || (requiredAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}

/*
  1. 로그인한 사용자가 있는지 확인
  2. 그 사용자가 어드민 권한이 있는지 확인
  3. requiredAdmin이 true인 경우에는 로그인도 되어 있어야하고, 어드민 권한도 가지고 있어야 함
  4. 조건에 맞지 않으면 상위경로로 이동
  5. 조건에 맞는 경우에만 전달된 children을 보여줌
*/
