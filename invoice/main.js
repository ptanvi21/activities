
$('#addRow').click(function () {
    addItem();
});
$('#items_table').on('keyup', '.update', function () {
    var key = event.keyCode || event.charCode; // when del or backspace hit,do nothing
    calculateTotals();
});
$('#taxPercentage').change(function () {
    calculateTotals(); // tax percentage
});

function calculateTotals(){
    // get all of the various input typs from the rows 
    // each will be any array of elements
    var nameElements = $('.row-name');
    var quantityElements = $('.row-quantity');
    var taxElements = $('.row-tax');
    var priceElements = $('.row-price');
    var totalElements = $('.row-total');
    
    // get the bottom table elements
    var taxPercentageElement =$('#taxPercentage');
    var subTotalElement =$('#subTotal');
    var totalTaxElement =$('#totalTax');
    var grandTotalElement =$('#grandTotal');
    var allTotalElement = $('#allSum');

    var subTotal=0;
    var taxTotal=0;
    var grandTotal=0;
    var allTotal=0;

    $(quantityElements).each(function(i,e){
        
        // get all the elements for the current row
        var nameElement = $('.row-name:eq(' + i + ')');
        var quantityElement = $('.row-quantity:eq(' + i + ')');
        var taxElement = $('.row-tax:eq(' + i + ')');
        var priceElement = $('.row-price:eq(' + i + ')');
        var totalElement = $('.row-total:eq(' + i + ')');

        // get the needed values from this row
        var qty = quantityElement.val().trim().replace(/[^0-9$.,]/g, ''); // filter out non digits like letters
            qty = qty == '' ? 0 : qty; // if blank default to 0
            quantityElement.val(qty); // set the value back, in case we had to remove soemthing
        var price = priceElement.val().trim().replace(/[^0-9$.,]/g, '');
            price = price == '' ? 0 : price; // if blank default to 0
            priceElement.val(price); // set the value back, in case we had to remove soemthing
    
        // get/set row tax and total
        // also add to our totals for later
        var rowPrice = (price * 1000) * qty
            subTotal = subTotal + rowPrice;
        var tax = (taxPercentageElement.val() * rowPrice)/100;
            taxElement.val((tax / 1000).toFixed(2));
            taxTotal = taxTotal + tax;
        var total =   rowPrice
            totalElement.val((total / 1000).toFixed(2));
            grandTotal = grandTotal + total + tax;
            allTotal = allTotal + total + tax;

    });
    
    // set the bottom table values
    subTotalElement.val((subTotal / 1000).toFixed(2));   
    totalTaxElement.val((taxTotal / 1000).toFixed(2));  
    grandTotalElement.val((grandTotal / 1000).toFixed(2)); 
    allTotalElement.val((allTotal / 1000).toFixed(2));  
}
function addItem() {
    var itemRow =
        '<tr id="item" class="rowss">' +
        '<td><input type="text" class="form-control row-name" placeholder="Items you are selling" /></td>' +
        '<td><button id="clone" class="btn btn-light copy-button"><i class="fa-solid fa-copy" ></i></button></td>' +
        '<td><button id="removerow" class="btn btn-light removeitem-button"><i class="fa-solid fa-trash"></i></button></td>' +
        '<td><input type="text" class="form-control update row-quantity float-right" placeholder="100" /></td>' +
        '<td><input type="text" class="form-control update row-price float-right" placeholder="10.00" /></td>' +
        '<td><input type="text"  class="form-control border-right text-left currname" placeholder="INR"></td>'+
        '<td><input type="text" id="dollar" class="form-control row-total float-right" placeholder="1100.00" /></td>' +
        '</tr>';
    $("#items_table").append(itemRow);
}
addItem(); //call function on load to add the first item

// CLONE
$(document).on('click', '.copy-button', function(){
    var rawHTML = $(this).parents('tr').clone().insertAfter($(this).parents('tr'));
    calculateTotals();
})

// REMOVE
$(document).on('click', '.removeitem-button', function(){
    $(this).closest('tr').remove();
    calculateTotals();
})

$("#currency").on("change",function(){
    //Getting Value
    var selValue = $("#currency :selected").val();
    //Setting Value
    $("#textFieldTextJQ").val(selValue);
    $("#textFieldTextJQQ").val(selValue);
    $("#textFieldTextJQR").val(selValue);
    $(".currname").val(selValue);
    $("#totalcurr").val(selValue);

});

// CURRENCY CHANGE

function calculateCurrencyChange(){
    // get all of the various input typs from the rows 
    // each will be any array of elements
    
    var quantityElements = $('.row-quantity');
    var taxElements = $('.row-tax');
    var priceElements = $('.row-price');
    var totalElements = $('.row-total');
    
    // get the bottom table elements
    var taxPercentageElement =$('#taxPercentage');
    var subTotalElement =$('#subTotal');
    var totalTaxElement =$('#totalTax');
    var grandTotalElement =$('#grandTotal');
    var allTotalElement = $('#allSum');

    var subTotal=0;
    var taxTotal=0;
    var grandTotal=0;
    var allTotal=0;

    $(quantityElements).each(function(i,e){
        
        // get all the elements for the current row
        var nameElement = $('.row-name:eq(' + i + ')');
        var quantityElement = $('.row-quantity:eq(' + i + ')');
        var taxElement = $('.row-tax:eq(' + i + ')');
        var priceElement = $('.row-price:eq(' + i + ')');
        var totalElement = $('.row-total:eq(' + i + ')');

        // get the needed values from this row
        var qty = quantityElement.val().trim().replace(/[^0-9$.,]/g, ''); // filter out non digits like letters
            qty = qty == '' ? 0 : qty; // if blank default to 0
            quantityElement.val(qty); // set the value back, in case we had to remove soemthing
        var price = priceElement.val().trim().replace(/[^0-9$.,]/g, '');
            price = price == '' ? 0 : price; // if blank default to 0
            
            // priceElement.val(price); // set the value back, in case we had to remove soemthing
    
        // get/set row tax and total
        // also add to our totals for later
        if(last_value === "INR" && current_value === "USD"){
            
            price = (price/74.60686);
            priceElement.val((price).toFixed(2)); 

            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "INR" && current_value === "RUB"){
           
            price = price/0.939886;
            priceElement.val((price).toFixed(2)); 

            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "INR" && current_value === "EUR"){
            
            price = price/84.64598;
            priceElement.val((price).toFixed(2)); 

            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "USD" && current_value === "INR"){
           
            price = price*(74.618694);
            priceElement.val((price).toFixed(2)); 

            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "USD" && current_value === "RUB"){
            
            price = price*(79.70286);
            priceElement.val((price).toFixed(2)); 

            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "USD" && current_value === "EUR"){
            
            price = price*(0.88131);
            priceElement.val((price).toFixed(2)); 

            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "RUB" && current_value === "INR"){
            
            price = price*(0.93596);
            priceElement.val((price).toFixed(2)); 

            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "RUB" && current_value === "USD"){
            
            price = price*(0.01254);
            priceElement.val((price).toFixed(2)); 
            
            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "RUB" && current_value === "EUR"){
            
            price = price*(0.01106);
            priceElement.val((price).toFixed(2)); 
            
            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "EUR" && current_value === "INR"){
            
            price = price*(84.60814);
            priceElement.val((price).toFixed(2)); 

            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "EUR" && current_value === "USD"){
            
            price = price*(1.1342);
            priceElement.val((price).toFixed(2)); 
            
            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }
        else if(last_value === "EUR" && current_value === "RUB"){
            
            price = price*(90.34713);
            priceElement.val((price).toFixed(2)); 

            var rowPrice = ((price * 1000) * qty);
                subTotal = subTotal + rowPrice;
            var tax = (taxPercentageElement.val() * rowPrice)/100;
                taxElement.val((tax / 1000).toFixed(2));
                taxTotal = taxTotal + tax;
            var total =   rowPrice
                totalElement.val((total / 1000).toFixed(2));
                grandTotal = grandTotal + total + tax;
                allTotal = allTotal + total + tax;
        }

    });
    
    // set the bottom table values
    subTotalElement.val((subTotal / 1000).toFixed(2));   
    totalTaxElement.val((taxTotal / 1000).toFixed(2));  
    grandTotalElement.val((grandTotal / 1000).toFixed(2)); 
    allTotalElement.val((allTotal / 1000).toFixed(2));  
}


			
        var last_value;
        var current_value;

        $(document).on("click","select",function(){
            last_value = $(this).val();
        }).on("change","select",function(){
            current_value = $(this).val();
            // document.getElementById("prevlog").innerHTML = "<b>Previous: </b>"+last_value;
            // document.getElementById("currlog").innerHTML = "<b>Current: </b>"+current_value;
            
            var dollar = document.getElementById('dollar').value;
            console.log(dollar);

            calculateCurrencyChange();

            // if(last_value === "INR" && current_value === "USD"){
            //     // alert('usd')
                
            //     dollar = ((dollar/74.54).toFixed(2));
            //     console.log(dollar);
            //     $('#dollar').val(dollar);
            //     alert('value changed')
               
            // }


        });

        $(function() {
            $("#datepicker").datepicker({
               dateFormat: 'yy-mm-dd'
            });
          } );
          
        //   var selectOption = $('invoicedue');
        //   $.each(options, function(val,text){
        //     selectOption.append(
        //         $('<option></option>').val(val).html(text)
        //     )
        //   })

        function convertHTMLToPDF() {
            const { jsPDF } = window.jspdf;
            // var doc = new jsPDF('l', 'mm', [1200, 1700]);
            var doc = new jsPDF('l', 'mm', [1200, 1700]);
        
            // var doc = new jsPDF('portrait', 'mm', 'a4');
          // var doc = new jsPDF({compress: true});
            var pdfjs = document.querySelector('#content');
            doc.html(pdfjs, {
                callback: function(doc) {
                    doc.save("invoice.pdf");
                },
                x: 15,
                y: 15
            }); 
        }

       