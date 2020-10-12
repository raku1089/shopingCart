let product = {
  items: [
    {
      name: "Samsung Series 4",
      image:
        "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: {
        actual: 13999,
        display: 22500,
      },
      discount: 37,
      inCart: 0,
    },
    {
      name: "Samsung Super 6",
      image:
        "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: {
        actual: 35999,
        display: 66900,
      },
      discount: 46,
      inCart: 0,
    },
    {
      name: "Samsung The Frame",
      image:
        "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: {
        actual: 84999,
        display: 133900,
      },
      discount: 36,
      inCart: 0,
    },
    {
      name: "Thomson B9 Pro",
      image:
        "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: {
        actual: 9999,
        display: 16999,
      },
      discount: 41,
      inCart: 0,
    },
    {
      name: "LG Ultra HD",
      image:
        "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: {
        actual: 39990,
        display: 79990,
      },
      discount: 50,
      inCart: 0,
    },
    {
      name: "Vu Ready LED TV",
      image:
        "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: {
        actual: 7999,
        display: 17e3,
      },
      discount: 52,
      inCart: 0,
    },
    {
      name: "Koryo Android TV",
      image:
        "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: {
        actual: 55999,
        display: 199990,
      },
      discount: 71,
      inCart: 0,
    },
    {
      name: "Micromax LED Smart",
      image:
        "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: {
        actual: 9999,
        display: 27990,
      },
      discount: 64,
      inCart: 0,
    },
  ],
};
// TODO: using HTTp make API call
// const fetchProducts = async () => {
//   if (!localStorage.getItem("products")) {
//     const url = "./api/cart.json";
//     const resp = await fetch(url)
//       .then((data) => data.json)
//       .then((data) => console.log(data, "////"));
//   } else {
//     console.log("no api call");
//   }
//   console.log(resp, products, "jkk");
// };

// fetchProducts();
const loadProducts = (product) => {
  let cartProducts = document.querySelector(".container");
  // console.log("carts", carts);
  if (cartProducts) {
    if (product.items && product.items.length) {
      product.items.map((item) => {
        cartProducts.innerHTML += `
    <div class="item">
        <div class="imageWrapper">
          <div class="discount">${item.discount}%</div>
          <img
            src=${item.image}
            alt="item1"
            class="image"
          ></img>
        </div>
        <div class="descrition">
          <div class="item-description">${item.name}</div>
          <div class="btn-price">
            <div class="strike-through">$${item.price.display}</div>
            <div><b>$${item.price.actual}</b></div>
            <button class="add-cart">Add to cart</button>
          </div>
        </div>
      </div>
    `;
      });
    } else {
      cartProducts.innerHTML += `<h5 class="fail"> Somthing went Wrong</h5>`;
    }
  }
};

loadProducts(product);

let carts = document.querySelectorAll(".add-cart");

let popup = document.querySelector(".message");
const attachEvents = () => {
  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
      cartNumbers(product.items[i]);
      totalCost(product.items[i].price);
    });
  }
};

attachEvents();

const onLoadCartcartNumbers = () => {
  const productNumbers = localStorage.getItem("cartNumbers") || 0;
  document.querySelector(".cart span").textContent = productNumbers;
};
const cartNumbers = (product) => {
  popup.style.display = "block";
  popup.innerHTML = "<div class='info'>Added to cart Successfully! </div>";
  setTimeout(() => {
    popup.innerHTML = "";
  }, 3000);
  const productNumbers = localStorage.getItem("cartNumbers") || 0;
  localStorage.setItem("cartNumbers", +productNumbers + 1);
  onLoadCartcartNumbers();
  setItems(product);
};

const setItems = (product) => {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  if (cartItems !== null) {
    if (cartItems[product.name] == undefined) {
      cartItems = { ...cartItems, [product.name]: product };
    }
    cartItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.name]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};
const totalCost = (unitPrice) => {
  let cartCost = JSON.parse(localStorage.getItem("totalCost"));
  let cartDiscount = JSON.parse(localStorage.getItem("toatlDiscount"));
  let actualPrice = JSON.parse(localStorage.getItem("actualPrice"));
  const discount = unitPrice.display - unitPrice.actual;
  if (cartCost !== null) {
    localStorage.setItem("totalCost", +cartCost + unitPrice.actual);
    localStorage.setItem("toatlDiscount", +cartDiscount + discount);
    localStorage.setItem("actualPrice", +actualPrice + unitPrice.display);
  } else {
    localStorage.setItem("totalCost", unitPrice.actual);
    localStorage.setItem("toatlDiscount", discount);
    localStorage.setItem("actualPrice", unitPrice.display);
  }
};

const displayCart = () => {
  let cartItem = JSON.parse(localStorage.getItem("productsInCart"));
  let productsConatiner = document.querySelector(".products");
  let totalPriceConatiner = document.querySelector(".price-container");
  const cartTotalCost = JSON.parse(localStorage.getItem("totalCost"));
  const cartDiscount = JSON.parse(localStorage.getItem("toatlDiscount"));
  const cartActualCost = JSON.parse(localStorage.getItem("actualPrice"));
  const cartItemCount = JSON.parse(localStorage.getItem("cartNumbers"));
  if (cartItem && productsConatiner) {
    productsConatiner.innerHTML = "";
    Object.values(cartItem).map((item) => {
      productsConatiner.innerHTML += `
      <div class="product content-position">
      <div>
        <ion-icon name="close-circle"></ion-icon>
        <img src="${item.image}">
        <span>${item.name}</span>
        </div>
        
        
        <div class="quantity">
        <ion-icon class= "decrease" onclick="removeItem()" name="add-outline"></ion-icon>
        <span class="cart-count">${item.inCart}</span>
        <ion-icon name="remove-outline">
        </ion-icon>
        </div>
        <div class="content-position" >$${item.price.actual}</div>
      </div>
      `;
    });
    // use grid for css
    totalPriceConatiner.innerHTML += `
    
    <div class="priceWrapper">
    
      
      <div class='heading1'>Total</div>
      <div></div>
      <div></div>
        <div>Items(${cartItemCount})</div>
        <div>:</div>
        <div>$${cartActualCost}</div>
      
        <div>Discount</div>
        <div>:</div>
        <div>$-${cartDiscount}</div>
      
        <div>Type Discont</div>
        <div>:</div>
        <div>$${0}</div>
</div>
<div class="order-toatl">
        <div class="items">Order Total</div>    
        <div class="items">=></div>    
        <div id='totalAmount' class="items">$${cartTotalCost}</div>
      
</div>
    `;

    // totalPriceConatiner.innerHTML += `
    // <div class="basketContainer">
    // <h4 class ="basketTotalTitle">Total</h4>
    // <h4 class="basketTotal">${cartTotalCost}</h4>
    // <h4 class ="basketTotalDiscount">Total Discount</h4>
    // <h4 class="basketDiscount">${cartDiscount}</h4>
    // </div>`;
  }
  let removeItem = document.querySelector(".decrease");
  for (let i = 0; i < Object.values(cartItem).length; i++) {}
};

onLoadCartcartNumbers();
displayCart();

// cart actions

function removeItem(e) {
  console.log(e, "product");
}
function addItem(product) {
  console.log(product, "product addItem");
}
function removeProduct() {
  console.log(product, "product...");
}
