renderCart();
/*--------------------------------------------------------------*/
function toggleSubmenu(event) {
  event.preventDefault(); // ngăn chuyển trang
  const submenu = event.target.nextElementSibling;
  if (submenu.style.display === "block") {
    submenu.style.display = "none";
  } else {
    submenu.style.display = "block";
  }
}

document.getElementById("menu-icon").onclick = function () {
  document.getElementById("sidebar").classList.add("active");
};

document.getElementById("thoatsidebar").onclick = function () {
  document.getElementById("sidebar").classList.remove("active");
};

function renderCart() {
  const order = JSON.parse(localStorage.getItem("order")) || [];
  const cartEmpty = document.querySelector(".cart-empty");
  const cartTable = document.querySelector(".cart-table");
  const cartBody = document.querySelector(".cart-body");
  const cartTotal = document.querySelector(".cart-total");

  // Nếu giỏ trống
  if (order.length === 0) {
    cartEmpty.style.display = "block";
    cartTable.style.display = "none";
    cartTotal.style.display = "none";
    return;
  }

  // Nếu có sản phẩm
  cartEmpty.style.display = "none";
  cartTable.style.display = "table";
  cartTotal.style.display = "block";

  cartBody.innerHTML = "";
  let totalMoney = 0;

  order.forEach((item, index) => {
    const priceNum = Number(item.price.replace(/\D/g, "")); // remove "đ" and dots
    const itemTotal = priceNum * item.number;
    totalMoney += itemTotal;

    cartBody.innerHTML += `
      <tr>
        <td><img src="${item.img}" /></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
          ${item.number}
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </td>
        <td>${itemTotal.toLocaleString()} đ</td>
        <td><button class="delete-btn" onclick="deleteItem(${index})">Xóa</button></td>
      </tr>
    `;
  });

  cartTotal.innerText = "Tổng tiền: " + totalMoney.toLocaleString() + " đ";
}

function changeQty(index, amount) {
  const order = JSON.parse(localStorage.getItem("order")) || [];

  order[index].number += amount;

  if (order[index].number <= 0) order[index].number = 1;

  localStorage.setItem("order", JSON.stringify(order));
  renderCart();
}

function deleteItem(index) {
  const order = JSON.parse(localStorage.getItem("order")) || [];

  order.splice(index, 1);

  localStorage.setItem("order", JSON.stringify(order));
  renderCart();
}

renderCart();
