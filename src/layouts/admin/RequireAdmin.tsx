import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean
}

const RequireAdmin = <P extends Object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();
        const token = localStorage.getItem('token');
        useEffect(() => {
            // Nếu chưa đăng nhập
            if (!token) {
                navigate("/dang-nhap");
                return;
            } else {
                //Giải mã token
                const decodedToken = jwtDecode(token) as JwtPayload;

                // Lấy thông tin cụ thể
                const isAdmin = decodedToken.isAdmin;

                // Kiểm tra
                if (!isAdmin) {
                    navigate("/bao-loi-403");
                    return;
                }
            }
        }, [navigate]);
        return <WrappedComponent {...props} />

    }
    return WithAdminCheck;
}
export default RequireAdmin;