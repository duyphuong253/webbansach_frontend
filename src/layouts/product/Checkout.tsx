import { useNavigate } from "react-router-dom";
import CartItem from "../../models/CartItem";
import { useState } from "react";
import { postOrder } from "../../api/CheckoutAPI";

interface CheckoutProps {
    cartItems: CartItem[];
    clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, clearCart }) => {
    const navigate = useNavigate();

    const [diaChiMuaHang, setDiaChiMuaHang] = useState("");
    const [diaChiNhanHang, setDiaChiNhanHang] = useState("");
    const [hinhThucGiaoHang, setHinhThucGiaoHang] = useState(1);
    const [hinhThucThanhToan, setHinhThucThanhToan] = useState(1);
    const [loi, setLoi] = useState("");
    const [dangGui, setDangGui] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoi("");

        if (!diaChiMuaHang || !diaChiNhanHang) {
            setLoi("Vui lòng nhập đầy đủ địa chỉ.");
            return;
        }

        if (cartItems.length === 0) {
            setLoi("Giỏ hàng đang trống.");
            return;
        }

        try {
            setDangGui(true);

            // CHỈ GỬI NHỮNG THÔNG TIN FE ĐƯỢC PHÉP GỬI
            const payload = {
                items: cartItems.map(item => ({
                    maSach: item.maSach,
                    soLuong: item.soLuong
                })),
                diaChiMuaHang,
                diaChiNhanHang,
                maHinhThucGiaoHang: hinhThucGiaoHang,
                maHinhThucThanhToan: hinhThucThanhToan
            };

            const maDonHang = await postOrder(payload);

            // Xóa giỏ hàng sau khi đặt thành công
            clearCart();

            navigate(`/checkout-success/${maDonHang}`);

        } catch (error: any) {
            setLoi(error.message || "Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setDangGui(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Thanh toán</h2>

            {loi && (
                <div className="alert alert-danger">
                    {loi}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                {/* Địa chỉ */}
                <label className="mt-3">Địa chỉ mua hàng</label>
                <input
                    className="form-control"
                    placeholder="Nhập địa chỉ mua hàng"
                    value={diaChiMuaHang}
                    onChange={(e) => setDiaChiMuaHang(e.target.value)}
                />

                <label className="mt-3">Địa chỉ nhận hàng</label>
                <input
                    className="form-control"
                    placeholder="Nhập địa chỉ nhận hàng"
                    value={diaChiNhanHang}
                    onChange={(e) => setDiaChiNhanHang(e.target.value)}
                />

                {/* Hình thức giao */}
                <label className="mt-3">Hình thức giao hàng</label>
                <select
                    className="form-control"
                    value={hinhThucGiaoHang}
                    onChange={(e) => setHinhThucGiaoHang(Number(e.target.value))}
                >
                    <option value={1}>Giao nhanh (+30k)</option>
                    <option value={2}>Giao thường (+15k)</option>
                </select>

                {/* Thanh toán */}
                <label className="mt-3">Hình thức thanh toán</label>
                <select
                    className="form-control"
                    value={hinhThucThanhToan}
                    onChange={(e) => setHinhThucThanhToan(Number(e.target.value))}
                >
                    <option value={1}>COD (0đ)</option>
                    <option value={2}>Chuyển khoản (+3k)</option>
                </select>

                <button className="btn btn-success mt-4 w-100" disabled={dangGui}>
                    {dangGui ? "Đang xử lý..." : "Đặt hàng"}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
