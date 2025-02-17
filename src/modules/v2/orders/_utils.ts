export const aggregateFilter = [
    {
        $lookup: {
            from: "products",
            localField: "products.productId",
            foreignField: "_id",
            as: "orderProducts",
            pipeline: [{ $project: { _id: 1, label: '$tamilName', value: '$_id', prodcutName :1 } }]
        },
    },
    {
        $unwind: "$orderProducts"
    },
    {
        $project: {
            _id: 1,
            orderId: 1,
            customerName: 1,
            customerAddress: 1,
            createdDate : 1,
            total: 1,
            products: {
                units: 1,
                price: 1,
                quantity: { $arrayElemAt: ["$products.quantity", 0] },
                quantitylabel: {
                    $concat: [{ $toString: { $arrayElemAt: ["$products.quantity", 0] } }, " ", { $toString: { $arrayElemAt: ["$products.units", 0] } }]
                },
                subTotal: 1,
                productId: "$orderProducts"
            },
            deletedAt: 1,
            createdAt: 1
        }
    }]