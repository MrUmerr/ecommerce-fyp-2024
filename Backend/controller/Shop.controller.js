import Shop from "../model/shop_model.js";

export const getShop=async(req,res)=>{
        try {
            const shop= await Shop.find();
            // console.log(shop)
            res.status(200).json(shop);
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json(error);
        }
    }


// Add a new product
export const addShop = async (req, res) => {
    const { Name, Price, Category, Img, Description, Oldprice, Percentoff } = req.body;

    try {
        const newProduct = new Shop({ Name, Price, Category, Img, Description, Oldprice, Percentoff });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error adding product: ", error });
    }
};

// Update an existing product
export const updateShop = async (req, res) => {
    const { id } = req.params;
    const { Name, Price, Category, Img, Description, Oldprice, Percentoff } = req.body;

    try {
        const updatedProduct = await Shop.findByIdAndUpdate(id, {
            Name,
            Price,
            Category,
            Img,
            Description,
            Oldprice,
            Percentoff
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product: ", error });
    }
};

// Delete a product
export const deleteShop = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Shop.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product: ", error });
    }
    
};

// Get all products or apply filters
export const getShops = async (req, res) => {
    try {
        const filter = {};

        // Apply category filter
        if (req.query.Category) {
            filter.Category = req.query.Category;
        }

        // Apply name filter (case-insensitive, partial match)
        if (req.query.Name) {
            filter.Name = { $regex: req.query.Name, $options: "i" };
        }

        // Apply price range filter
        if (req.query.minPrice && req.query.maxPrice) {
            filter.Price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
        } else if (req.query.minPrice) {
            filter.Price = { $gte: req.query.minPrice };
        } else if (req.query.maxPrice) {
            filter.Price = { $lte: req.query.maxPrice };
        }

        const shop = await Shop.find(filter);
        res.status(200).json(shop);
    } catch (error) {
        console.error("Error fetching products: ", error);
        res.status(500).json({ message: "Error fetching products", error });
    }
};





