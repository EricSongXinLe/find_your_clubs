const signInBtn = document.querySelector("#signIn")
const signUpBtn = document.querySelector("#signUp")
const container = document.querySelector(".container")

signInBtn.addEventListener('click', () => {
  container.classList.remove("panel-active")
})

signUpBtn.addEventListener('click', () => {
  container.classList.add("panel-active")
})