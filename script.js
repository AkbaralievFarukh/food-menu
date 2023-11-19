const apiUrlLatest = 'https://www.themealdb.com/api/json/v2/1/latest.php'
const apiUrlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const latestMeal = document.querySelector('#latest-meal')
const search = document.querySelector('#search')
const latest = document.querySelector('.latest')
const searchBlock = document.querySelector('#search-block')
const homeBtn = document.querySelector('#home-btn')
const searchBtn = document.querySelector('#search-btn')
const card = document.querySelector('#card')
const handleGetLatestMeals = () => {
    fetch(apiUrlLatest)
        .then(response => response.json())
        .then(data => {
            data.meals.forEach(meal => {
                latestMeal.innerHTML += `
                     <div class="col-3">
                        <div class="box">
                            <img class="img-meal" src="${meal.strMealThumb}" alt="">
                            <h4 class="name-meal">${meal.strMeal}</h4>
                        </div>
                    </div>
                `
            })
        })
    latest.classList.remove('hidden')
    searchBlock.classList.add('hidden')
    card.classList.add('hidden')
}

const handleGetMealByName = () => {
    const searchInput = document.querySelector('#search-input')
    let name = searchInput.value
    fetch(`${apiUrlName}${name}`)
        .then(response => response.json())
        .then(data => {
            data.meals.forEach(meal => {
                card.innerHTML += `
                     <div class="card-img">
                        <h2>${meal.strMeal}</h2>
                        <img src="" alt="">
                    </div>
                    <div class="card-info">
                        <h2>Ingredients</h2>
                        <div class="row">
                            <div class="col-4">
                                <div class="box">
                                    <img src="${meal.strMealThumb}" alt="">
                                    <h2>${meal.strIngredient1}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            })
        })
}

searchBtn.addEventListener('click', handleGetMealByName)

search.addEventListener('click', () => {
    latest.classList.add('hidden')
    searchBlock.classList.remove('hidden')
    card.classList.remove('hidden')
})

homeBtn.addEventListener('click', () => {
    latest.classList.remove('hidden')
    searchBlock.classList.add('hidden')
    card.classList.add('hidden')
})

handleGetLatestMeals()