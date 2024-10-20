var icon = document.getElementById("icon");

icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
};

function checkWindowSize() {
  if (jQuery(window).width() >= 480) {
    $(".truncate").succinct({
      size: 100,
    });
  } else if (jQuery(window).width() >= 320) {
    $(".truncate").succinct({
      size: 55,
    });
  } else {
    $(".truncate").succinct({
      size: 150,
    });
  }
}

jQuery(document).ready(function () {
  jQuery(window).resize(checkWindowSize);
  checkWindowSize();
});

// ............LargestContentfulPaint.js......................

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Perform your AJAX/Fetch login

    setFormMessage(loginForm, "error", "Invalid username/password combination");
  });

  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length > 0 &&
        e.target.value.length < 10
      ) {
        setInputError(
          inputElement,
          "Username must be at least 10 characters in length"
        );
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });
});

// ..........................cartjs ...................

var promoCode;
var promoPrice;
var fadeTime = 300;

/* Assign actions */
$(".quantity input").change(function () {
  updateQuantity(this);
});

$(".remove button").click(function () {
  removeItem(this);
});

$(document).ready(function () {
  updateSumItems();
});

$(".promo-code-cta").click(function () {
  promoCode = $("#promo-code").val();

  if (promoCode == "10off" || promoCode == "10OFF") {
    //If promoPrice has no value, set it as 10 for the 10OFF promocode
    if (!promoPrice) {
      promoPrice = 10;
    } else if (promoCode) {
      promoPrice = promoPrice * 1;
    }
  } else if (promoCode != "") {
    alert("Invalid Promo Code");
    promoPrice = 0;
  }
  //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
  if (promoPrice) {
    $(".summary-promo").removeClass("hide");
    $(".promo-value").text(promoPrice.toFixed(2));
    recalculateCart(true);
  }
});

/* Recalculate cart */
function recalculateCart(onlyTotal) {
  var subtotal = 0;

  /* Sum up row totals */
  $(".basket-product").each(function () {
    subtotal += parseFloat($(this).children(".subtotal").text());
  });

  /* Calculate totals */
  var total = subtotal;

  //If there is a valid promoCode, and subtotal < 10 subtract from total
  var promoPrice = parseFloat($(".promo-value").text());
  if (promoPrice) {
    if (subtotal >= 10) {
      total -= promoPrice;
    } else {
      alert("Order must be more than £10 for Promo code to apply.");
      $(".summary-promo").addClass("hide");
    }
  }

  /*If switch for update only total, update only total display*/
  if (onlyTotal) {
    /* Update total display */
    $(".total-value").fadeOut(fadeTime, function () {
      $("#basket-total").html(total.toFixed(2));
      $(".total-value").fadeIn(fadeTime);
    });
  } else {
    /* Update summary display. */
    $(".final-value").fadeOut(fadeTime, function () {
      $("#basket-subtotal").html(subtotal.toFixed(2));
      $("#basket-total").html(total.toFixed(2));
      if (total == 0) {
        $(".checkout-cta").fadeOut(fadeTime);
      } else {
        $(".checkout-cta").fadeIn(fadeTime);
      }
      $(".final-value").fadeIn(fadeTime);
    });
  }
}

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children(".price").text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children(".subtotal").each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });

  productRow.find(".item-quantity").text(quantity);
  updateSumItems();
}

function updateSumItems() {
  var sumItems = 0;
  $(".quantity input").each(function () {
    sumItems += parseInt($(this).val());
  });
  $(".total-items").text(sumItems);
}

/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
    updateSumItems();
  });
}
// .............................product details page js.........................

let featuedImg = document.getElementById("featured-image");
let smallImgs = document.getElementsByClassName("small-Img");

smallImgs[0].addEventListener("click", () => {
  featuedImg.src = smallImgs[0].src;
  smallImgs[0].classList.add("sm-card");
  smallImgs[1].classList.remove("sm-card");
  smallImgs[2].classList.remove("sm-card");
  smallImgs[3].classList.remove("sm-card");
  smallImgs[4].classList.remove("sm-card");
});
smallImgs[1].addEventListener("click", () => {
  featuedImg.src = smallImgs[1].src;
  smallImgs[0].classList.remove("sm-card");
  smallImgs[1].classList.add("sm-card");
  smallImgs[2].classList.remove("sm-card");
  smallImgs[3].classList.remove("sm-card");
  smallImgs[4].classList.remove("sm-card");
});
smallImgs[2].addEventListener("click", () => {
  featuedImg.src = smallImgs[2].src;
  smallImgs[0].classList.remove("sm-card");
  smallImgs[1].classList.remove("sm-card");
  smallImgs[2].classList.add("sm-card");
  smallImgs[3].classList.remove("sm-card");
  smallImgs[4].classList.remove("sm-card");
});
smallImgs[3].addEventListener("click", () => {
  featuedImg.src = smallImgs[3].src;
  smallImgs[0].classList.remove("sm-card");
  smallImgs[1].classList.remove("sm-card");
  smallImgs[2].classList.remove("sm-card");
  smallImgs[3].classList.add("sm-card");
  smallImgs[4].classList.remove("sm-card");
});
smallImgs[4].addEventListener("click", () => {
  featuedImg.src = smallImgs[4].src;
  smallImgs[0].classList.remove("sm-card");
  smallImgs[1].classList.remove("sm-card");
  smallImgs[2].classList.remove("sm-card");
  smallImgs[3].classList.remove("sm-card");
  smallImgs[4].classList.add("sm-card");
});

// ..............................button......js.......
