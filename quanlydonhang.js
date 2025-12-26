document.addEventListener("DOMContentLoaded", renderdh);

function renderdh() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const table = document.getElementById("body-table-product");

  table.innerHTML = "";

  orders.forEach((order) => {
    table.innerHTML += `
      <tr>
        <td>${order.id}</td> <!-- Đổi th thành td -->
        <td>${order.name}</td>
        <td>${order.sdt}</td> 
        <td>${order.dc}</td>
        <td>${order.gc}</td>
        <td>${order.tt}</td>
        <td>
          <button class="btn-ctdh" onclick="showDetail(${order.id})">
            <i class="fa fa-eye"></i>
          </button>
        </td>
        <td>Đang giao</td>
      </tr>`;
  });
}

function renderOrderDetails(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find((o) => o.id === orderId);
  const table = document.getElementById("body-table-product");

  if (!order) {
    table.innerHTML = "<tr><td colspan='8'>Không tìm thấy đơn hàng</td></tr>";
    return;
  }

  const modeltb = document.getElementById("model-table");

  modeltb.innerHTML = "";

  modeltb.innerHTML += `
      <thead>
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Tên món</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
    `;

  order.items.forEach((item, index) => {
    const priceNum = Number(item.price.replace(/\D/g, "")) || 0;
    const total = priceNum * item.quantity;
    const modeltb = document.getElementById("model-table");
    modeltb.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td><img src="${item.img}" width="50"></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${total.toLocaleString()} đ</td>
      </tr>
    `;
  });
}

function showDetail(orderId) {
  renderOrderDetails(orderId);
  document.getElementById("model-container").classList.add("show");
}

const modelcon = document.getElementById("model-container");
const btnclose = document.getElementById("model-btn-close");
btnclose.onclick = function () {
  modelcon.classList.remove("show");
};
