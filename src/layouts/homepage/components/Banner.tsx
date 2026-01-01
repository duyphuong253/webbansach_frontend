import React from "react";

function Banner() {
    return (
        <div className="p-2 mb-2 bg-dark">
            <div className="container-fluid py-4 text-white d-flex justify-content-center align-items-center text-center">
                <div>
                    <h4 className="display-5 fw-bold">
                        “Đọc sách chính là hộ chiếu cho vô số cuộc phiêu lưu”
                    </h4>
                    <p className="mb-4">Mary Pope Osborne</p>

                    <button className="btn btn-primary btn-lg text-white">
                        Khám phá sách tại DyFun.vn
                    </button>
                </div>
            </div>
        </div>

    );
}
export default Banner;