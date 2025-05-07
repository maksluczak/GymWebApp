const Product = require('../models/Product');
const Gym = require('../models/Gym');

const getProductById = async (req, res) => {
    try {    
        const product = await Product.findById(req.params.id).select({
            name: 1,
            price: 1
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found.' });
        }
        
        res.staus(200).json(product);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        await Gym.findByIdAndUpdate(product.gym, {$push: { products: product._id }} );
        res.status(200).json(product);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(product);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        await Gym.findByIdAndUpdate(result.gym, { $pull: { products: result._id }});
        res.status(201).json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}