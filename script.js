// !!Select all the elements first !! 
const searchForm=document.getElementById('submit-form');
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");
const mealsContainer=document.getElementById("meals-type");
const resultHeading=document.getElementById("result-heading");
const mealListElement=document.getElementById("meal-list");


//Function to generate all the meal searched
function searchMeal(e){
    if(e)
    e.preventDefault();
    //Above method will prevent the button to submit the form
    resultHeading.innerHTML="";  // Clear previous result heading
    mealListElement.innerHTML="";
    const term=searchInput.value.trim(); // Trim leading and trailing spaces
    console.log(term);
    if(term){
       fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then((data)=>{ 
            console.log(data);
            resultHeading.innerHTML=`Search result for ${term}`;
            if(data.meals===null){
                resultHeading.innerHTML=`There are no search results. Try again!`;
            }else{
                mealsContainer.innerHTML=data.meals.map(meal=>`
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <h2 class="h-secondary add-to-favourite" data-mealID="${meal.idMeal}">Add to favourite <i class="fa-sharp fa-regular fa-heart"></i> </h2>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h2>${meal.strMeal}</h2>
                        </div>
                    </div>
                `).join("");
            }
    })
    searchInput.value="";
    }else{
        alert("Please enter a search term")
    }
};

searchButton.addEventListener("click", searchMeal);



//JS to first find which meal is clicked and then open a new html page 
let i=0;
mealsContainer.addEventListener("click", e=>{
     const mealInfo=e.composedPath().find(item=>{
        if(item.classList){
            return item.classList.contains("meal-info");
        } else{
            return false;
        }
     });
    
     if(mealInfo){
        const mealID=mealInfo.getAttribute("data-mealId");
        console.log(mealID);
        window.location.href = `meal-details.html?mealID=${mealID}`; // Instead of invoking the previous getMealById function, redirect to the new HTML page
     }
     

    //  !! Add to favourite click !! 
     const addToFavourite=e.composedPath().find(item=>{
      if(item.classList)
          return item.classList.contains("add-to-favourite");
      else
          return false;
   });
   
   if(addToFavourite){
      const mealID=addToFavourite.getAttribute("data-mealId");
      console.log(mealID);
      localStorage.setItem(i, mealID);
      addToFavourite.innerHTML = "Added"
      i++;
   }
     
});


//Autocomplete list
let meals=[];

// !!It will provide all the meals start from the input first letter 
function fetchMeals(firstLetter, searchText){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data);
        meals= data.meals.map(x=>x.strMeal);
        meals.sort();
        console.log(meals);
        filterData(meals, mealListElement, searchText);
    });
};


// It will filter the meal fetched in suggestion using remaining letters of input 
  function filterData(data, element, searchText) {
    const updatedData= data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()));
    if (updatedData) {
        element.innerHTML = ""; // Clear previous content
        let innerElement = "";
        updatedData.forEach((item) => {
          innerElement += `<li class="specific-meal">${item}</li>`;
        });
        element.innerHTML = innerElement;
      }
        // If specific meal get clicked amount the list of suggestion shown then invoke below function 
        const specificMeals = document.querySelectorAll(".specific-meal");
        specificMeals.forEach((meal) => {
        meal.addEventListener("click", function () {
            const selectedMeal = meal.textContent;
            element.innerHTML = ""; // Clear suggestion box
            searchInput.value = selectedMeal; // Set the value of search input to the selected meal
            searchMeal(); // Perform the search for the selected meal
        });
        });
    };



  // !!Below listener will create suggested list of meals by 1st letter and then more closely meal by filterData function  
  searchInput.addEventListener("input", function () {
    fetchMeals(searchInput.value.slice(0, 1), searchInput.value);
  });
  
 

// My mistake: the problem is I was calling the filterData function immediately after calling fetchMeals, without waiting for the asynchronous fetch request to complete.

// To fix this issue, I have to call the filterData function inside the .then callback of the fetch request


//Mistake: loadData(meals, mealListElement);




