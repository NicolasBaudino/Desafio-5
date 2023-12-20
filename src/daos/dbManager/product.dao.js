import { productModel } from "../../models/product.model.js";

class productDao {
    async findProducts() {
        return await productModel.find();
    }

    async createProducts(product) {
        return await productModel.create(product);
    }

    async updateProducts(_id, product) {
        return await productModel.findOneAndUpdate({ _id }, product)
    }

    async deleteProducts(_id) {
        return await productModel.findByIdAndDelete({ _id });
    }
}

export default new productDao();