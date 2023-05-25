
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'LEGO Star Wars Inquisitor Transport Scythe 75336',
        image: '1.PNG',
        price: 159.99
    },
    {
        id: 2,
        name: 'LEGO Marvel Super Heroes Hulk Mech Armor 76241',
        image: '2.PNG',
        price: 24.99
    },
    {
        id: 3,
        name: 'LEGO Super Mario Peachs Garden Balloon Ride Expansion Set 71419',
        image: '3.PNG',
        price: 79.99
    },
    {
        id: 4,
        name: 'LEGO Disney Princess Enchanted Journey 43216',
        image: '4.PNG',
        price: 99.99
    },
    {
        id: 5,
        name: 'LEGO Jurassic World Quetzalcoatlus Plane Ambush 76947',
        image: '5.PNG',
        price: 299.99
    },
    {
        id: 6,
        name: 'LEGO Star Wars AT-TE Walker 75337',
        image: '6.PNG',
        price: 79.99
    }
];


let listCarts  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCart(key){
    if(listCarts[key] == null){
        // copy product form list to list Cart
        listCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity = 1;
    }
    reloadCart();
}

function reloadCart(){
    listCart.innerHTML = '';
    let count = 0;
    let subtotal = 0;
    listCarts.forEach((value, key)=>{
        if(value != null){
            subtotal += value.price * value.quantity;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <span>${value.quantity}</span>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCart.appendChild(newDiv);
        }
    });
    total.textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById("subtotal").textContent = `$${subtotal.toLocaleString()}`;
    quantity.textContent = count;
}





function changeQuantity(key, quantity){
     if((quantity > 5) || (quantity < 1)) return
    
    if(quantity == 0){
        delete listCarts[key];
    }else{
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * products[key].price;
    }
    reloadCart();
}



