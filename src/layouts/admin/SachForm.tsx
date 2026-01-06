import React, { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";


const SachForm: React.FC = () => {
    const [sach, setSach] = useState({
        maSach: 0,
        tenSach: '',
        giaBan: 0,
        giaNiemYet: 0,
        isbn: '',
        moTa: '',
        soLuong: 0,
        tenTacGia: '',
        trungBinhXepHang: 0,
    })

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        //Nếu chưa đăng nhập thì không vào được form thêm sách
        const token = localStorage.getItem('token');
        fetch('http://localhost:8081/sach', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(sach)
        }).then((reponse) => {
            if (reponse.ok) {
                alert("Đã thêm sách thành công!");
                setSach({
                    maSach: 0,
                    tenSach: '',
                    giaBan: 0,
                    giaNiemYet: 0,
                    moTa: '',
                    isbn: '',
                    soLuong: 0,
                    tenTacGia: '',
                    trungBinhXepHang: 0,
                })
            } else {
                alert("Gặp lỗi trong quá trình thêm sách!");
            }
        })
    }

    const labelStyle = {
        fontWeight: 600,
        marginBottom: "6px",
        display: "block"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "6px",
        border: "1px solid #ced4da",
        outline: "none"
    };
    return (
        <form className="text-start"
            onSubmit={handleSubmit}
            style={{
                maxWidth: "600px",
                margin: "30px auto",
                padding: "25px",
                background: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
        >
            <h2 className="">Thêm sách</h2>
            {/* Mã sách */}
            <input type="hidden" value={sach.maSach} />

            {/* Tên sách */}
            <label style={{ fontWeight: 600, marginBottom: "6px", display: "block" }}>
                Tên sách
            </label>
            <input
                type="text"
                value={sach.tenSach}
                onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
                required
                style={inputStyle}
            />

            {/* Tên tác giả */}
            <label style={labelStyle}>Tên tác giả</label>
            <input
                type="text"
                value={sach.tenTacGia}
                onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
                required
                style={inputStyle}
            />

            {/* Giá niêm yết */}
            <label style={labelStyle}>Giá niêm yết</label>
            <input
                type="number"
                value={sach.giaNiemYet}
                onChange={(e) => setSach({ ...sach, giaNiemYet: Number(e.target.value) })}
                min={0}
                required
                style={inputStyle}
            />

            {/* Giá bán */}
            <label style={labelStyle}>Giá bán</label>
            <input
                type="number"
                value={sach.giaBan}
                onChange={(e) => setSach({ ...sach, giaBan: Number(e.target.value) })}
                min={0}
                required
                style={inputStyle}
            />

            {/* Số lượng */}
            <label style={labelStyle}>Số lượng</label>
            <input
                type="number"
                value={sach.soLuong}
                onChange={(e) => setSach({ ...sach, soLuong: Number(e.target.value) })}
                min={0}
                required
                style={inputStyle}
            />

            {/* Mô tả */}
            <label style={labelStyle}>Mô tả</label>
            <textarea
                rows={4}
                value={sach.moTa}
                onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
                style={{
                    ...inputStyle,
                    resize: "none"
                }}
            />

            {/* Trung bình xếp hạng */}
            <label style={labelStyle}>Trung bình xếp hạng</label>
            <input
                type="number"
                value={sach.trungBinhXepHang}
                disabled
                style={{
                    ...inputStyle,
                    backgroundColor: "#e9ecef",
                    cursor: "not-allowed"
                }}
            />

            {/* ISBN */}
            <label style={labelStyle}>ISBN</label>
            <input
                type="text"
                value={sach.isbn}
                onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
                placeholder="978-604-123-456-7"
                required
                style={inputStyle}
            />

            <button
                type="submit"
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "15px",
                    fontSize: "16px",
                    fontWeight: 600,
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#0d6efd",
                    color: "#fff",
                    cursor: "pointer"
                }}
            >
                Lưu sách
            </button>
        </form>


    )
}

const SachForm_Admin = RequireAdmin(SachForm);
export default SachForm_Admin;