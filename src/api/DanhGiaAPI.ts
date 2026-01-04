import React from "react";
import { my_request } from "./Request";
import DanhGiaModel from "../models/DanhGiaModel";


async function layDanhGiaCuaMotSach(duongDan: string): Promise<DanhGiaModel[]> {
    const result: DanhGiaModel[] = [];

    //Xác định endpoint
    // const duongDan: string = `http://localhost:8081/sach/${maSach}/danhSachHinhAnh`;

    // Gọi phương thức request
    const response = await my_request(duongDan);
    // console.log(response);

    // Lấy ra json sách
    const responseData = response._embedded.suDanhGias;
    // console.log(responseData);
    for (const key in responseData) {
        result.push({
            maDanhGia: responseData[key].maDanhGia,
            diemXepHang: responseData[key].diemXepHang,
            nhanXet: responseData[key].nhanXet,
            maNguoiDung: 0,
            maSach: 0,
        });
    }
    return result;
}
export async function layToanBoDanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {

    //Xác định endpoint
    const duongDan: string = `http://localhost:8081/sach/${maSach}/danhSachSuDanhGia`;
    return layDanhGiaCuaMotSach(duongDan);
}

export async function layMotDanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {

    //Xác định endpoint
    const duongDan: string = `http://localhost:8081/sach/${maSach}/danhSachSuDanhGia?sort=maHinhAnh,asc&page=0&size=1`;
    return layDanhGiaCuaMotSach(duongDan);
}

export async function layTenNguoiDungCuaDanhGia(maNguoiDung: number): Promise<DanhGiaModel[]> {

    //Xác định endpoint
    const duongDan: string = `http://localhost:8081/su-danh-gia/${maNguoiDung}/nguoiDung`;
    return layDanhGiaCuaMotSach(duongDan);
}