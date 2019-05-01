window.addEventListener("load", function(){
  
  (function(){

    var inputs = document.querySelectorAll('.pricing-table input[type="text"]');
    var buttons = document.querySelectorAll('.pricing-table .btn');
    var ticketItems = document.getElementsByClassName("ticket-item");
    var dataPickers = document.querySelectorAll(".ticket-item select");
    var qtyPickers = document.querySelectorAll(".ticket-item .form-control");
    var closeCheckout = document.querySelector(".checkout .closecheckout")
    var buyAllBtn = document.querySelector(".buyall");
    var chkItems = document.querySelector(".checkout-items");
    var ticketsPage = document.querySelector(".tickets");
    var checkoutPage = document.querySelector(".checkout");
    var userName = document.querySelector(".username");
    var userEmail = document.querySelector(".useremail");
    var userPhone = document.querySelector(".userphone");
    var resetBtn = document.querySelectorAll(".reset-order");
    var payBtn = document.querySelector(".pay-btn");
    var checkOrderDiv = document.querySelector(".checkorder");
    var placeOrderDiv = document.querySelector(".placeorder");
    var placeOrderInfoUl = document.querySelector(".placeorderinfo");
    var mailField = document.querySelector(".useremail");
    var dataArr = [];
    var description = "";
    var handshake, total, pf, options;
    
    var jsonData = {
        "checkout": {
            "version": 2.1,
            "test": false,
            "transaction_type": "payment",
            "attempts": 3,
            "settings": {
                "success_url": "http://gameexpo.by/success",
                "decline_url": "http://gameexpo.by/decline",
                "fail_url": "http://gameexpo.by/fail",
                "cancel_url": "http://gameexpo.by/cancel",
                "notification_url": "http://gameexpo.by/",
                "language": "ru",
                "customer_fields" : {
                  "visible" : ["first_name", "last_name"],
                  "read_only" : ["email"]
                }
            },
            "order": {
              "currency": "BYN",
              "amount": 0,
              "description": ""
            },
            "customer": {
              "address": "Nezavisimosti av. 1",
              "country": "BY",
              "phone": "",
              "city": "Minsk",
              "email": "jake@example.com"
            }
        }
    };

    function DataObj(info, price, qty, date, totalPrice, sub){
        this.info = info;
        this.price = price;
        this.qty = qty;
        this.date = date;
        this.totalPrice = totalPrice;
    }

    function createCheckout(arr){
      chkItems.innerHTML = "";
      total = 0;
      arr.map(function(item){
        chkItems.innerHTML += '<li class="list-group-item"><h3 class="list-group-item-heading">' + item.info + '</h3><p class="list-group-item-text">На дату: '+ item.date +'</p><p class="list-group-item-text">Количество: '+ item.qty +'</p><p class="list-group-item-text">Сумма: '+ item.totalPrice +' BYN</p></li>';
        total += (+item.totalPrice);
        description += item.info + " - " + item.qty + " шт. | ";
        // console.log("From createCheckout description", description);
        // console.log("From createCheckout total", total);
      });
      chkItems.innerHTML += '<li class="list-group-item"><h4 class="list-group-item-heading">Итого на сумму: ' + total + ' BYN</h4></li>';
    }

    function resetOrder(){
      dataArr.length = 0;
      chkItems.innerHTML = "";
      description = "";
      checkoutPage.style.display = "";
      ticketsPage.style.display = "";
      placeOrderDiv.style.display = "";
      checkOrderDiv.style.display = "";
      if(document.querySelector(".ui-dialog")){
        document.querySelector(".ui-dialog").remove();
      }
      if(document.getElementById("dialogWindowBeGateway")){
        document.getElementById("dialogWindowBeGateway").remove();
      }
      pf = null;
      options = null;

    }

    resetBtn[0].onclick = resetOrder;

    for (var i = 0; i < dataPickers.length; i++) {
      dataPickers[i].onchange = function(e){
        var dataHolder = e.target.parentNode.parentNode.parentNode;
        dataHolder.setAttribute("data-date", e.target.value);
        //console.log(dataHolder.dataset.date);
      }
    }

    for (var i = 0; i < qtyPickers.length; i++) {
      qtyPickers[i].oninput = function(e){
        var ticketQty = e.target.value;
        var dataHolder = e.target.parentNode.parentNode.parentNode;
        var total = dataHolder.dataset.price * ticketQty;
        var priceTag = e.target.parentNode.nextElementSibling.querySelector(".totalprice");
        priceTag.textContent = total + " BYN";
        dataHolder.setAttribute("data-qty", ticketQty);
        dataHolder.setAttribute("data-totalprice", total);

        //console.log(dataHolder.dataset.qty);
      }
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = function(e){
        e.preventDefault();
        var dataHolder = e.target.parentNode.parentNode.parentNode;
        if(dataHolder.dataset.qty != 0){
          var infoObj = new DataObj(dataHolder.dataset.info, dataHolder.dataset.price, dataHolder.dataset.qty,  dataHolder.dataset.date, dataHolder.dataset.totalprice);
          dataArr.push(infoObj);
          createCheckout(dataArr);
          checkoutPage.style.display = "block";
          ticketsPage.style.display = "none";
          //console.log(dataArr);
        }   
      }  
    }

    buyAllBtn.onclick = function(){
      for(var i = 0; i < ticketItems.length; i++){
        if(ticketItems[i].dataset.qty != 0){
            dataArr.push(new DataObj(ticketItems[i].dataset.info, ticketItems[i].dataset.price, ticketItems[i].dataset.qty,  ticketItems[i].dataset.date, ticketItems[i].dataset.totalprice));
        }     
      }
      createCheckout(dataArr);
      checkoutPage.style.display = "block";
      ticketsPage.style.display = "none";
    }

    payBtn.onclick = function(){
      if(userEmail.value && userName.value && userPhone.value){
        if(userEmail.value.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/) ){
          getToken();
        }
        else {
          alert("Пожалуйста введите корректный адрес email");
        }
      }
      else {
        alert("Пожалуйста, заполните все поля!");
      }
      
    }

    function showCheckout(){
      document.querySelector(".checkorder").style.display = "none";
      document.querySelector(".placeorder").style.display = "block";
      placeOrderInfoUl.innerHTML = '<li class="list-group-item"><p class="list-group-item-text">Контактная информация: ' + jsonData.checkout.customer.email + '</p></li>';
    }

    closeCheckout.addEventListener("click", function(){
      resetOrder();
    });

    for(var i = 0; i < qtyPickers.length; i++){
      qtyPickers[i].addEventListener("focus", function(e){
        if(e.target.value == 0){
          e.target.value = "";
        }
      });
      qtyPickers[i].addEventListener("blur", function(e){
        if(!e.target.value){
          e.target.value = 0;
        }
      });
    }

    

    function getToken(){
          jsonData.checkout.order.amount = total + "00";
          jsonData.checkout.order.description = description;
          jsonData.checkout.customer.email = userEmail.value;
          jsonData.checkout.customer.phone = userPhone.value;
          var req = new XMLHttpRequest();
          req.onload = function(){
              closeCheckout.style.display = "none";
              handshake = JSON.parse(req.response);
              showCheckout();
              buldPayment("https://checkout.bepaid.by/v2/checkout?token=" + handshake.checkout.token);
          }
          req.open("POST", "https://gameexpo.by/getobj.php", true);
          req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          req.responseType = "json";
          req.send("x=" + JSON.stringify(jsonData));
    }

    


    function buldPayment(url){

      if(document.querySelector(".ui-dialog")){
        document.querySelector(".ui-dialog").remove();
      }
      if(document.getElementById("dialogWindowBeGateway")){
        document.getElementById("dialogWindowBeGateway").remove();
      }
      options = {
        type: 'overlay',
        id: 'paybtn',
        url: url,
        style: "",
        size: { width: 320, height: 480 }
      };
      pf = new BeGateway(options);
      pf.buildForm();
    }

  })();

});

  