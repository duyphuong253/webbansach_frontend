class CartItem {
    maSach: number;
    tenSach: string;
    giaBan: number;
    soLuong: number;
    tongTien: number;
    hinhAnh?: string;

    constructor(
        maSach: number,
        tenSach: string,
        giaBan: number,
        soLuong: number,
        hinhAnh?: string
    ) {
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.giaBan = giaBan;
        this.soLuong = soLuong;
        this.tongTien = giaBan * soLuong;
        this.hinhAnh = hinhAnh;
    }
}

export default CartItem;
