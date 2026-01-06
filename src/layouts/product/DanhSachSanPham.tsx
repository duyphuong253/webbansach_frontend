import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach, timKiemSach } from "../../api/SachAPI";
import { error } from "console";
import { PhanTrang } from "../utils/PhanTrang";

interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string,
    maTheLoai: number
}

function DanhSachSanPham({ tuKhoaTimKiem, maTheLoai }: DanhSachSanPhamProps) {
    const [danhSachSach, setDanhSachSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setTongSoSach] = useState(0);

    useEffect(() => {
        setTrangHienTai(1);
    }, [tuKhoaTimKiem, maTheLoai]);

    useEffect(() => {
        if (tuKhoaTimKiem === "" && maTheLoai == 0) {
            layToanBoSach(trangHienTai - 1).then(
                kq => {
                    setDanhSachSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setBaoLoi(error.message);
                }
            );
        } else {
            timKiemSach(tuKhoaTimKiem, maTheLoai, trangHienTai - 1).then(
                kq => {
                    setDanhSachSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setBaoLoi(error.message);
                }
            );
        }
    }, [trangHienTai, tuKhoaTimKiem, maTheLoai]
    ); // Chỉ gọi 1 lần

    const phanTrang = (trang: number) => setTrangHienTai(trang);


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

    if (danhSachSach.length === 0) {
        return (
            <div className="container">
                <div className="d-flex align-item-center justify-content-center">
                    <h1>Không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }
    return (

        <div className="container">
            <div className="row mt-4">
                {
                    danhSachSach.map((sach) => (
                        <SachProps key={sach.maSach} sach={sach} />
                    ))
                }
            </div>
            <PhanTrang
                trangHienTai={trangHienTai}
                tongSoTrang={tongSoTrang}
                phanTrang={phanTrang}
            />
        </div>
    );
}

export default DanhSachSanPham;