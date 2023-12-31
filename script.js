const apiUrlLatest = 'https://www.themealdb.com/api/json/v2/1/latest.php'
const apiUrlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const apiUrlImg = 'https://www.themealdb.com/images/ingredients/'
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
                     <div class="col-md-3 col-6">
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

function filterIngredients(meal) {
    const ingredientKeys = [];

    for (const key in meal) {
        if (key.startsWith("strIngredient") && meal[key] !== null && meal[key] !== "") {
            ingredientKeys.push(key);
        }
    }

    return ingredientKeys;
}

const handleGetMealByName = () => {
    const searchInput = document.querySelector('#search-input')
    let name = searchInput.value
    card.innerHTML = '';
    fetch(`${apiUrlName}${name}`)
        .then(response => response.json())
        .then(data => {
            data.meals.forEach(meal => {
                let ingredientKeys = filterIngredients(meal);
                card.innerHTML += `
                     <div class="col-md-5">
                        <div class="box">
                            <h2>${meal.strMeal}</h2>
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="box">
                            <h2>Ingredients</h2>
                            <div class="row">
                                ${ingredientKeys.map(key => `
                                <div class="col-md-3 col-4" >
                                    <div class="box">
                                        <img src="${apiUrlImg}${meal[key]}.png" alt="${meal[key]}">
                                        <h4>${meal[key]}</h4>
                                    </div>
                                </div>
                            `).join('')}
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