import Checkout from "../product/Checkout";
import { getCart, clearCart as clearCartStorage } from "../product/cart/CartSevice";

const CheckoutPage = () => {
    const cartItems = getCart();

    const handleClearCart = () => {
        clearCartStorage();
    };

    return <Checkout cartItems={cartItems} clearCart={handleClearCart} />;
};

export default CheckoutPage;
