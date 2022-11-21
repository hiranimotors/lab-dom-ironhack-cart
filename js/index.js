// ITERATION 1

function updateSubtotal(product) {
  const price = product.querySelector('.price span').innerHTML;
  const quantity = parseFloat(product.querySelector('.quantity input').value);
  const subtotal = price * quantity;
  const subtotalElement = product.querySelector('.subtotal span');
  subtotalElement.innerHTML = subtotal;
  return subtotal;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  const singleProduct = document.querySelector('.product');
  updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  const productsArray = [...document.getElementsByClassName('product')];
  let total = 0;
  for (product of productsArray) {
    total += updateSubtotal(product);
  }

  // ITERATION 3
  const totalElement = document.querySelector('#total-value span');
  totalElement.textContent = total;
}
// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  const trElement = target.parentNode.parentNode;
  trElement.remove();
  calculateAll();
}

// ITERATION 5

function createProduct() {
  const nameInput = document.querySelector('.create-product input');
  const priceInput = document.querySelector(
    '.create-product input[type=number]'
  );
  let priceValue = priceInput.valueAsNumber;
  if (nameInput === '' || priceValue === 0) {
    window.alert('Please complete all empty fields');
    return; //this terminates the function so that none of the code below within the function is executed
  }
  let newProduct = document.createElement('tr');
  newProduct.className = 'product';

  newProduct.innerHTML = `
  <td class="name">
            <span>${nameInput}</span>
          </td>
          <td class="price">£<span>${priceValue}</span></td>
          <td class="quantity">
            <input type="number" value="0" min="0" placeholder="Quantity" />
          </td>
          <td class="subtotal">$<span>0</span></td>
          <td class="action">
            <button class="btn btn-remove">Remove</button>
          </td>
          `;

  const tBodyElm = document.querySelector('#cart tbody');

  tBodyElm.appendChild(newProduct);

  const removeButton = newProduct.querySelector('.btn-remove');
  removeButton.addEventListener('click', removeProduct);

  nameInput.value = '';
  priceInput.value = 0;
}

window.addEventListener('load', () => {
  const calculatePricesButton = document.getElementById('calculate');
  calculatePricesButton.addEventListener('click', calculateAll);

  const removeButtons = [...document.getElementsByClassName('btn-remove')];
  removeButtons.forEach((button) =>
    button.addEventListener('click', removeProduct)
  );

  const createButton = document.getElementById('create');
  createButton.addEventListener('click', createProduct);
});
