function checkFormData() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //get the data from the form below
    const inputEmail = $("#inputEmail").val();
    const inputSubject = $("#inputSubject").val();
    const inputMessage = $("#inputMessage").val();

    //log the values to console
    console.log(`inputEmail: ${inputEmail}`);
    console.log(`inputSubject: ${inputSubject}`);
    console.log(`inputMessage: ${inputMessage}`);

    //check for errors
    let errors = 0;

    //check each field to determine if filled in
    //email input needs additional check for valid pattern
    if (inputEmail.trim().length === 0) {
        errors = 1;
        $("#inputEmail").addClass("is-invalid");
    } else if (!emailPattern.test(inputEmail)) {
        errors = 1;
        $("#inputEmail").addClass("is-invalid");
    } else {
        $("#inputEmail").removeClass("is-invalid");
    }

    if (inputSubject.trim().length === 0) {
        errors = 2;
        $("#inputSubjectError").addClass("is-invalid");
    } else {
        $("#inputSubjectError").removeClass("is-invalid");
    }

    if (inputMessage.trim().length === 0) {
        errors = 3;
        $("#inputMessageError").addClass("is-invalid");
    } else {
        $("#inputMessageError").removeClass("is-invalid");
    }

    //if no errors
    if (errors == 0) {
        //remove any previous error message
        $("form > div.alert.alert-danger").remove();

        //collect data to send
        const formData = new FormData();
        formData.set('Email', inputEmail);
        formData.set('Subject', inputSubject);
        formData.set('Message', inputMessage);

        fetchData(formData);

        //clear the form values
        $(".errors").css('display', 'none');
        $("#inputEmail").val('');
        $("#inputSubject").val('');
        $("#inputMessage").val('');

        //add a success message that automatically dismisses
        $("form").prepend("<div class='alert alert-success' role='alert'>Form submitted</div>");
        setTimeout(function () {
            $("form > div.alert.alert-success").remove();
        }, 3000);
    } else {
        //display error message
        $("form > div.alert.alert-danger").remove();
        $("form").prepend("<div class='alert alert-danger' role='alert'>Error</div>");
        console.log(`The last error code is: ${errors}`);
    }
}

async function fetchData(formData) {
    //send form data to php file using axios
    let response = await axios({
        method: 'post',
        url: 'send.php',
        data: formData
    }).catch(e => {
        console.log(`error detected: ${e}`);
    });

    //log the response to console
    console.log(`response: ${JSON.stringify(response)}`);

    //retrieve the collection in all_values
    const all_values = response.data.all_values;

    //log the values to console
    $.each(all_values, (key, value) => {
        console.log(`key: ${key}, value: ${value}`)
    })
}

$(document).ready(function () {
    //hide all content except for carousel and home page
    $('.content').hide();
    $('.carousel').show();
    $('#page-home').show();

    //retrieve data from api endpoint using axios
    axios({
        method: 'get',
        url: 'test.php'

    }).then(response => {

        //store and log all values from response
        const all_values = response.data;
        console.log(all_values);

        //loop through retrieved elements
        all_values.forEach(function (obj, index) {

            const productId = "product" + (index + 1);
            const title = obj.title;
            const price = obj.price;
            const description = obj.description;
            const mainImage = obj.mainImage;
            const largeImage = obj.largeImage;
            const galleryImage1 = obj.galleryImage1;
            const galleryImage2 = obj.galleryImage2;
            const galleryImage3 = obj.galleryImage3;
            const galleryImage4 = obj.galleryImage4;
            const galleryImage5 = obj.galleryImage5;
            const galleryImage6 = obj.galleryImage6;

            //append product data to product div
            $("#product").append(
                `<div class="col-md-4 mb-4">
                <div class="card" style="width: 18rem;">
                    <img src="img/${mainImage}.jpg" class="card-img-top" alt="..." data-bs-toggle="modal" data-bs-target="#${productId}-modal">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">$${price}</p>
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${productId}-modal">View</a>
                    </div>
                </div>
                <div class="modal fade" id="${productId}-modal" tabindex="-1" role="dialog" aria-labelledby="#${productId}-modal-title" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="${title}-modal-title">${title}</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                        <h5 class="modal-price">$${price}</p>
                                          <h6 class="modal-description">${description}</p>
                                    <div class="row">
                                        <div class="col">
                                                <img class="card-img-large" src="img/${largeImage}.jpg">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">    
                                            <a data-fancybox="gallery-${productId}" data-src="img/${galleryImage1}.jpg">
                                                <img class="card-img-thumbnail" src="img/${galleryImage1}.jpg" />
                                            </a>
                                        </div>
                                        <div class="col-md-3">    
                                            <a data-fancybox="gallery-${productId}" data-src="img/${galleryImage2}.jpg">
                                                <img class="card-img-thumbnail" src="img/${galleryImage2}.jpg" />
                                            </a>
                                        </div>
                                        <div class="col-md-3">    
                                            <a data-fancybox="gallery-${productId}" data-src="img/${galleryImage3}.jpg">
                                                <img class="card-img-thumbnail" src="img/${galleryImage3}.jpg" />
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">    
                                            <a data-fancybox="gallery-${productId}" data-src="img/${galleryImage4}.jpg">
                                                <img class="card-img-thumbnail" src="img/${galleryImage4}.jpg" />
                                            </a>
                                        </div>
                                        <div class="col-md-3">    
                                            <a data-fancybox="gallery-${productId}" data-src="img/${galleryImage5}.jpg">
                                                <img class="card-img-thumbnail" src="img/${galleryImage5}.jpg" />
                                            </a>
                                        </div>
                                        <div class="col-md-3">    
                                            <a data-fancybox="gallery-${productId}" data-src="img/${galleryImage6}.jpg">
                                                <img class="card-img-thumbnail" src="img/${galleryImage6}.jpg" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary add-to-cart" data-title="${title}" data-price="${price}">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            );
        });

    }).catch(err => {
        console.log(err);
    });

    //return to home div when logo clicked
    $('#logo').click(function (event) {
        $('#home').trigger('click');
    });

    //navigation bar functionality
    $('.nav-link').click(function (event) {
        //get id of clicked element
        var id = $(this).attr('id');
        console.log(`id: ${id}`);

        //hide all content and show content of clicked element
        $(`#${id}`).addClass('active');
        $('.nav-link').not(`#${id}`).removeClass('active');
        if (id != 'home') {
            $('.carousel').hide();
        } else {
            $('.carousel').show();
        }

        //hide all content except for the clicked element
        $('.content').not('#page-' + id).hide();
        $('#page-' + id).fadeIn(300);
    });

    //fancybox initialization
    Fancybox.bind("[data-fancybox]", {});

    //array to store cart items
    let cart = []; 

    //add to cart functionality
    $(document).on('click', '.add-to-cart', function () {
        const title = $(this).data('title');
        const price = parseFloat($(this).data('price'));

        //add item to cart
        cart.push({ title, price });
        alert(`${title} has been added to your cart!`);
    });

    //show cart page
    $('#cart-link').on('click', function () {
        $('.content').hide();
        $('#page-cart').show();

        //display cart items
        const cartItemsDiv = $('#cart-items');
        cartItemsDiv.empty(); //clear previous items
        let total = 0;

        //for each cart item, append to cart items div and add price to total
        cart.forEach(item => {
            cartItemsDiv.append(`<div>${item.title} - $${item.price.toFixed(2)}</div>`);
            total += item.price;
        });

        //update total
        $('#cart-total').text(total.toFixed(2));
    });
});