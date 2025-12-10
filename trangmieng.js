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
if (!localStorage.getItem("order")) {
  localStorage.setItem("order", JSON.stringify([]));
}
const model = document.getElementById("model_container");
const modelImg = document.getElementById("model_img");
const modelName = document.getElementById("model_name");
const modelDesc = document.getElementById("model_desc");
const modelPrice = document.getElementById("model_price");
const closeBtn = document.getElementById("btn_close");
const orderBtn = document.getElementById("btn_order");
const numberInput = document.getElementById("model_number");

document.querySelectorAll(".btn_open").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".card");

    const img = card.querySelector(".img").src;
    const name = card.querySelector(".title").innerText;
    const price = card.querySelector(".price").innerText;
    const desc = card.dataset.desc;

    modelImg.src = img;
    modelName.innerText = name;
    modelDesc.innerHTML = desc;
    modelPrice.innerText = price;

    model.classList.add("show");
  });
});

closeBtn.onclick = function () {
  model.classList.remove("show");
};

orderBtn.onclick = function () {
  const order = JSON.parse(localStorage.getItem("order")) || [];

  const newItem = {
    img: modelImg.src,
    name: modelName.innerText,
    price: modelPrice.innerText,
    number: Number(numberInput.value),
  };

  const existingItem = order.find((item) => item.name === newItem.name);

  if (existingItem) {
    existingItem.number += newItem.number;
    alert("Đã tăng số lượng món trong giỏ!");
  } else {
    order.push(newItem);
    alert("Đã thêm món mới vào giỏ!");
  }

  localStorage.setItem("order", JSON.stringify(order));
};
