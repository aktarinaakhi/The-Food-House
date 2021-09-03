const searchMeal = () => {
    const searchField = document.getElementById('search-food');
    const searchText = searchField.value;
    searchField.value = '';
    // get api
    if (searchText.length == 0) {
        alert(' First search food')
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchMeal(data.meals))
    }
}
// put function into api
const displaySearchMeal = meals => {
    const SearchMealDiv = document.getElementById('display-search-meal');
    SearchMealDiv.innerHTML = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                    </div>
                </div>
            
            `;
        SearchMealDiv.appendChild(div);
    })

}

const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    const singleMealDiv = document.getElementById('display-single-meal');
    const div = document.createElement('div');
    singleMealDiv.innerHTML = '';
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            <a href="#" class="btn btn-warning">See Recepie</a>
        </div>
    `;
    singleMealDiv.appendChild(div);

}

//categories of foods
const categoriesMeals = () => {
    const categoriesMealUrl = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    fetch(categoriesMealUrl)
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}
categoriesMeals();

const displayCategories = categories => {
    const categoriesMeal = document.getElementById('categories-foods');
    categories.forEach(categorie => {
        // console.log(categorie);
        const categoriesMealDiv = document.createElement('div');
        categoriesMealDiv.classList.add('col');
        categoriesMealDiv.innerHTML = `
        <div class="card">
                    <img src="${categorie.strCategoryThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${categorie.strCategory}</h5>  
                    </div>
                </div>
        `;
        categoriesMeal.appendChild(categoriesMealDiv);
    });
};



