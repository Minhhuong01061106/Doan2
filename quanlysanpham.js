document.addEventListener("DOMContentLoaded", renderfood);
const imageInput = document.querySelector('input[placeholder="Nhập URL"]');
const nameInput = document.querySelector(
  'input[placeholder="Nhập tên món ăn"]'
);
const priceInput = document.querySelector('input[placeholder="Nhập giá"]');
const detailInput = document.querySelector(
  'textarea[placeholder="Nhập chi tiết món ăn"]'
);
const statusSelect = document.querySelector("select");
//renderfood
function renderfood() {
  const foods = JSON.parse(localStorage.getItem("foods")) || [];
  const table = document.getElementById("body-table-product");

  table.innerHTML = "";

  foods.forEach((food) => {
    table.innerHTML += `
      <tr>
        <td>${food.id}</td> <!-- Đổi th thành td -->
        <td><img src="${food.image}" width="50"></td>
        <td>${food.name}</td> 
        <td>${food.price}</td>
        <td>
          ${food.detail}
        </td>
        <td>${food.status}</td>
        <td>
          <button class="btn-ctdh" onclick="editFood(${food.id})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn-ctdh" onclick="deletefood(${food.id})">
            <i class="fa-solid fa-x"></i>
          </button>
        </td>
      </tr>`;
  });
}

function showDetail(foodId) {
  renderfoodDetails(foodId);
  document.getElementById("model-container").classList.add("show");
}

const modelcon = document.getElementById("model-container");
const btnclose = document.getElementById("model-btn-close");
btnclose.onclick = function () {
  modelcon.classList.remove("show");
};

document.addEventListener("DOMContentLoaded", function () {
  const close = document.getElementById("close-btn");
  const popup = document.getElementById("popup-overlay");
  const open = document.getElementById("Btn-create");
  const submitBtn = document.querySelector(".btn-submit");

  close.onclick = function () {
    imageInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    detailInput.value = "";
    statusSelect.value = "active";
    popup.classList.remove("show");
  };

  open.onclick = function () {
    popup.classList.add("show");
  };

  function initFoodsStorage() {
    if (!localStorage.getItem("foods")) {
      localStorage.setItem("foods", JSON.stringify([]));
    }
  }

  function getFoods() {
    const foods = localStorage.getItem("foods");
    return foods ? JSON.parse(foods) : [];
  }

  function addNewFood(foodData) {
    const foods = getFoods();

    const newId =
      foods.length > 0 ? Math.max(...foods.map((f) => f.id)) + 1 : 1;

    const newFood = {
      id: newId,
      image: foodData.image,
      name: foodData.name,
      price: Number(foodData.price),
      detail: foodData.detail,
      status: foodData.status,
    };

    foods.push(newFood);
    localStorage.setItem("foods", JSON.stringify(foods));

    return newFood;
  }

  submitBtn.onclick = function () {
    if (
      !imageInput.value.trim() ||
      !nameInput.value.trim() ||
      !priceInput.value.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc (ảnh, tên, giá)");
      return;
    }

    initFoodsStorage();

    const newFoodData = {
      image: imageInput.value.trim(),
      name: nameInput.value.trim(),
      price: priceInput.value.trim(),
      detail: detailInput.value.trim(),
      status: statusSelect.value,
    };

    addNewFood(newFoodData);

    imageInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    detailInput.value = "";
    statusSelect.value = "active";

    popup.classList.remove("show");

    alert("Đã thêm món ăn thành công!");

    renderfood();
  };

  initFoodsStorage();
});

function deletefood(foodId) {
  if (!confirm("Bạn có chắc chắn muốn xóa món ăn này?")) {
    return;
  }

  const foods = JSON.parse(localStorage.getItem("foods")) || [];

  const updatedFoods = foods.filter((food) => food.id !== foodId);

  localStorage.setItem("foods", JSON.stringify(updatedFoods));

  renderfood();

  alert("Đã xóa món ăn thành công!");
}

function editFood(foodId) {
  const foods = JSON.parse(localStorage.getItem("foods")) || [];
  const food = foods.find((f) => f.id === foodId);

  if (!food) {
    alert("Không tìm thấy món ăn!");
    return;
  }

  // Tạo popup chỉnh sửa riêng hoặc sử dụng popup có sẵn
  const popup = document.getElementById("popup-overlay");
  const submitBtn = document.querySelector(".btn-submit");
  const popupTitle = document.querySelector(".popup-header h2");

  const imageInput = document.querySelector('input[placeholder="Nhập URL"]');
  const nameInput = document.querySelector(
    'input[placeholder="Nhập tên món ăn"]'
  );
  const priceInput = document.querySelector('input[placeholder="Nhập giá"]');
  const detailInput = document.querySelector(
    'textarea[placeholder="Nhập chi tiết món ăn"]'
  );
  const statusSelect = document.querySelector("select");

  // Điền dữ liệu cũ vào form
  imageInput.value = food.image;
  nameInput.value = food.name;
  priceInput.value = food.price;
  detailInput.value = food.detail;
  statusSelect.value = food.status;

  // Đổi thành chế độ chỉnh sửa
  submitBtn.textContent = "Cập nhật";
  submitBtn.dataset.editingId = foodId;
  popupTitle.textContent = "Chỉnh sửa món ăn";

  // Mở popup
  popup.classList.add("show");

  // Cập nhật sự kiện submit để chỉ xử lý chỉnh sửa
  submitBtn.onclick = function () {
    // Kiểm tra dữ liệu
    if (
      !imageInput.value.trim() ||
      !nameInput.value.trim() ||
      !priceInput.value.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc (ảnh, tên, giá)");
      return;
    }

    // Cập nhật món ăn
    const index = foods.findIndex((f) => f.id === foodId);
    if (index !== -1) {
      foods[index] = {
        id: foodId,
        image: imageInput.value.trim(),
        name: nameInput.value.trim(),
        price: Number(priceInput.value.trim()),
        detail: detailInput.value.trim(),
        status: statusSelect.value,
      };

      localStorage.setItem("foods", JSON.stringify(foods));
      alert("Đã cập nhật món ăn thành công!");
    }

    // Đóng popup và cập nhật giao diện
    popup.classList.remove("show");
    renderfood();

    // Reset lại nút submit về chế độ thêm mới
    submitBtn.textContent = "Thêm món";
    delete submitBtn.dataset.editingId;
    popupTitle.textContent = "Thêm món ăn";
  };
}
