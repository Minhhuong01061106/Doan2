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

    return;
  }

  // Nếu có sản phẩm
  cartEmpty.style.display = "none";
  cartTable.style.display = "table";

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

  cartTotal.innerText = totalMoney.toLocaleString();
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

function thanhtoan() {
  if (kiemtra() == 0) {
    return;
  }
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", "[]");
  }

  // Lấy giỏ hàng hiện tại
  const currentCart = JSON.parse(localStorage.getItem("order")) || [];

  // Tạo đơn hàng mới
  const newOrder = {
    id: Date.now(),
    name: document.getElementById("name").value,
    sdt: document.getElementById("sdt").value,
    dc: document.getElementById("dc").value,
    gc: document.getElementById("gc").value,
    tt: document.getElementById("cart-total").textContent + " đ",
    items: currentCart.map((item) => ({
      img: item.img,
      name: item.name,
      price: item.price,
      quantity: item.number,
    })),
  };

  const orders = JSON.parse(localStorage.getItem("orders"));
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Xóa giỏ hàng sau khi thanh toán
  localStorage.removeItem("order");
  renderCart();

  alert("Oke");
}

const btntt = document.querySelector(".checkout-btn");

btntt.onclick = function () {
  thanhtoan();
};

function kiemtra() {
  const ten = document.getElementById("name");
  const sdt = document.getElementById("sdt");
  const dc = document.getElementById("dc");
  const tt = document.getElementById("cart-total");
  const kt = 1;
  if (ten.value == "") {
    alert("Vui lòng nhập tên!");
    kt = 0;
  } else if (sdt.value == "") {
    alert("Vui lòng nhập số điện thoại!");
    kt = 0;
  } else if (dc.value == "") {
    alert("Vui lòng nhập địa chỉ!");
    kt = 0;
  } else if (tt.innerText == "0") {
    alert("Giỏ hàng chưa có sản phẩm nào!");
    kt = 0;
  }
  return kt;
}
