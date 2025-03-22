const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">🛒 Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 mt-4">Keranjang masih kosong!</p>
      ) : (
        <div className="mt-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p>Rp {item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                ❌ Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
