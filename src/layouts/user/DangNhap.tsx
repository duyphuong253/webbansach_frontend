import { useState } from "react";
import { useNavigate } from "react-router-dom";
const DangNhap = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogin = () => {

        const loginRequest = {
            username: username,
            password: password,
        };
        fetch(`http://localhost:8081/tai-khoan/dang-nhap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        }).then(
            (response) => {
                if (response.ok) {
                    setError('Đăng nhập thành công');
                    return response.json();
                } else {
                    throw new Error('Đăng nhập thất bại!')
                }
            }
        ).then(
            (data) => {
                //Xử lý đăng nhập thành công
                const { jwt } = data;
                //Lưu token vào localStorage hoặc cookies
                localStorage.setItem('token', jwt);
                //Điều hướng đến trang chính hoặc thực hiện các tác vụ sau đăng nhập
                // **Dispatch event để Navbar cập nhật cart**
                window.dispatchEvent(new Event("cartUpdated"));
                // Thông báo đăng nhập thành công (nếu cần)
                setError('Đăng nhập thành công');
                // Điều hướng sang trang chính
                navigate('/');
            }
        ).catch((error) => {
            console.error('Đăng nhập thất bại: ', error);
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu!');
        })
    }
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5"
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "380px",
                    padding: "30px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        fontSize: "24px",
                        fontWeight: "bold"
                    }}
                >
                    Đăng nhập
                </h1>

                <input
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "12px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />

                <input
                    type="password"
                    placeholder="Nhập password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "12px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />

                <div
                    style={{
                        marginBottom: "15px",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <input type="checkbox" style={{ marginRight: "6px" }} />
                    <span>Remember me</span>
                </div>

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#0d6efd",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Đăng nhập
                </button>

                {error && (
                    <div
                        style={{
                            color: "red",
                            marginTop: "12px",
                            textAlign: "center"
                        }}
                    >
                        {error}
                    </div>
                )}
            </div>
        </div>

    );
}

export default DangNhap;