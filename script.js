const apiUrl = 'https://www.themealdb.com/api/json/v2/1/latest.php'
const row = document.querySelector('.row')

const handleGetLatestMeals = () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.meals.forEach(meal => {
                row.innerHTML += `
                     <div class="col-3">
                        <div class="box">
                            <img class="img-meal" src="${meal.strMealThumb}" alt="">
                            <h4 class="name-meal">${meal.strMeal}</h4>
                        </div>
                    </div>
                `
            })
        })
}

handleGetLatestMeals()