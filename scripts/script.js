import fetchData, { apiBaseUrl, categoriesEndpoint, fetchMealsByCategory, fetchMealsById, recipeOfTheDay } from "./fetchData.js";
import { readFromStorage, storageKeys, writeToStorage } from "./storageControl.js";
const categoriesFilterDiv = document.getElementById("detailed-categories-filter");
const resultsContainer = document.getElementById("results-contaienr")
const appLogo = document.getElementById("my-app-logo");



async function visualizeMealById(event) {
    const id = event.currentTarget.id;
    const { meals:
        [recipe],
    } = await fetchMealsById(id);


    const { strMeal, strMealThumb, strCategory, strArea, strInstructions } = recipe;
    resultsContainer.innerHTML = "";
    const htmlString =
        ` <div>
    <h2>${strMeal}</h2>
    <h4>
        <a href="https:\/\/www.youtube.com\/watch?v=4aZr5hZXP_s" target="_blank">Original source</a>
    </h4>
    <img src=${strMealThumb} alt=${strMeal}>
    <table>
        <tr>
            <th>Category</th>
            <th>Origin</th>
        </tr>
        <tr>
            <td>${strCategory}</td>
            <td>${strArea}</td>
        </tr>
    </table>
    <p>${strInstructions}</p>
</div>
    `;

    resultsContainer.insertAdjacentHTML("afterbegin", htmlString);
}

async function createMealPreviewElement(meal) {
    const { idMeal, strMealThumb, strMeal } = meal;

    const recipeDiv = document.createElement("div");
    recipeDiv.className = "category-box";
    recipeDiv.setAttribute("id", idMeal);
    recipeDiv.addEventListener("click", visualizeMealById)

    const recipeImg = document.createElement("img");
    recipeImg.setAttribute("src", strMealThumb + "/preview");

    const recipeTitle = document.createElement("h4");
    recipeTitle.textContent = strMeal;
    recipeDiv.appendChild(recipeImg);
    recipeDiv.appendChild(recipeTitle);

    resultsContainer.appendChild(recipeDiv);
};


async function showMealsByCategory(category) {
    const { meals } = await fetchMealsByCategory(category);

    resultsContainer.innerHTML = "";

    meals.forEach((recipe) => {
        createMealPreviewElement(recipe);
    });

    if (window.innerHeight < window.innerWidth) {
        window.scrollTo(top);
    }
    else {
        window.scrollTo(0, resultsContainer.offsetTop);
    }
}

function createCategoryElement(categoryObj) {
    const { strCategory, strCategoryThumb } = categoryObj;

    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category-box";
    categoryDiv.addEventListener("click", () => showMealsByCategory(strCategory));

    const categoryThumb = document.createElement("img");
    categoryThumb.setAttribute("src", strCategoryThumb);
    categoryThumb.setAttribute("alt", `${strCategory} category image`);

    const categoryTitle = document.createElement("h4");
    categoryTitle.textContent = strCategory;

    categoryDiv.appendChild(categoryThumb);
    categoryDiv.appendChild(categoryTitle);
    return categoryDiv;
}

async function main() {
    categoriesFilterDiv.innerHTML = "";
    resultsContainer.innerHTML = "";

    let categories = [];
    categories = readFromStorage(storageKeys.categories);
    if (!categories) {
        const { categories: fetchedCategories } = await fetchData(apiBaseUrl + categoriesEndpoint);
        categories = fetchedCategories;
        writeToStorage(storageKeys.categories, categories);
    }

    categories.forEach(el => {
        const newCategoryEl = createCategoryElement(el);
        categoriesFilterDiv.appendChild(newCategoryEl);
    });

    const randomRecipe = await fetchData(apiBaseUrl + recipeOfTheDay);

}
main();

appLogo.addEventListener("click", main);