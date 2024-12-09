export default function Header({ cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal }) {
    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(guitar => (
                                                    <tr key={guitar.id}>
                                                        <td>
                                                            <img
                                                                className="img-fluid"
                                                                src={`/img/${guitar.image}.jpg`}
                                                                alt="imagen guitarra"
                                                            />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td className="fw-bold">
                                                            ${guitar.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(guitar.id)}
                                                            >
                                                                -
                                                            </button>
                                                            {guitar.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(guitar.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(guitar.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                    </>
                                )}
                                {!isEmpty && (
                                    <button
                                        className="btn btn-dark w-100 mt-3 p-2" // Estilo para el botón de pago
                                        onClick={() => {
                                            // Crear la URL de PayPal con los parámetros necesarios
                                            const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=Compra%20de%20guitarras&amount=${cartTotal}&currency_code=USD&return=http://www.tusitio.com/compra-completada&cancel_return=http://www.tusitio.com/cancelar-compra`;

                                            // Abrir PayPal en una nueva ventana o pestaña
                                            window.open(paypalUrl, '_blank'); // '_blank' abre en una nueva pestaña
                                        }}
                                    >
                                        PAGAR
                                    </button>
                                )}

                                {!isEmpty && (
                                    <button
                                        className="btn btn-dark w-100 mt-3 p-2"
                                        onClick={clearCart}
                                    >
                                        Vaciar Carrito
                                    </button>
                                )}

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
