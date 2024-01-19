const mongoose = require("mongoose");
const product = require("../models/product");

const transactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const month = req.query.month || "";

    let transactions = await product
      .find({})
      .skip(page * limit)
      .limit(limit);

    // If month is not present, calculate total sold and unsold counts
    if (!month && !search) {
      const soldCount = await product.countDocuments({ sold: true });
      const unSoldCount = await product.countDocuments({ sold: false });
      transactions = await product.find({});

      const response = {
        error: false,
        soldCount,
        unSoldCount,
        page: page + 1,
        limit,
        transactions,
      };

      res.status(200).json(response);
    } else if (!month && search) {
      transactions = await product
        .find({
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        })
        .skip(page * limit)
        .limit(limit);

      const soldCount = await product.countDocuments({
        sold: true,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      });
      const unSoldCount = await product.countDocuments({
        sold: false,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      });

      const response = {
        error: false,
        soldCount,
        unSoldCount,
        page: page + 1,
        limit,
        transactions,
      };

      res.status(200).json(response);
    } else if (month && !search) {
      transactions = await product
        .find({ month: { $regex: month, $options: "i" } })
        .skip(page * limit)
        .limit(limit);
      const soldCount = await product.countDocuments({
        sold: true,
        month: { $regex: month, $options: "i" },
      });
      const unSoldCount = await product.countDocuments({
        sold: false,
        month: { $regex: month, $options: "i" },
      });
      const response = {
        error: false,
        soldCount,
        unSoldCount,
        page: page + 1,
        limit,
        transactions,
      };

      res.status(200).json(response);
    } else {
      transactions = await product
  .find(
    {
      month: { $regex: month, $options: "i" },
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    }
  )
  .skip(page * limit)
  .limit(limit);
      const soldCount = await product.countDocuments({
        sold: true,
        month: { $regex: month, $options: "i" },
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
      });
      const unSoldCount = await product.countDocuments({
        sold: false,
        month: { $regex: month, $options: "i" },
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
      });
      const response = {
        error: false,
        soldCount,
        unSoldCount,
        page: page + 1,
        limit,
        transactions,
      };

      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = transactions;

