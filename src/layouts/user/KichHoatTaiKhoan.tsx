import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function KichHoatTaiKhoan() {
    const { email, maKichHoat } = useParams();

    const [daKichHoat, setDaKichHoat] = useState(false);
    const [thongBao, setThongBao] = useState("");

    useEffect(() => {
        if (email && maKichHoat) {
            kichHoatTaiKhoan(email, maKichHoat);
        } else {
            setThongBao("Link kích hoạt không hợp lệ");
        }
    }, []);

    const kichHoatTaiKhoan = async (email: string, maKichHoat: string) => {
        try {
            const response = await fetch(
                `http://localhost:8081/tai-khoan/kich-hoat?email=${encodeURIComponent(email)}&maKichHoat=${maKichHoat}`
            );

            if (response.ok) {
                setDaKichHoat(true);
            } else {
                setThongBao(await response.text());
            }
        } catch {
            setThongBao("Lỗi kết nối server");
        }
    };

    return (
        <div>
            <h2>Kích hoạt tài khoản</h2>
            {daKichHoat ? (
                <p>
                    Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để tiếp tục sử dụng dịch vụ
                </p>
            ) : (
                <p>{thongBao}</p>
            )}
        </div>
    );
}

export default KichHoatTaiKhoan;
