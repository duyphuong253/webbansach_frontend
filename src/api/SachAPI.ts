import React from "react";
import SachModel from "../models/SachModel";
import { my_request } from "./Request";

interface KetQuaInterface {
    ketQua: SachModel[],
    tongSoTrang: number,
    tongSoSach: number,
}

async function laySach(duongDan: string): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];

    // Gọi phương thức request
    const response = await my_request(duongDan);
    // console.log(response);

    // Lấy ra json sách
    const responseData = response._embedded.saches;

    // Lấy thông tin trang
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;

    // console.log(responseData);
    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa: responseData[key].moTa,
            soLuong: responseData[key].soLuong,
            tenTacGia: responseData[key].tenTacGia,
            trungBinhXepHang: responseData[key].trungBinhXepHang,
        });
    }
    return {
        ketQua,
        tongSoTrang: tongSoTrang,
        tongSoSach: tongSoSach
    };
}

export async function layToanBoSach(trangHienTai: number): Promise<KetQuaInterface> {

    //Xác định endpoint
    const duongDan: string = `http://localhost:8081/sach?sort=maSach,desc&size=8&page=${trangHienTai}`;

    return laySach(duongDan);
}

export async function lay5QuyenSachMoiNhat(): Promise<KetQuaInterface> {

    //Xác định endpoint
    const duongDan: string = "http://localhost:8081/sach?sort=maSach,desc&page=0&size=5";

    return laySach(duongDan);
}

// Tìm kiếm sách theo endpoint http://localhost:8081/sach/search/findByTenSachContaining{?tenSach,page,size,sort*}
export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number, trangHienTai: number): Promise<KetQuaInterface> {

    //Xác định endpoint
    // let duongDan: string = "http://localhost:8081/sach?sort=maSach,desc&page=0";
    // if (tuKhoaTimKiem !== "" && maTheLoai == 0) {
    //     duongDan = `http://localhost:8081/sach/search/findByTenSachContaining?sort=maSach,desc&page=0&tenSach=${tuKhoaTimKiem}`
    // } else if (tuKhoaTimKiem === "" && maTheLoai > 0) {
    //     duongDan = `http://localhost:8081/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach,desc&page=0&maTheLoai=${maTheLoai}`
    // } else if (tuKhoaTimKiem !== "" && maTheLoai > 0) {
    //     duongDan = `http://localhost:8081/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach,desc&page=0&maTheLoai=${maTheLoai}&tenSach=${tuKhoaTimKiem}`
    // }

    // return laySach(duongDan);
    let duongDan = `http://localhost:8081/sach?sort=maSach,desc&page=${trangHienTai}&size=8`;

    if (tuKhoaTimKiem !== "" && maTheLoai === 0) {
        duongDan =
            `http://localhost:8081/sach/search/findByTenSachContaining` +
            `?tenSach=${tuKhoaTimKiem}&page=${trangHienTai}&size=8&sort=maSach,desc`;

    } else if (tuKhoaTimKiem === "" && maTheLoai > 0) {
        duongDan =
            `http://localhost:8081/sach/search/findByDanhSachTheLoai_MaTheLoai` +
            `?maTheLoai=${maTheLoai}&page=${trangHienTai}&size=8&sort=maSach,desc`;

    } else if (tuKhoaTimKiem !== "" && maTheLoai > 0) {
        duongDan =
            `http://localhost:8081/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai` +
            `?tenSach=${tuKhoaTimKiem}&maTheLoai=${maTheLoai}` +
            `&page=${trangHienTai}&size=8&sort=maSach,desc`;
    }

    return laySach(duongDan);
}

export async function laySachTheoMaSach(maSach: number): Promise<SachModel | null> {

    const duongDan: string = `http://localhost:8081/sach/${maSach}`;

    try {
        const response = await fetch(duongDan);

        if (!response.ok) {
            throw new Error(`Gặp lỗi trong quá trình gọi API lấy sách`)
        }

        const sachData = await response.json();

        if (sachData) {
            return {
                maSach: sachData.maSach,
                tenSach: sachData.tenSach,
                giaBan: sachData.giaBan,
                giaNiemYet: sachData.giaNiemYet,
                moTa: sachData.moTa,
                soLuong: sachData.soLuong,
                tenTacGia: sachData.tenTacGia,
                trungBinhXepHang: sachData.trungBinhXepHang,
            }
        } else {
            throw new Error('Không tồn tại sách')
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}