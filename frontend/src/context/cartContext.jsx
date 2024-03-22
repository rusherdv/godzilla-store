import React, { createContext, useState, useContext, useEffect } from 'react'
import { showNotification } from '../helpers/showNotification'
import { useTranslation } from 'react-i18next';
const CartContext = createContext('')
export const useCartContext = () => useContext(CartContext)

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        const cartExist = JSON.parse(localStorage.getItem('cart'));
    
        if (!cartExist || cartExist.length === 0) {
            return
        } else {
            setCart(cartExist);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addProduct = async (item, quantity) => {
        const existe = await isInCart(item.id);
    
        if (existe) {
            if (item.type === 'pack' || item.type === 'battlepass' || item.type === 'shop') {
                showNotification(t('nomore'), 'error');
                return;
            }
    
            setCart(cart.map(product => {
                return product.id === item.id ? { ...product, quantity: product.quantity + quantity } : product;
            }));
    
            showNotification(t('addedcart'), 'success');
        } else {
            setCart([...cart, { ...item, quantity }]);
            showNotification(t('addedcart'), 'success');
        }
    };

    const addProductCart = async (item, quantity) => {
        setCart(cart.map(product => {
            return product.id === item.id ? { ...product, quantity: product.quantity + quantity } : product;
        }));
    };

    const getMethod = () => cart.some(e => e.method === 'full');

    const cleanCart = () => setCart([]);

    const isInCart = (id) => cart.find(product => product.id === id) ? true : false;

    const removeProduct = (id) => setCart(cart.filter(product => product.id !== id));
  
    const showCart = () => console.log(cart)

    const getTotalCart = () => {return cart.reduce((total, product) => total + product.quantity, 0)};

    const getTotalPay = (typePrice) => {
        return cart.reduce((total, product) => {
          const productPrice = typePrice === 'priceARS' ? product.priceARS : product.priceUSD;
          return total + productPrice * product.quantity;
        }, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            cleanCart,
            isInCart,
            removeProduct,
            addProduct,
            addProductCart,
            showCart,
            getTotalCart,
            getTotalPay,
            getMethod
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider