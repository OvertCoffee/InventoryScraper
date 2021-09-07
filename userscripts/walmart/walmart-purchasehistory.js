// ==UserScript==
// @name        New script - walmart.com
// @namespace   Violentmonkey Scripts
// @match       https://www.walmart.com/account/wmpurchasehistory
// @grant       none
// @version     1.0
// @author      -
// @description 9/2/2021, 1:31:26 PM
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 
// ==/UserScript==

// // Doesn't seem to be useful.
// this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function() {
    let ordersList = $(".orders-list").children("li");
    // alert(`Found ${ordersList.length} orders.`);
    
    let firstOrder = ordersList[0] ?? { foo: "Bar"};
    
    let firstOrderDate = $(firstOrder).find("span[data-automation-id='order-date']").text();
    let firstOrderPrice = $(firstOrder).find("span")
    
    let orderData = getOrderData(firstOrder);
    
    for (var prop in orderData) {
      if (orderData.hasOwnProperty(prop)) {
        if (prop === 'orderDate') 
          console.log(`orderData[${prop}]: ${orderData[prop].toLocaleDateString('en-US')}`);
        else if (prop === 'items')
          printItems(orderData[prop]);
        else 
          console.log(`orderData[${prop}]: ${orderData[prop]}`);
      }
    }
    
  });
  
  function getOrderData(order) {
    let strDate = $(order).find("[data-automation-id='order-date']").text();
    let orderTotal = $(order).find("[data-automation-id='order-total']").text().slice(1);
    let orderDate = new Date(Date.parse(strDate));
    let items = getItems(order);
    
    return {
      "strDate": strDate,
      "orderTotal": orderTotal,
      "orderDate": orderDate,
      "items": items
    }
  }
  
  function getItems(order) {
    let fin = new Array();
    
    let items = $(order).find("div.product-block-info");
    for (var item in items) {
      fin.push(getItemData(item));
    }
    
    return fin;      
  }
  
  function getItemData(item) {
    
    // console.log(item);
    
    let name = $(item).find("div.LinesEllipsis").text();
    let priceBlock = $(item).first("div.order-info-price-v2");
    let strDollars = $(priceBlock).find("span.price-characteristic").text();
    let strCents = $(priceBlock).find("span.price-mantissa").text();
    let dollars = parseInt(strDollars) || -1;
    let cents = parseInt(strCents) || -1;
    let price = dollars + cents;
    let qty = -1; //TODO - always 1?
    
    return {
      "name": name,
      "price": price,
      "qty": qty
    }
    
  }
  
  function printItems(items) {
    /*
    items.forEach(item => {
      for(var prop in item) {
        console.log(`item[${prop}]: ${item[prop]}`);
      }
    })
    */
    console.log(`items.length: ${items.length}`)
  }