const express = require("express");
const { getAllUsers  , updateUser , deleteUser , login , signup} = require("../controller/user");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/getAllUsers",getAllUsers);  
router.put("/updateUser/:id",updateUser);
router.delete("/deleteUser/:id",deleteUser);
router.post("/signup", upload.single("userImage") ,signup)
router.post("/login",login);

module.exports = router;