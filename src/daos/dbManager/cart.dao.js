import { cartModel } from "../../models/cart.model.js";
import { productModel } from "../../models/product.model.js";

class cartDao {
    async findCarts() {
        return await cartModel.find();
    }

    async createCart(cart) {
        return await cartModel.create(cart);
    }

    async updateCart(_id, cart) {
        return await cartModel.findByIdAndUpdate({ _id }, cart);
    }

    async deleteCart(_id) {
        return await cartModel.findByIdAndDelete({ _id });
    }

    // Funcionalidad para añadir un producto al carrito
    async addProductCart (cartId, productId) {
        try {
            // Verificar si el carrito existe
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            // Verificar si el producto existe
            const product = await productModel.findById(productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }

            // Verificar si el producto ya está en el carrito
            const existingProduct = cart.products.find(p => p._id.equals(productId));

            if (existingProduct) {
                // Si el producto ya está en el carrito, incrementa la cantidad
                existingProduct.quantity += 1;
            } else {
                // Si el producto no está en el carrito, añádelo con cantidad 1
                cart.products.push({
                    _id: productId,
                    quantity: 1
                });
            }

            // Guardar el carrito actualizado
            await cart.save();

            return 'Se añadió el producto al carrito';
        } catch (error) {
            throw error;
        }
    };
}

export default new cartDao();