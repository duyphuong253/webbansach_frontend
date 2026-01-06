import { useEffect, useState } from "react";
import CartItem from "../../models/CartItem";
import { getCart, getTotalMoney, removeFromCart, updateQuantity } from "./cart/CartSevice";
import dinhDangSo from "../utils/DinhDangSo";

const GioHang: React.FC = () => {

    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(getCart());
    }, []);

    const handleChangeQuantity = (maSach: number, soLuong: number) => {
        if (soLuong < 1) return;
        updateQuantity(maSach, soLuong);
        setCart(getCart());
    };

    const handleRemove = (maSach: number) => {
        removeFromCart(maSach);
        setCart(getCart());
    };

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h3>🛒 Giỏ hàng trống</h3>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">🛒 Giỏ hàng</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>Sách</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tạm tính</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.maSach}>
                            <td>{item.tenSach}</td>
                            <td>{dinhDangSo(item.giaBan)}đ</td>
                            <td>
                                <input
                                    type="number"
                                    value={item.soLuong}
                                    min={1}
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    onChange={(e) =>
                                        handleChangeQuantity(
                                            item.maSach,
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </td>
                            <td>{dinhDangSo(item.tongTien)}đ</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemove(item.maSach)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-end mt-3">
                <h4>
                    Tổng tiền:{" "}
                    <span className="text-danger">
                        {dinhDangSo(getTotalMoney())}đ
                    </span>
                </h4>

                <button className="btn btn-success mt-2">
                    Thanh toán
                </button>
            </div>
        </div>
    );
};

export default GioHang;