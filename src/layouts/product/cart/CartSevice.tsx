import CartItem from "../../../models/CartItem";

const CART_KEY = "cart";

export const getCart = (): CartItem[] => {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

export const saveCart = (cart: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (item: CartItem) => {
    const cart = getCart();
    const index = cart.findIndex(i => i.maSach === item.maSach);

    if (index >= 0) {
        cart[index].soLuong += item.soLuong;
        cart[index].tongTien =
            cart[index].soLuong * cart[index].giaBan;
    } else {
        cart.push(item);
    }

    saveCart(cart);
};

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

export const removeFromCart = (maSach: number) => {
    const cart = getCart().filter(item => item.maSach !== maSach);
    saveCart(cart);
};

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
};

export const getTotalMoney = (): number => {
    return getCart().reduce((sum, item) => sum + item.tongTien, 0);
};
