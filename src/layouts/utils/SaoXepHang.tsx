import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const renderRating = (diem: number) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        // Math.floor(diem) Luôn trả về số nguyên lớn nhất nhưng ≤ number
        if (i <= Math.floor(diem)) {
            // Sao đầy
            stars.push(<StarFill key={i} className="text-warning" />);
        } else if (i === Math.floor(diem) + 1 && diem % 1 !== 0) {
            // Nửa sao
            stars.push(<StarHalf key={i} className="text-warning" />);
        } else {
            // Sao rỗng
            stars.push(<Star key={i} className="text-secondary" />);
        }
    }

    return stars;
};

export default renderRating;
