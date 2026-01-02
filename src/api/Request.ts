export async function my_request(duongDan: string) {
    // Một endpoint để lấy data từ BE
    const response = await fetch(duongDan);
    // Nếu bị trả về lỗi
    if (!response.ok) {
        throw new Error(`Không thể truy cập ${duongDan}`);
    }
    return response.json();
}
