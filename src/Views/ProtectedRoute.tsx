import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
}) => {
  const { auth } = useAuth();
  // Kullanıcı yetkilendirme kontrolü
  if (!auth || !auth.isAuthenticated) {
    // Eğer kullanıcı yetkilendirme işlemi başarısızsa, login sayfasına yönlendir
    return <Navigate to="/login" />;
  }

  // Yetkili kullanıcı için belirtilen elementi göster
  return <>{element}</>; // Doğrudan elementi döndür
};

export default ProtectedRoute;
