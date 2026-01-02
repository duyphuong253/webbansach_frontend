import React from "react";
import { my_request } from "./Request";
import HinhAnhModel from "../models/HinhAnhModel";


async function layAnhCuaMotSach(duongDan: string): Promise<HinhAnhModel[]> {
    const result: HinhAnhModel[] = [];

    //Xác định endpoint
    // const duongDan: string = `http://localhost:8081/sach/${maSach}/danhSachHinhAnh`;

    // Gọi phương thức request
    const response = await my_request(duongDan);
    // console.log(response);

    // Lấy ra json sách
    const responseData = response._embedded.hinhAnhs;
    // console.log(responseData);
    for (const key in responseData) {
        result.push({
            maHinhAnh: responseData[key].maHinhAnh,
            tenHinhAnh: responseData[key].tenHinhAnh,
            icon: responseData[key].icon,
            duongDan: responseData[key].duongDan,
            duLieuAnh: responseData[key].duLieuAnh,

        });
    }
    return result;
}
export async function layToanBoAnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {

    //Xác định endpoint
    const duongDan: string = `http://localhost:8081/sach/${maSach}/danhSachHinhAnh`;
    return layAnhCuaMotSach(duongDan);
}

export async function layMotAnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {

    //Xác định endpoint
    const duongDan: string = `http://localhost:8081/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
    return layAnhCuaMotSach(duongDan);
}