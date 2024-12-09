import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'

// Custom hook para manejar el carrito de compras
export const useCart = () => {
    // Inicializa el carrito con datos almacenados en localStorage, si existen
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart') // Obtiene el carrito de localStorage
        return localStorageCart ? JSON.parse(localStorageCart) : [] // Si no hay datos, devuelve un array vacío
    }

    const [data] = useState(db) // Datos de los productos (se asume que provienen de un archivo 'db')
    const [cart, setCart] = useState(initialCart) // Estado para el carrito de compras

    // Constantes para restringir el número de productos por ítem en el carrito
    const MIN_ITEMS = 1 // Cantidad mínima de un producto
    const MAX_ITEMS = 5 // Cantidad máxima de un producto

    // Guarda automáticamente el estado del carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]) // Se ejecuta siempre que `cart` cambie

    // Añade un producto al carrito
    function addToCart(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id) // Busca si el producto ya está en el carrito
        if (itemExists >= 0) { // Si ya existe en el carrito
            if (cart[itemExists].quantity >= MAX_ITEMS) return // No hace nada si ya alcanzó el máximo
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++ // Incrementa la cantidad
            setCart(updatedCart)
        } else {
            item.quantity = 1 // Si no existe, inicializa con cantidad 1
            setCart([...cart, item]) // Añade el producto al carrito
        }
    }

    // Elimina un producto del carrito por su ID
    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) // Filtra los productos y elimina el indicado
    }

    // Disminuye la cantidad de un producto en el carrito
    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) { // Solo disminuye si la cantidad es mayor al mínimo
                return {
                    ...item,
                    quantity: item.quantity - 1 // Decrementa la cantidad
                }
            }
            return item // Retorna el producto sin cambios si no cumple las condiciones
        })
        setCart(updatedCart)
    }

    // Incrementa la cantidad de un producto en el carrito
    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) { // Solo incrementa si la cantidad es menor al máximo
                return {
                    ...item,
                    quantity: item.quantity + 1 // Incrementa la cantidad
                }
            }
            return item // Retorna el producto sin cambios si no cumple las condiciones
        })
        setCart(updatedCart)
    }

    // Vacía completamente el carrito
    function clearCart(e) {
        setCart([]) // Limpia el estado del carrito
    }

    // **State Derivado**: Verifica si el carrito está vacío
    const isEmpty = useMemo(() => cart.length === 0, [cart]) // Se recalcula solo si `cart` cambia

    // **State Derivado**: Calcula el total a pagar
    const cartTotal = useMemo(() => 
        cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]
    )

    // Retorna el estado y las funciones del hook
    return {
        data, // Productos disponibles
        cart, // Estado del carrito
        addToCart, // Función para añadir productos
        removeFromCart, // Función para eliminar productos
        decreaseQuantity, // Función para disminuir la cantidad
        increaseQuantity, // Función para aumentar la cantidad
        clearCart, // Función para vaciar el carrito
        isEmpty, // Estado derivado: si el carrito está vacío
        cartTotal // Estado derivado: total del carrito
    }
}
