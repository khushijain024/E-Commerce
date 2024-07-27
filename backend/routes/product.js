const express = require("express");
const upload = require("../middleware/multer");
const productController = require("../controller/product");


const router = express.Router();

router.get("/getAllProducts",productController.getAllProduct);
router.get("/getProductById/:id",productController.getProductById);
router.post("/createProduct",upload.single("productImage"),productController.createProduct);
router.put("/updateProduct/:id", upload.single('productImage'), productController.updateProduct);
router.delete("/deleteProduct/:id",productController.deleteProduct);


module.exports = router;