const apiBaseUrl = "https://www.themealdb.com/api/json/v1/1";
const categoriesEndpoint = "/categories.php";
//https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
const filterEndpoint = "/filter.php";
const lookupEndPoint = "/lookup.php";
const recipeOfTheDay = "/random.php";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function fetchMealsByCategory(category) {
    try {
        const url = apiBaseUrl + filterEndpoint + "?c=" + category;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function fetchMealsById(id) {
    try {
        const url = apiBaseUrl + lookupEndPoint + "?i=" + id;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

export { apiBaseUrl, categoriesEndpoint, fetchMealsByCategory, fetchMealsById, recipeOfTheDay };
export default fetchData;