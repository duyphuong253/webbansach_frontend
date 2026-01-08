import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface ChiTietDonHang {
    maSach: number;
    tenSach: string;
    giaBan: number;
    soLuong: number;
    tongTien: number;
}

interface DonHang {
    maDonHang: number;
    ngayTao: string;
    diaChiMuaHang: string;
    diaChiNhanHang: string,
    tongTien: number;
    phiVanChuyen: number,
    danhSachChiTietDonHang: ChiTietDonHang[];
}

const CheckoutSuccess: React.FC = () => {
    const { maDonHang } = useParams();
    const [donHang, setDonHang] = useState<DonHang | null>(null);
    const [dangTai, setDangTai] = useState(true);
    const [loi, setLoi] = useState<string | null>(null);

    useEffect(() => {
        if (!maDonHang) return;

        const token = localStorage.getItem("token");
        if (!token) {
            setLoi("Bạn chưa đăng nhập");
            setDangTai(false);
            return;
        }

        const fetchDonHang = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8081/don-hang/${maDonHang}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.status === 401) {
                    throw new Error("Phiên đăng nhập đã hết hạn");
                }

                if (!response.ok) {
                    throw new Error("Không thể lấy đơn hàng");
                }

                const data = await response.json();
                setDonHang(data);
            } catch (error: any) {
                setLoi(error.message);
            } finally {
                setDangTai(false);
            }
        };

        fetchDonHang();
    }, [maDonHang]);


    if (dangTai) return <h2>Đang tải đơn hàng...</h2>;
    if (loi) return <h2>Lỗi: {loi}</h2>;
    if (!donHang) return <h2>Đơn hàng không tồn tại</h2>;

    return (
        <div className="container mt-4">
            <h2>Đặt hàng thành công! Mã đơn: {donHang.maDonHang}</h2>
            <p>Ngày tạo: {new Date(donHang.ngayTao).toLocaleString()}</p>
            <p>Địa chỉ mua hàng: {donHang.diaChiMuaHang}</p>
            <p>Địa chỉ nhận hàng: {donHang.diaChiNhanHang}</p>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Sách</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Tổng</th>
                        <th>Phí vận chuyển</th>
                    </tr>
                </thead>
                <tbody>
                    {donHang.danhSachChiTietDonHang.map((item) => (
                        <tr key={item.maSach}>
                            <td>{item.tenSach}</td>
                            <td>{item.soLuong}</td>
                            <td>{item.giaBan.toLocaleString()} đ</td>
                            <td>{item.tongTien.toLocaleString()} đ</td>
                            <td>{(donHang.tongTien - item.tongTien).toLocaleString()} đ</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4>Tổng tiền: {donHang.tongTien.toLocaleString()} đ</h4>
            <Link to="/" className="btn btn-primary mt-3">
                Quay về trang chủ
            </Link>
        </div>
    );
};

export default CheckoutSuccess;