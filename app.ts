const axios = require('axios');

axios.get("https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&page=1&type_id=34")
    .then(function (response) {
        let responseData = response.data;

        // Sell orders
        let sellOrders = response.data.filter(data => data.is_buy_order === false);
        let largestSellData = sellOrders.filter(x => x.price > 10000);
        let largestSellPrice = largestSellData[0].price;


        // Buy orders
        let buyOrders = responseData.filter(data => data.is_buy_order);
        let smallestBuyData = buyOrders.filter(x => x.price <= 0.01);
        let smallestBuyPrice = smallestBuyData[0].price;


        // Margin
        console.log(`The margin on this item is: ${largestSellPrice - smallestBuyPrice}.`)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });