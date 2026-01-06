import React, { ChangeEvent, useState, useEffect } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import { layDanhSachTheLoai } from "../../api/TheLoaiAPI";
interface NavbarProps {
    tuKhoaTimKiem: string,
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}

interface TheLoai {
    maTheLoai: number;
    tenTheLoai: string;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {

    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');
    const [danhSachTheLoai, setDanhSachTheLoai] = useState<TheLoai[]>([]);

    useEffect(() => {
        layDanhSachTheLoai()
            .then(data => setDanhSachTheLoai(data))
            .catch(err => console.error(err));
    }, []);

    const searchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTuKhoaTamThoi(e.target.value);
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // không reload trang
        setTuKhoaTimKiem(tuKhoaTamThoi);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">BookStore</a>
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
                                    <li className="dropdown-item text-muted">
                                        Không có dữ liệu
                                    </li>
                                )}

                                {danhSachTheLoai.map((theLoai) => (
                                    <li key={theLoai.maTheLoai}>
                                        <NavLink
                                            className="dropdown-item"
                                            to={`/the-loai/${theLoai.maTheLoai}`}
                                        >
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
                    <input className='form-control me-2' type='search' placeholder='Tìm kiếm' aria-label='Search' onChange={searchInputChange} value={tuKhoaTamThoi}></input>
                    <button className='btn btn-outline-success' type='submit' onClick={handleSearch}>
                        <Search />
                    </button>
                </form>
                {/* Giỏ hàng */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-shopping-cart"></i>
                        </a>
                    </li>
                </ul>
                {/* Đăng nhập */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-user"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;