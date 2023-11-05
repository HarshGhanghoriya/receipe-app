const mealDetails =document.getElementById("meals-type");

function getMealById(){
  //Below urlParams will have all the parameter saved in DOM
    const urlParams= new URLSearchParams(window.location.search);
    const mealID=urlParams.get('mealID');
    if(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data);
        const meal=data.meals[0];
        console.log(meal);
        let ingredientsHTML = '';
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          if (ingredient) {
            ingredientsHTML += `${i}. ${ingredient} `;
          }
        }
        mealDetails.innerHTML =`
            
                <div id="meal-image">
                
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                </div>
                <div id="meal-details">
                  <h1 class="h-primary">${meal.strMeal}</h1>
                
                  <p>${meal.strInstructions}</p>
                </div>
                <div id="meal-ingredients">
                    <h2 class="h-secondary">Ingredients</h2>
                    <p>${ingredientsHTML}</p>
                </div>
            `;
        });
};
}
getMealById();