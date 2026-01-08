import React, { ChangeEvent, useState, useEffect } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import { layDanhSachTheLoai } from "../../api/TheLoaiAPI";
import { getTotalItems } from "../product/cart/CartSevice";
import { logoutUser } from "../product/cart/CartSevice";
import { useNavigate } from "react-router-dom";
interface NavbarProps {
    tuKhoaTimKiem: string,
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}

interface TheLoai {
    maTheLoai: number;
    tenTheLoai: string;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
    const navigate = useNavigate();
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');
    const [danhSachTheLoai, setDanhSachTheLoai] = useState<TheLoai[]>([]);
    const [soLuongGioHang, setSoLuongGioHang] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Load thể loại
    useEffect(() => {
        layDanhSachTheLoai()
            .then(data => setDanhSachTheLoai(data))
            .catch(err => console.error(err));
    }, []);

    // Cập nhật số lượng cart & login state
    useEffect(() => {
        const updateCartCount = () => {
            setSoLuongGioHang(getTotalItems());
            setIsLoggedIn(!!localStorage.getItem("token")); // kiểm tra login
        };

        updateCartCount(); // load lần đầu
        window.addEventListener("cartUpdated", updateCartCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    // Tìm kiếm
    const searchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTuKhoaTamThoi(e.target.value);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (tuKhoaTamThoi.trim() === "") {
            navigate("/");
            return;
        }
        setTuKhoaTimKiem(tuKhoaTamThoi);
    };

    // Logout
    const handleLogout = () => {
        logoutUser();
        setSoLuongGioHang(0);
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to='/'>BookStore</NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">

                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current='page' to='/'>Trang chủ</NavLink>
                        </li>

                        {/* THỂ LOẠI */}
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle btn btn-link text-white"
                                id="navbarDropdown1"
                                data-bs-toggle="dropdown"
                                type="button"
                            >
                                Thể loại sách
                            </button>

                            <ul className="dropdown-menu">
                                {danhSachTheLoai.length === 0 && (
                                    <li className="dropdown-item text-muted">Không có dữ liệu</li>
                                )}
                                {danhSachTheLoai.map((theLoai) => (
                                    <li key={theLoai.maTheLoai}>
                                        <NavLink className="dropdown-item" to={`/the-loai/${theLoai.maTheLoai}`}>
                                            {theLoai.tenTheLoai}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown2"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Quy định bán hàng
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Quy định 1</a></li>
                                <li><a className="dropdown-item" href="#">Quy định 2</a></li>
                                <li><a className="dropdown-item" href="#">Quy định 3</a></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Liên hệ</a>
                        </li>
                    </ul>
                </div>

                {/* Tìm kiếm */}
                <form className='d-flex' onSubmit={handleSearch}>
                    <input
                        className='form-control me-2'
                        type='search'
                        placeholder='Tìm kiếm'
                        aria-label='Search'
                        onChange={searchInputChange}
                        value={tuKhoaTamThoi}
                    />
                    <button className='btn btn-outline-success' type='submit'>
                        <Search />
                    </button>
                </form>

                {/* Giỏ hàng */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item position-relative">
                        <Link className="nav-link" to="/gio-hang">
                            <i className="fas fa-shopping-cart"></i>
                            {soLuongGioHang > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {soLuongGioHang}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>

                {/* Đăng nhập / Đăng xuất */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        {isLoggedIn ? (
                            <button className="btn btn-link nav-link text-white" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button>
                        ) : (
                            <Link className="nav-link" to="/dang-nhap">
                                <i className="fas fa-user"></i> Login
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
