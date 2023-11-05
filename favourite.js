const mealDetails =document.getElementById("meals-type");

function favouriteMeals(){
    
    for(let i=0; i<15;i++){
    if(localStorage.getItem(i))
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${localStorage.getItem(i)}`)
    .then(response => response.json())
    .then(data=> {
        const meal=data.meals[0];
        console.log(meal);
        mealDetails.innerHTML+=`
                <div class="favourite-meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                  <h2 class="secondary-heading meal-name meal-details" data-mealId=${localStorage.getItem(i)}>${meal.strMeal}</h2>
                  <h2 class="secondary-heading remove-from-favourite" index=${i} }>Remove from favourite</h2>
                </div>`;
    })
}
}
favouriteMeals();

mealDetails.addEventListener("click", e=>{
  // !! If remove from favourite clicked, it will remove it from favourite !!
    const clickedMeal= e.composedPath().find(item=>{
      if(item.classList){
        return item.classList.contains("remove-from-favourite");
      }else
        return false;
    });

    if(clickedMeal){
      const mealIndex=clickedMeal.getAttribute("index");
      console.log(mealIndex);
      localStorage.removeItem(mealIndex);
      clickedMeal.innerHTML="Removed"
    }


    // !! If meal is clicked it will show meal details !!
    const mealInfo=e.composedPath().find(item=>{
      if(item.classList){
          return item.classList.contains("meal-details");
      } else{
          return false;
      }
   });
  
   if(mealInfo){
      const mealID=mealInfo.getAttribute("data-mealId");
      console.log(mealID);
      window.location.href = `meal-details.html?mealID=${mealID}`;
   }
})
