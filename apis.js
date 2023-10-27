//remember to add "https://" in front of api endpoints!!!!
export default async function getRandomRecipe(){

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const jsonResponse = await response.json();

    const randomMeal = jsonResponse.meals[0];

    console.log(randomMeal);

    return randomMeal;  
 }

 export async function searchMealByName(name){

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + name);
    const jsonResponse = await response.json();

    const meals = jsonResponse.meals;

    return meals;

 }

 export async function getMealById(variable){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + variable);
    const jsonResponse = await response.json();
    const meal = jsonResponse.meals[0];
    const id = meal.idMeal;
    const image = meal.strMealThumb;
    const text = meal.strMeal;

    addToFavorites(id,image,text);

 }
