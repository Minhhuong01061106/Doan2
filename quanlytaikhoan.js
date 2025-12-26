document.addEventListener("DOMContentLoaded", renderAccounts);

const nameInput = document.getElementById("account-name");
const emailInput = document.getElementById("account-email");
const phoneInput = document.getElementById("account-phone");
const passwordInput = document.getElementById("account-password");
const roleSelect = document.getElementById("account-role");
const statusSelect = document.getElementById("account-status");

//renderAccounts
function renderAccounts() {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const table = document.getElementById("account-table-body");

  table.innerHTML = "";

  accounts.forEach((account) => {
    const statusText =
      account.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
    const roleText =
      account.role === "admin"
        ? "Quản trị viên"
        : account.role === "staff"
        ? "Nhân viên"
        : "Người dùng";

    table.innerHTML += `
      <tr>
        <td>${account.id}</td>
        <td>${account.name}</td>
        <td>${account.email}</td>
        <td>${account.phone}</td>
        <td>${roleText}</td>
        <td>${statusText}</td>
        <td>${account.createdAt}</td>
        <td>
          <button class="btn-ctdh" onclick="editAccount(${account.id})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn-ctdh" onclick="deleteAccount(${account.id})">
            <i class="fa-solid fa-x"></i>
          </button>
        </td>
      </tr>`;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const close = document.getElementById("close-btn");
  const popup = document.getElementById("popup-overlay");
  const open = document.getElementById("Btn-create");
  const submitBtn = document.getElementById("btn-submit");

  close.onclick = function () {
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    passwordInput.value = "";
    roleSelect.value = "user";
    statusSelect.value = "active";
    popup.classList.remove("show");
  };

  open.onclick = function () {
    popup.classList.add("show");
  };

  function initAccountsStorage() {
    if (!localStorage.getItem("accounts")) {
      localStorage.setItem("accounts", JSON.stringify([]));
    }
  }

  function getAccounts() {
    const accounts = localStorage.getItem("accounts");
    return accounts ? JSON.parse(accounts) : [];
  }

  function addNewAccount(accountData) {
    const accounts = getAccounts();

    const newId =
      accounts.length > 0 ? Math.max(...accounts.map((a) => a.id)) + 1 : 1;

    const newAccount = {
      id: newId,
      name: accountData.name,
      email: accountData.email,
      phone: accountData.phone,
      password: accountData.password,
      role: accountData.role,
      status: accountData.status,
      createdAt: new Date().toISOString().split("T")[0],
    };

    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    return newAccount;
  }

  submitBtn.onclick = function () {
    if (
      !nameInput.value.trim() ||
      !emailInput.value.trim() ||
      !phoneInput.value.trim() ||
      !passwordInput.value.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }

    initAccountsStorage();

    const newAccountData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      password: passwordInput.value.trim(),
      role: roleSelect.value,
      status: statusSelect.value,
    };

    addNewAccount(newAccountData);

    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    passwordInput.value = "";
    roleSelect.value = "user";
    statusSelect.value = "active";

    popup.classList.remove("show");

    alert("Đã thêm tài khoản thành công!");

    renderAccounts();
  };

  initAccountsStorage();
});

function deleteAccount(accountId) {
  if (!confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
    return;
  }

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  const updatedAccounts = accounts.filter(
    (account) => account.id !== accountId
  );

  localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

  renderAccounts();

  alert("Đã xóa tài khoản thành công!");
}

function editAccount(accountId) {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const account = accounts.find((a) => a.id === accountId);

  if (!account) {
    alert("Không tìm thấy tài khoản!");
    return;
  }

  const popup = document.getElementById("popup-overlay");
  const submitBtn = document.getElementById("btn-submit");
  const popupTitle = document.getElementById("popup-title");

  const nameInput = document.getElementById("account-name");
  const emailInput = document.getElementById("account-email");
  const phoneInput = document.getElementById("account-phone");
  const passwordInput = document.getElementById("account-password");
  const roleSelect = document.getElementById("account-role");
  const statusSelect = document.getElementById("account-status");

  nameInput.value = account.name;
  emailInput.value = account.email;
  phoneInput.value = account.phone;
  passwordInput.value = "";
  roleSelect.value = account.role;
  statusSelect.value = account.status;

  submitBtn.textContent = "Cập nhật";
  submitBtn.dataset.editingId = accountId;
  popupTitle.textContent = "Chỉnh sửa tài khoản";

  popup.classList.add("show");

  submitBtn.onclick = function () {
    if (
      !nameInput.value.trim() ||
      !emailInput.value.trim() ||
      !phoneInput.value.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }

    const index = accounts.findIndex((a) => a.id === accountId);
    if (index !== -1) {
      accounts[index] = {
        id: accountId,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim() || account.password,
        role: roleSelect.value,
        status: statusSelect.value,
        createdAt: account.createdAt,
      };

      localStorage.setItem("accounts", JSON.stringify(accounts));
      alert("Đã cập nhật tài khoản thành công!");
    }

    popup.classList.remove("show");
    renderAccounts();

    submitBtn.textContent = "Thêm tài khoản";
    delete submitBtn.dataset.editingId;
    popupTitle.textContent = "Thêm tài khoản";
  };
}
