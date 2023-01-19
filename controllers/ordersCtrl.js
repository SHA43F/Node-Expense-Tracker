const RazorPay = require("razorpay");
const Orders = require("../modals/orders");
const jwt = require("jsonwebtoken");

function generateAccessToken(id, userName) {
  return jwt.sign({ userId: id, userName: userName }, "secret-key");
}

exports.postOrders = (req, res, next) => {
  try {
    var razor = new RazorPay({
      key_id: "rzp_test_OZYrMhHvVnc7Ll",
      key_secret: "zzor0DTPxnLoYNA1r84t9CAq"
    });
    const amount = 2500;
    razor.orders.create({ amount: amount, currency: "INR" }, (err, order) => {
      if (err) {
        return new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({
          orderId: order.id,
          status: "PENDING"
        })
        .then((response) => {
          return res.status(201).json({ order, key_id: razor.key_id });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
};

exports.updateOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { payment_id, order_id } = req.body;
    console.log("------------------->", payment_id, order_id);
    const order = await Orders.findOne({ where: { orderId: order_id } });
    if (payment_id == null) {
      const promise1 = order.update({ status: "FAILED" });
      const promise2 = req.user.update({ isPremiumUser: false });
      Promise.all([promise1, promise2])
        .then(() => {
          return res.status(407).json({
            // success: false,
            // message: "Transaction Failed",
            token: generateAccessToken(userId, undefined, false)
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      const promise3 = order.update({
        paymentId: payment_id,
        status: "Successful"
      });
      const promise4 = req.user.update({ isPremiumUser: true });
      Promise.all([promise3, promise4])
        .then(() => {
          return res.status(202).json({
            // success: true,
            // message: "Transaction Successful",
            token: generateAccessToken(userId, undefined, true)
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
  }
};
