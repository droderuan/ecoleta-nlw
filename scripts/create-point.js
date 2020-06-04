
function populateUFs(){
  const ufState = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(response => response.json())
    .then(states => {
      for(state of states){

        ufState.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()

function getCities(event){
  const citySelect = document.querySelector("select[name=city]")
  const inputState = document.querySelector("input[name=state]")

  citySelect.innerHTML = `<option value>Selecione a cidade</option>`
  citySelect.disabled = true

  const indexOfSelectedState = event.target.selectedIndex
  inputState.value = event.target.options[indexOfSelectedState].text
  
  const ufValue = event.target.value

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`



  fetch(url)
  .then(response => response.json())
  .then(cities => {
    for(city of cities){

      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

const gridItems = document.querySelectorAll(".grid-items li")

for(item of gridItems){
  item.addEventListener("click", handleSelectedItem)
}

let inputHiddenItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
  const itemLi = event.target

  const itemId = itemLi.dataset.id

  const itemIndex = selectedItems.findIndex(item => item === itemId)

  if(itemIndex === -1){
    selectedItems.push(itemId)
  } else {
    selectedItems.splice(itemIndex, 1)
  }
  inputHiddenItems.value = selectedItems
  itemLi.classList.toggle("selected")
}