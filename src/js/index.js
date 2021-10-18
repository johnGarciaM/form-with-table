// Data user
// const name_user = prompt("Cual es su nombre?");
// const last_name_user = prompt("Cual es su apellido?");
const name_user = "john";
const last_name_user = "freddy";

// Method
const handlerAvatar = (name, last_name) => {
	const first_letter = name.trim().charAt(0).toUpperCase();
	const second_letter = last_name.trim().charAt(0).toUpperCase();
	return `${first_letter}${second_letter}`;
};

// format name_user
const avatar_content = handlerAvatar(name_user, last_name_user);

// reference to avatar
const avatar_text = document.querySelector(".avatar-text");
//set avatar_text
avatar_text.textContent = avatar_content;

// prices list
const prices = {
	Laptop: "$1300.00",
	Desktop: "$2000.00",
	Mouse: "$20.00",
	Speaker: "$100.00",
	Keyboard: "$200.00",
};
// add our products
let arrayListProducts = [];
let set_value = "";

// set prices for product
const handlerSetPrice = (e) => {
	// display value on input
	set_value = prices[e.target.value];
	const input_price = document.querySelector("input[name=price]");
	input_price.setAttribute("value", set_value);
};
// set total
const calculateTotal = (products) => {
	console.log(products);
	const total_ref = document.querySelector(".total");
	const total_price = products.reduce((acum, product) => {
		const price = product.price.substring(1, product.price.length - 1);
		return (acum += parseFloat(price));
	}, 0);
	total_ref.textContent = `$${total_price}.00`;
};
// add product to arrayListProducts
const addProduct = () => {
	const table = document.querySelector("tbody");
	table.innerHTML = "";
	let tr = "";
	arrayListProducts.forEach((pr) => {
		tr += "<tr>";
		tr += `<td>${pr.prod}</td><td>${pr.country}</td><td>${pr.color}</td><td>${pr.price}</td>`;
		tr += "</tr>";
	});
	table.innerHTML += tr;
};
// handler submit
const handlerSubmit = async (e) => {
	e.preventDefault();
	const formData = new FormData(e.target);
	const product = Object.fromEntries(formData);
	// validate form
	if (Object.keys(product).length < 3) return;
	arrayListProducts = [...arrayListProducts, { ...product, price: set_value }];
	await addProduct();
	await calculateTotal([...arrayListProducts]);
	return false;
};
