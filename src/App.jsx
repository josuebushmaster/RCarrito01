import Guitar from "./components/Guitar" // Componente que representa una guitarra individual
import Header from "./components/Header" // Componente que contiene la cabecera con el carrito de compras
import { useCart } from './hooks/useCart' // Hook personalizado para manejar la lógica del carrito

function App() {
  // Desestructuración de valores y funciones proporcionadas por el hook `useCart`
  const { 
    data, // Lista de productos disponibles
    cart, // Estado actual del carrito
    addToCart, // Función para añadir un producto al carrito
    removeFromCart, // Función para eliminar un producto del carrito
    decreaseQuantity, // Función para disminuir la cantidad de un producto
    increaseQuantity, // Función para aumentar la cantidad de un producto
    clearCart, // Función para vaciar el carrito
    isEmpty, // Estado derivado que indica si el carrito está vacío
    cartTotal // Total del carrito
  } = useCart()

  return (
    <>
      {/* Cabecera del sitio web con el componente Header */}
      <Header 
        cart={cart} // Pasa el estado del carrito
        removeFromCart={removeFromCart} // Pasa la función para eliminar productos
        decreaseQuantity={decreaseQuantity} // Pasa la función para disminuir la cantidad
        increaseQuantity={increaseQuantity} // Pasa la función para aumentar la cantidad
        clearCart={clearCart} // Pasa la función para vaciar el carrito
        isEmpty={isEmpty} // Indica si el carrito está vacío
        cartTotal={cartTotal} // Pasa el total del carrito
      />
      
      {/* Contenido principal del sitio */}
      <main className="container-xl mt-5">
          {/* Título de la sección */}
          <h2 className="text-center">Nuestra Colección</h2>

          {/* Lista de guitarras */}
          <div className="row mt-5">
              {data.map((guitar) => (
                  <Guitar 
                    key={guitar.id} // Clave única para cada componente Guitar
                    guitar={guitar} // Pasa los datos de la guitarra actual
                    addToCart={addToCart} // Pasa la función para añadir al carrito
                  />
              ))}
          </div>
      </main>

      {/* Pie de página del sitio */}
      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              {/* Mensaje de derechos reservados */}
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados por Josue Pastil</p>
          </div>
      </footer>
    </>
  )
}

export default App
