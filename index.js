import getRandomRecipe, 
{searchMealByName, getMealById} from './apis.js'; ///REMEMBER TO INCLUDE .JS AT THE END!!! OTHERWISE IT WON'T IMPORT CORRECTLY

const randMealContainer = document.getElementById('random_main');
const randMealFooter = document.getElementById('random_footer')
const recipeList = document.getElementById('recipe_list');
const searchTerm = document.getElementById('searched_recipe');
const searchButton = document.getElementById('search_button');
const searchedContainer = document.getElementById('searched_container');
const favRecipeContainer = document.getElementById('fav-recipe-container');


let toggle = false;
//let searchToggle = false;
let mealIds = ['52768','52829',"52771"];
let searchExist = false;

renderRandomMeal();

recipeList.querySelector(`#button52768`).addEventListener('click', () => {
    const mealId = '52768';
    removeFromFavorites(mealId);
});

recipeList.querySelector(`#button52829`).addEventListener('click', () => {
    const mealId = '52829';
    removeFromFavorites(mealId);
});

recipeList.querySelector(`#button52771`).addEventListener('click', () => {
    const mealId = '52771';
    removeFromFavorites(mealId);
});

recipeList.querySelector("[id ='52768']").addEventListener('click',async()=>{

    const mealID = document.getElementById("52768").id;
    const meal = await getMealById(mealID);
    //console.log("This is the meal >>>", meal);

     const mealIng = getIngredients(meal);
     console.log("the meal ingredients>>>>",mealIng);

     const mealInstructions = getRecipeInstructions(meal);
    
    const image = meal.strMealThumb;
   
    const text = meal.strMeal;
    const id = meal.idMeal;

    ///this section creates the ingredients container within the fav-recipe-container
    const ingredientContainer = document.createElement('div');
    ingredientContainer.classList.add('ingredients');

    ingredientContainer.innerHTML = 
    `
    <h1>${text}</h1>
    <img src = "${image}"/>
    <ul class= "ingredient_list" id = "ingredient_list" > 

    </ul>
    <p class = "recipe_instructions" id = "recipe_instructions">${mealInstructions}</p>
    `
    favRecipeContainer.appendChild(ingredientContainer);
    /////**** */


    ///this adds the list of ingredients
    const ingredientList = document.querySelector('#ingredient_list');
    for(let i = 0; i< mealIng.length;i++){
        let recipeIng = document.createElement('li');
        recipeIng.classList.add('ingredient_item');
        recipeIng.textContent = mealIng[i];

        // console.log('recipe_ingredient', recipeIng);

        ingredientList.appendChild(recipeIng);
    }

   
    // const mealIng = getIngredients(meal);
    //     const mealInstructions = getRecipeInstructions(meal);
    //     const ingredientContainer = document.createElement('div');
    //     ingredientContainer.classList.add('ingredients_container');
    //     const likeButton = document.getElementById('like_button');
    //     const heart = likeButton.querySelector("i");

        

    //     ingredientContainer.innerHTML = `
    //     <h2 class = "rand_title">Random Meal of the Day</h2> 
    //     <button class = "refresh_button" id = "refresh_button">Refresh</button>
    //     <button class = "recipe_button" id = "recipe_button"><img class= "random_img" src = "${image}"/></button>
    //     <h2 class = "ingredients_title">Ingredients:</h2>
    //     <ul class= "ingredient_list" id = "ingredient_list" > 

    //     </ul>
    //     <p class = "recipe_instructions" id = "recipe_instructions">${mealInstructions}</p>

    //     `
        
});



searchButton.addEventListener('click', async() => {
    const term = searchTerm.value;
    console.log(term);


    const termSearchedArr = await searchMealByName(term);

    console.log('term searched',termSearchedArr);

    if(searchExist){
        searchedContainer.replaceChildren();
        console.log('search container cleared');
    }

    renderSearchedContainer(termSearchedArr);
    searchExist = true;

});

function renderFavoriteRecipe(id){

}

 function getIngredients(meal){

    const ingredients = [];
    for(let i = 1; i < 21; i++){
        if(meal[`strIngredient${i}`])
        ingredients.push(meal[`strIngredient${i}`]);
    }

    return ingredients;

 }

 function getRecipeInstructions(meal){
    return meal.strInstructions;

 }


function removeFromFavorites(mealId){
    const currentList = document.getElementById('recipe_list');

    mealIds.map((element,i) => {
        if(element===mealId){
            currentList.querySelector(`#list${mealId}`).remove();
            mealIds.splice(i,1);
        }
        
    });

    //console.log('meals array',mealIds);

}

function addToFavorites(mealId,mealImg,mealText,searchHeart){
    const currentList = document.getElementById('recipe_list');
    const newItem = document.createElement('li');
    const likeButton = document.getElementById('like_button');
    const heart = likeButton.querySelector("i");
    

    newItem.innerHTML = `
    <li class = "fav_item" id = "${mealId}">
    <button class = "remove_button"  id ="button${mealId}"><i class="fa-solid fa-1.5x fa-circle-xmark"></i></button>
    <button class = "fav-recipe-button"><img class = "fav-img-item" src="${mealImg}/preview"/></button>
    <span>${mealText}</span></li>
    
    `
    mealIds = [...mealIds,mealId];
    console.log('mealId array',mealIds);
    currentList.appendChild(newItem);


    //this is to remove an item from favorites
    recipeList.querySelector(`#button${mealId}`).addEventListener('click', () => {
       
        heart.classList.remove('liked_color');
        toggle = false;
        removeFromFavorites(mealId);
        console.log('mealId array after remove',mealIds);
        console.log('toggle value', toggle);

        if(searchHeart){
            searchHeart.classList.remove('liked_color');
        }
   })

}

function renderSearchedContainer(arr){

    const searchedArr = arr;
    console.log("The searchedArr", searchedArr);
    const searchResultsCont = document.createElement('div');
    
   //const newSearchedContainer = document.getElementById('searched_container');
   
   searchResultsCont.classList.add('search_container_results');

    searchResultsCont.innerHTML = `
    <h2>Search Results</h2>
    <ul class = "search_list" id = "search_list">

    </ul>
    `

    searchedContainer.appendChild(searchResultsCont);
  
        const searchList = document.getElementById('search_list');

        searchedArr.map(element =>{

        const searchItem = document.createElement('li');
        searchItem.innerHTML = `
        <li class = "search_item" id = "list${element.idMeal}">
        <img src="${element.strMealThumb}/preview"/>
        <span>${element.strMeal}</span>
        <button class = "like_button_search" id = "search${element.idMeal}" ><i id="heart" class="fa-solid fa-3x fa-heart"></i></button>
        </li>
        `

       return searchList.appendChild(searchItem);
    });

    searchExist = true;

    searchedArr.map(element => {
        let searchToggle = false;

        searchList.querySelector(`#search${element.idMeal}`).addEventListener('click', () => {
            const likeButton = document.getElementById(`search${element.idMeal}`);
            console.log('likeButton value', likeButton);
    
            const searchHeart = likeButton.querySelector("i");
            searchHeart.classList.add('liked_color');


            if(!searchToggle){
                addToFavorites(element.idMeal,element.strMealThumb,element.strMeal,searchHeart);
                searchToggle = true;
            }
            
            
        });

    });

}

async function renderRandomMeal(){

    const meal = await getRandomRecipe();

    const mealDiv = document.createElement('div'); //creates a div
    const mealFooter = document.createElement('div');
    const image = meal.strMealThumb;
    const text = meal.strMeal;
    const id = meal.idMeal;

    mealDiv.classList.add('random_meal');

    //creates the content within the div "mealDiv"
    mealDiv.innerHTML = `
    <h2 class = "rand_title">Random Meal of the Day</h2> 
    <button class = "refresh_button" id = "refresh_button">Refresh</button>
    <button class = "recipe_button" id = "recipe_button"><img class= "random_img" src = "${image}"/></button>
   
    `
    mealFooter.innerHTML= `
    <div class = "randomMeal_text" id="randomMeal_text">
    <p class ="recipe_name">${text}</p>
    <button class = "like_button" id = "like_button" ><i id="heart" class="fa-solid fa-3x fa-heart"></i></button>
</div>
    `


    mealFooter.querySelector("#like_button").addEventListener("click", () =>{
        const likeButton = document.getElementById('like_button');

        if(!toggle){
            const heart = likeButton.querySelector("i");
            heart.classList.add('liked_color');
            addToFavorites(id,image,text);
            toggle = true;
        }
       
    } );



    mealDiv.querySelector("#refresh_button").addEventListener("click", () => {
        mealDiv.remove();
        mealFooter.remove();
        renderRandomMeal();
        toggle = false;

    });
    

    mealDiv.querySelector('.recipe_button').addEventListener("click", () => {

        console.log('toggle value', toggle);
    
        const mealIng = getIngredients(meal);
        const mealInstructions = getRecipeInstructions(meal);
        const ingredientContainer = document.createElement('div');
        ingredientContainer.classList.add('ingredients_container');
        const likeButton = document.getElementById('like_button');
        const heart = likeButton.querySelector("i");

        

        ingredientContainer.innerHTML = `
        <h2 class = "rand_title">Random Meal of the Day</h2> 
        <button class = "refresh_button" id = "refresh_button">Refresh</button>
        <button class = "recipe_button" id = "recipe_button"><img class= "random_img" src = "${image}"/></button>
        <h2 class = "ingredients_title">Ingredients:</h2>
        <ul class= "ingredient_list" id = "ingredient_list" > 

        </ul>
        <p class = "recipe_instructions" id = "recipe_instructions">${mealInstructions}</p>

        `
        randMealContainer.replaceChild(ingredientContainer,mealDiv);

        const ingredientList = document.querySelector('#ingredient_list');

        for(let i = 0; i< mealIng.length;i++){
            let recipeIng = document.createElement('li');
            recipeIng.classList.add('ingredient_item');
            recipeIng.textContent = mealIng[i];

            // console.log('recipe_ingredient', recipeIng);

            ingredientList.appendChild(recipeIng);
        }

        ingredientContainer.querySelector("#refresh_button").addEventListener("click", () => {
            ingredientContainer.remove();
            mealFooter.remove();
            getRandomRecipe();
            toggle = false;
    
        });

    });

    randMealContainer.appendChild(mealDiv);
    randMealFooter.appendChild(mealFooter);


}


