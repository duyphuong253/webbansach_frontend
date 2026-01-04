import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import DanhGiaModel from "../../../models/DanhGiaModel";
import { Star, StarFill } from "react-bootstrap-icons";
import renderRating from "../../utils/SaoXepHang";

interface DanhGiaSanPham {
    maSach: number,
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {

    const maSach: number = props.maSach;

    const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoDanhGiaCuaMotSach(maSach).then(
            danhSachDanhGia => {
                setDanhSachDanhGia(danhSachDanhGia);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message);
            }
        );
    }, []
    ) // Chỉ gọi 1 lần


    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <h4>Đánh giá sản phẩm</h4>
            {
                danhSachDanhGia.map((danhGia, index) => (
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Rating
                                <p>{renderRating(danhGia.diemXepHang ? danhGia.diemXepHang : 0)}</p>
                            </p>
                        </div>

                        <div className="col-8 text-start">
                            <p>Nhận xét
                                <p>{danhGia.nhanXet}</p>
                            </p>
                        </div>

                    </div>
                ))
            }

        </div>
    );
}
export default DanhGiaSanPham;