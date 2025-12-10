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
