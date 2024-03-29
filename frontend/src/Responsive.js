// // TOGGLE SIDEBAR
// const menuBar = document.querySelector("#content nav .bx.bx-menu");
// const sidebar = document.getElementById("sidebar");

// console.log(menuBar);
// console.log(sidebar);

// if (menuBar) {
//   menuBar.addEventListener("click", function () {
//     sidebar.classList.toggle("hide");
//   });
// }
// const searchButton = document.querySelector(
//   "#content nav form .form-input button"
// );
// const searchButtonIcon = document.querySelector(
//   "#content nav form .form-input button .bx"
// );
// const searchForm = document.querySelector("#content nav form");
// console.log(searchButton);
// console.log(searchButtonIcon);

// if (searchButton) {
//   searchButton.addEventListener("click", function (e) {
//     if (window.innerWidth < 576) {
//       e.preventDefault();
//       if (
//         searchForm &&
//         searchButtonIcon &&
//         searchButtonIcon.classList.contains("bx-search")
//       ) {
//         searchForm.classList.toggle("show");
//         if (searchForm.classList.contains("show") && searchButtonIcon) {
//           searchButtonIcon.classList.replace("bx-search", "bx-x");
//         } else {
//           searchButtonIcon.classList.replace("bx-x", "bx-search");
//         }
//       }
//     }
//   });
// }

// if (window.innerWidth < 768) {
//   sidebar.classList.add("hide");
// } else if (window.innerWidth > 576) {
//   if (searchButtonIcon) searchButtonIcon.classList.replace("bx-x", "bx-search");
//   if (searchForm) searchForm.classList.remove("show");
// }

// window.addEventListener("resize", function () {
//   if (this.innerWidth > 576) {
//     if (searchButtonIcon)
//       searchButtonIcon.classList.replace("bx-x", "bx-search");
//     if (searchForm) searchForm.classList.remove("show");
//   }
// });

// const switchMode = document.getElementById("switch-mode");

// if (switchMode) {
//   switchMode.addEventListener("change", function () {
//     if (this.checked) {
//       document.body.classList.add("dark");
//     } else {
//       document.body.classList.remove("dark");
//     }
//   });
// }

// const menuBar = document.querySelector("#content nav .bx.bx-menu");
//     const sidebar = document.getElementById("sidebar");
//     console.log(menuBar, sidebar);
//     menuBar.addEventListener("click", function () {
//       console.log(sidebar.classList, "ok");
//       sidebar.classList.toggle("hide");
//     });

//     const switchMode = document.getElementById("switch-mode");

//     if (switchMode) {
//       switchMode.addEventListener("change", function () {
//         if (this.checked) {
//           document.body.classList.add("dark");
//         } else {
//           document.body.classList.remove("dark");
//         }
//       });
//     }