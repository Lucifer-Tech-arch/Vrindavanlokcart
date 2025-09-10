import User from "../models/usermodel.js";

// add products to user cart
const addtocart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // find user
        const userdata = await User.findById(userId);
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        // get cart object from user (initialize if not exists)
        let cartdata = userdata.cartdata || {};

        // check if item already exists in cart
        if (cartdata[itemId]) {
            cartdata[itemId] += 1;   // increment quantity
        } else {
            cartdata[itemId] = 1;    // add new item
        }

        // update user cart in DB
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { cartdata },       // overwrite cart with updated object
            { new: true }       // return updated document
        );

        res.status(200).json({
            message: "Item added to cart",
            cart: updatedUser.cartdata,
        });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success:false, message: error.message });
    }
};


//update user cart
const updatecart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;

        if (!userId || !itemId || quantity == null) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        if (quantity < 0) {
            return res.status(400).json({ success: false, message: "Quantity cannot be negative" });
        }

        if (quantity === 0) {
            // ✅ Proper way to delete the field
            await User.findByIdAndUpdate(
                userId,
                { $unset: { [`cartdata.${itemId}`]: 1 } }, // value can be 1 or "" → removes key
                { new: true }
            );
        } else {
            await User.findByIdAndUpdate(
                userId,
                { $set: { [`cartdata.${itemId}`]: quantity } },
                { new: true }
            );
        }

        return res.status(200).json({
            success: true,
            message: quantity === 0 ? "Item removed from cart" : "Cart updated successfully"
        });
    } catch (error) {
        console.error("Update cart error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

//get user cart data
const getusercart = async (req, res) => {
   try {
     let {userId} = req.body;
     const userdata = await User.findById(userId);
     let cartdata = userdata.cartdata;

     res.json({success: true, cartdata})
   } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message});
   }
}

export { addtocart, updatecart, getusercart };