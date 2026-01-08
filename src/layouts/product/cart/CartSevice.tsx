import CartItem from "../../../models/CartItem";

// key trong localStorage
const CART_KEY_PREFIX = "cart_";

// Sự kiện thông báo navbar
const dispatchCartEvent = () => {
    window.dispatchEvent(new Event("cartUpdated"));
};

// Lấy email user hiện tại (hoặc 'guest' nếu chưa login)
const getCurrentUserEmail = (): string => {
    const token = localStorage.getItem("token"); // JWT hoặc email lưu khi login
    if (!token) return "guest"; // guest cart cho user chưa login
    // nếu token chứa email, decode hoặc lưu email trực tiếp
    return localStorage.getItem("userEmail") || "guest";
};

// Lấy cart cho user hiện tại
export const getCart = (): CartItem[] => {
    const email = getCurrentUserEmail();
    return JSON.parse(localStorage.getItem(CART_KEY_PREFIX + email) || "[]");
};

// Lưu cart cho user hiện tại
export const saveCart = (cart: CartItem[]) => {
    const email = getCurrentUserEmail();
    localStorage.setItem(CART_KEY_PREFIX + email, JSON.stringify(cart));
    dispatchCartEvent();
};

// Thêm item vào cart
export const addToCart = (item: CartItem) => {
    const cart = getCart();
    const index = cart.findIndex(i => i.maSach === item.maSach);

    if (index >= 0) {
        cart[index].soLuong += item.soLuong;
        cart[index].tongTien = cart[index].soLuong * cart[index].giaBan;
    } else {
        cart.push(item);
    }

    saveCart(cart);
};

// Cập nhật số lượng
export const updateQuantity = (maSach: number, soLuong: number) => {
    const cart = getCart();
    cart.forEach(item => {
        if (item.maSach === maSach) {
            item.soLuong = soLuong;
            item.tongTien = item.giaBan * soLuong;
        }
    });
    saveCart(cart);
};

// Xóa item
export const removeFromCart = (maSach: number) => {
    const cart = getCart().filter(item => item.maSach !== maSach);
    saveCart(cart);
};

// Xóa hết cart
export const clearCart = () => {
    const email = getCurrentUserEmail();
    localStorage.removeItem(CART_KEY_PREFIX + email);
    window.dispatchEvent(new Event("cartUpdated"));
};

// Tổng tiền & tổng số lượng
export const getTotalMoney = (): number => {
    return getCart().reduce((sum, item) => sum + item.tongTien, 0);
};

export const getTotalItems = (): number => {
    return getCart().reduce((sum, item) => sum + item.soLuong, 0);
};

// Khi login
export const loginUser = (email: string, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email);

    // Nếu guest có cart, merge vào cart của user
    const guestCart = JSON.parse(localStorage.getItem(CART_KEY_PREFIX + "guest") || "[]");
    const userCart = JSON.parse(localStorage.getItem(CART_KEY_PREFIX + email) || "[]");

    const mergedCart = [...userCart];

    guestCart.forEach((item: CartItem) => {
        const idx = mergedCart.findIndex(i => i.maSach === item.maSach);
        if (idx >= 0) {
            mergedCart[idx].soLuong += item.soLuong;
            mergedCart[idx].tongTien = mergedCart[idx].soLuong * mergedCart[idx].giaBan;
        } else {
            mergedCart.push(item);
        }
    });

    localStorage.setItem(CART_KEY_PREFIX + email, JSON.stringify(mergedCart));
    localStorage.removeItem(CART_KEY_PREFIX + "guest"); // xóa cart guest
    dispatchCartEvent();
};

// Khi logout
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    dispatchCartEvent(); // navbar tự reset về 0
};
