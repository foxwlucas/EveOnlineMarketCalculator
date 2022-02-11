var axios = require('axios');
axios.get("https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&page=1&type_id=34")
    .then(function (response) {
    var responseData = response.data;
    // Sell orders
    var sellOrders = response.data.filter(function (data) { return data.is_buy_order === false; });
    var largestSellData = sellOrders.filter(function (x) { return x.price > 10000; });
    var largestSellPrice = largestSellData[0].price;
    // Buy orders
    var buyOrders = responseData.filter(function (data) { return data.is_buy_order; });
    var smallestBuyData = buyOrders.filter(function (x) { return x.price <= 0.01; });
    var smallestBuyPrice = smallestBuyData[0].price;
    // Margin
    console.log("The margin on this item is: ".concat(largestSellPrice - smallestBuyPrice, "."));
})["catch"](function (error) {
    // handle error
    console.log(error);
})
    .then(function () {
    // always executed
});
