console.log('%c HI', 'color: firebrick')


document.addEventListener('DOMContentLoaded', () => {
    const breedDropdown = document.getElementById('breed-dropdown')
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const dogContainer = document.getElementById('dog-image-container')
    const dogBreeds = document.getElementById('dog-breeds')
    
    const createNewImg = (param) => {
        let image = document.createElement('img')
        image.src = param
        dogContainer.appendChild(image)
    }
    const addDogBreeds = (param) => {
        let li = document.createElement('li')
        li.textContent = param
        dogBreeds.appendChild(li)
    }
    const addDogSubBreeds = (param) => {
        let li = document.createElement('li')
        li.textContent = param
        let ul = document.createElement('ul')
        ul.classList.add('sub-breeds')
        dogBreeds.appendChild(ul)
        ul.appendChild(li)
    }

    const filterItems = (arr, query) => {
        return arr.filter(el => el.substring(0, 1) === query)
      }

    fetch(imgUrl)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
            .then(function (data) {
                let message = data.message
                message.forEach(item => {
                    createNewImg(item)
                });
        })

        fetch(breedUrl)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
            .then(function (data) {
                let message = data.message
                console.log(message)
                for (let breed in message) {
                    addDogBreeds(breed)
                    let subBreedArrays = message[breed]
                    for (let item of subBreedArrays) {
                        console.log(item)
                        addDogSubBreeds(item)
                    }
                }
            });

        

        setTimeout(() => {
            const liArray = document.querySelectorAll('li')
            liArray.forEach(e => e.addEventListener('click', changeColor))
            function changeColor(e) {
                e.target.style.color = 'red'
            }
            console.log('breeddrop:', breedDropdown.value)
            let allLiItems = []
            for (let items of liArray) {
                allLiItems.push(items.textContent)
            }
            breedDropdown.addEventListener('change', () => {
                if (breedDropdown.value === 'a') {
                    let filteredArray = filterItems(allLiItems, 'a')
                    dogBreeds.innerHTML = ''
                    filteredArray.forEach((e) => addDogBreeds(e))
                } else if (breedDropdown.value === 'b') {
                    let filteredArray = filterItems(allLiItems, 'b')
                    dogBreeds.innerHTML = ''
                    filteredArray.forEach((e) => addDogBreeds(e))
                } else if (breedDropdown.value === 'c') {
                    let filteredArray = filterItems(allLiItems, 'c')
                    dogBreeds.innerHTML = ''
                    filteredArray.forEach((e) => addDogBreeds(e))
                } else {
                    let filteredArray = filterItems(allLiItems, 'd')
                    dogBreeds.innerHTML = ''
                    filteredArray.forEach((e) => addDogBreeds(e))
                }
            })
            
        }, 1500)
        })
        