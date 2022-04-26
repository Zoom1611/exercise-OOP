class Product {
    /* title = "DEFAULT";
    imageUrl;
    price;
    description; */

    constructor(title, imageUrl, desc, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = desc;
        this.price = price;
    }
}

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

// klasa sa kojom se output-aju radne komponente za razne dijelove stranice, base class
class Component {
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }

    render() {

    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    };
}

class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`
    }

    get totalAmount() {
        const sum = this.items.reduce((prevValue, curItem) => {
            console.log("prevValue " + prevValue);
            console.log("curItem " + curItem.price)
            return prevValue + curItem.price;
        }, 0);
        return sum;
    };

    constructor(renderHookId) {
        super(renderHookId);
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        const cartEl = this.createRootElement("section", "cart", )
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        this.totalOutput = cartEl.querySelector("h2");
    }
}

class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId, false)
        this.product = product;
        this.render();
    }

    addToCart() {
        App.addProductToCart(this.product)
    }

    render() {
        const prodEl = this.createRootElement("li", "product-item");
        prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}"></img>
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
        const addToCartButton = prodEl.querySelector("button");
        addToCartButton.addEventListener("click", this.addToCart.bind(this))
    }
}

class ProductList extends Component {
    products = [];

    constructor(renderHookId) {
        super(renderHookId);
        this.fetchProducts();
    }

    fetchProducts() {
        this.products = [
            new Product(
                'A pillow',
                'https://media.istockphoto.com/photos/white-pillow-isolated-on-white-background-picture-id1018424252',
                'A soft pillow!',
                19.99
            ),
            new Product(
                'A carpet',
                'https://www.scs.co.uk/dw/image/v2/AARC_PRD/on/demandware.static/-/Sites-master-catalog-scs/default/dwacb114a6/images/large/large_L019565_1.jpg?sw=830&sh=519&sfrm=jpg',
                'A carpet you might like.',
                89.99
            )
        ];
        this.renderProducts();
    }

    renderProducts() {
        for (let prod of this.products) {
            new ProductItem(prod, "prod-list");
        }
    }

    render() {
        this.createRootElement("ul", "product-list", [new ElementAttribute("id", "prod-list")]);
        if (this.products && this.products.length > 0) {
            this.renderProducts();
        }
    }
}

class Shop {
    constructor() {
        this.render();
    }

    render() {
        this.cart = new ShoppingCart("app")
        new ProductList("app");
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();




















/* function getNames(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
        if (arr[i].hasOwnProperty("name")) {
            result.push(arr[i].name)
        }
    }
    return result;
}

console.log(
    "get names", 
    getNames([
        { a: 1 },
        { name: "jane" },
        {},
        { name: "mark" },
        { name: "sophia" },
        { b: 2 }
    ])
) */