import React from "react"

// Pagination
interface PhanTrangInterface {
    trangHienTai: number;
    tongSoTrang: number;
    phanTrang: (trang: number) => void;
}

export const PhanTrang: React.FC<PhanTrangInterface> = (props) => {
    const danhSachTrang: number[] = [];

    if (props.trangHienTai === 1) {
        danhSachTrang.push(1);
        if (props.tongSoTrang >= 2) danhSachTrang.push(2);
        if (props.tongSoTrang >= 3) danhSachTrang.push(3);
    } else {
        if (props.trangHienTai - 2 > 0) danhSachTrang.push(props.trangHienTai - 2);
        if (props.trangHienTai - 1 > 0) danhSachTrang.push(props.trangHienTai - 1);

        danhSachTrang.push(props.trangHienTai);

        if (props.trangHienTai + 1 <= props.tongSoTrang)
            danhSachTrang.push(props.trangHienTai + 1);

        if (props.trangHienTai + 2 <= props.tongSoTrang)
            danhSachTrang.push(props.trangHienTai + 2);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">

                <li className="page-item">
                    <button className="page-link"
                        onClick={() => props.phanTrang(1)}>
                        Trang đầu
                    </button>
                </li>

                {danhSachTrang.map(trang => (
                    <li
                        key={trang}
                        className={`page-item ${props.trangHienTai === trang ? "active" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => props.phanTrang(trang)}
                        >
                            {trang}
                        </button>
                    </li>
                ))}

                <li className="page-item">
                    <button className="page-link"
                        onClick={() => props.phanTrang(props.tongSoTrang)}>
                        Trang cuối
                    </button>
                </li>

            </ul>
        </nav>
    );
};
