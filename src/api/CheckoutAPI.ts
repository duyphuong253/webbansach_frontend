// src/api/CheckoutAPI.ts

export interface OrderRequest {
    items: {
        maSach: number;
        soLuong: number;
    }[];
    diaChiMuaHang: string;
    diaChiNhanHang: string;
    maHinhThucGiaoHang: number;
    maHinhThucThanhToan: number;
}

export async function postOrder(order: OrderRequest): Promise<number> {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Bạn chưa đăng nhập.");
    }

    const response = await fetch("http://localhost:8081/don-hang", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(order),
    });

    if (response.status === 401) {
        throw new Error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
    }

    if (response.status === 409) {
        const msg = await response.text();
        throw new Error(msg);
    }

    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Lỗi tạo đơn hàng");
    }

    const data = await response.json();
    return data.maDonHang; //Server phải trả { "maDonHang": 123 }
}

