const Product = require('../models/product');

const barChartsInfo = async (req, res) => {
  try {
    const { month } = req.query;

    const matchStage = month ? { month: { $regex: month, $options: 'i' } } : {};

    const result = await Product.aggregate([
      {
        $match: matchStage,
      },
      {
        $facet: {
          ranges: [
            {
              $group: {
                _id: {
                  $switch: {
                    branches: [
                      { case: { $lte: ['$price', 100] }, then: '0-100' },
                      { case: { $lte: ['$price', 200] }, then: '101-200' },
                      { case: { $lte: ['$price', 300] }, then: '201-300' },
                      { case: { $lte: ['$price', 400] }, then: '301-400' },
                      { case: { $lte: ['$price', 500] }, then: '401-500' },
                      { case: { $lte: ['$price', 600] }, then: '501-600' },
                      { case: { $lte: ['$price', 700] }, then: '601-700' },
                      { case: { $lte: ['$price', 800] }, then: '701-800' },
                      { case: { $lte: ['$price', 900] }, then: '801-900' },
                      { case: { $gte: ['$price', 901] }, then: '901-above' },
                    ],
                    default: 'Unknown',
                  },
                },
                count: { $sum: 1 },
              },
            },
          ],
          totalCount: [
            {
              $group: {
                _id: null,
                total: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $project: {
          ranges: {
            $concatArrays: [
              '$ranges',
              {
                $map: {
                  input: {
                    $setDifference: [
                      [
                        '0-100',
                        '101-200',
                        '201-300',
                        '301-400',
                        '401-500',
                        '501-600',
                        '601-700',
                        '701-800',
                        '801-900',
                        '901-above',
                      ],
                      '$ranges._id',
                    ],
                  },
                  as: 'range',
                  in: { _id: '$$range', count: 0 },
                },
              },
            ],
          },
          totalCount: '$totalCount',
        },
      },
      {
        $unwind: '$ranges',
      },
      {
        $replaceRoot: { newRoot: '$ranges' },
      },
    ]);

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = barChartsInfo;
