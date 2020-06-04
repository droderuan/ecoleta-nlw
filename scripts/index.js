const searchButton = document.querySelector("#page-home .content main a")
const modal = document.querySelector("#modal")
const closeModal = document.querySelector("#modal .content .header a")


searchButton.addEventListener("click", () => {
  modal.classList.remove("hiden")
})

closeModal.addEventListener("click", () => {
  modal.classList.add("hiden")
})