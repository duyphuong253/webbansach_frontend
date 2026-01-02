class HinhAnhModel {
    maHinhAnh: number;
    tenHinhAnh?: string;
    icon?: boolean;
    duongDan?: string;
    duLieuAnh?: string;

    constructor(
        maHinhAnh: number,
        tenHinhAnh: string,
        icon: boolean,
        duongDan: string,
        duLieuAnh: string,
    ) {
        this.maHinhAnh = maHinhAnh,
            this.tenHinhAnh = tenHinhAnh,
            this.icon = icon,
            this.duongDan = duongDan,
            this.duLieuAnh = duLieuAnh;
    }
}
export default HinhAnhModel;