const apiBaseUrl = "https://www.themealdb.com/api/json/v1/1";
const categoriesEndpoint = "/categories.php";
//https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
const filterEndpoint = "/filter.php";

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

export { apiBaseUrl, categoriesEndpoint, fetchMealsByCategory };
export default fetchData;