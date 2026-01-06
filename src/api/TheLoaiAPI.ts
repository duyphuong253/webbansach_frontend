import React from "react";

export interface TheLoai {
    maTheLoai: number;
    tenTheLoai: string;
}

export async function layDanhSachTheLoai(): Promise<TheLoai[]> {
    const response = await fetch("http://localhost:8081/the-loai");
    if (!response.ok) {
        throw new Error("Không lấy được thể loại");
    }
    return response.json();
}