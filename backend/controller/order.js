const Order = require("../model/order")

exports.getAllOrder = async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).send({message : "Orders Fetched" , data : orders});
    } catch (error) {
        res.status(500).send({message : "error" , error : error});
    }
}

exports.getOrderByUserId = async (req,res)=>{
    const { id } = req.params;
    try {
        const orders = await Order.find({userId : id});
        res.status(200).send({message : "Orders Fetched" , data : orders});
    } catch (error) {
        res.status(500).send({message : "error" , error : error});
    }
}

exports.deleteOrder = async (req,res)=>{
    const id = req.params.id;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).send({message : "Order deleted",data : order});
    } catch (error) {
        console.log(error);
        res.status(500).send({message : "error"})
    }
    
}

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(id);
        // console.log('Order:', order);
        // console.log('Status:', status);
        // console.log('ID:', id);
        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }

        order.status = status;
        order.product = order.product.map(product => ({
            ...product,
            status: status
        }));

        const updatedOrder = await order.save();
        // console.log("updatedOrder: ", updatedOrder);
        res.status(200).send({ message: "Order status updated", data: updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating order status", error: error.message });
    }
};