const banner = [
  {
    src: "./img/bn1.jpg",
    link: "",
  },
  { src: "./img/bn2.jpg", link: "" },
  { src: "./img/bn3.jpg", link: "" },
  { src: "./img/bn4.jpg", link: "" },
];
let dem = 0;

const img = document.getElementById("imgbn");
const lbn = document.getElementById("linkbn");
const btnleft = document.getElementById("left");
const btnright = document.getElementById("right");

function capnhatanh() {
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = banner[dem].src;
    lbn.href = banner[dem].link;
    img.style.opacity = 1;
  }, 300);
}
btnright.addEventListener("click", function () {
  dem++;
  if (dem >= banner.length) {
    dem = 0;
  }
  capnhatanh();
});
btnleft.addEventListener("click", function () {
  dem--;
  if (dem < 0) {
    dem = banner.length - 1;
  }
  capnhatanh();
});

setInterval(function () {
  dem++;
  if (dem >= banner.length) {
    dem = 0;
  }
  capnhatanh();
}, 5000);

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
