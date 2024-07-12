$(document).ready(function () {
    let sideNav = $('.side-nav-menu');
    let openCloseIcon = $('.open-close-icon');

    function closeSideNav() {
        sideNav.addClass('closed');
        openCloseIcon.removeClass('fa-times').addClass('fa-align-justify');
    }

    function openSideNav() {
        sideNav.removeClass('closed');
        openCloseIcon.removeClass('fa-align-justify').addClass('fa-times');
    }

    openCloseIcon.on('click', function () {
        if (sideNav.hasClass('closed')) {
            openSideNav();
        } else {
            closeSideNav();
        }
    });

    $('.side-nav-menu .links li').on('click', function () {
        closeSideNav();
    });
    async function getRecipe() {
        try {
            let meals = [];
            for (let i = 0; i < 20; i++) {
                let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                let data = await response.json();
                meals = meals.concat(data.meals);
            }
            displayMeals(meals);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }

    function displayMeals(meals) {
        let cartona = "";
        for (let i = 0; i < meals.length; i++) {
            cartona += `<div class="col-md-3 position-relative meal-item" data-id="${meals[i].idMeal}">
                <div class="div position-relative">
                    <img src="${meals[i].strMealThumb}" alt="" class="img-fluid rounded-2">
                    <div class="wone bg-white text-black d-flex align-items-center justify-content-center">
                        <h2>${meals[i].strMeal.split(" ").slice(0, 1).join(" ")}</h2>
                    </div>
                </div>
            </div>`;
        }
        $("#row").html(cartona);
        attachMealClickHandler();
    }

    function attachMealClickHandler() {
        $(".meal-item").on('click', function () {
            let mealId = $(this).data('id');
            getMealDetails(mealId);
        });
    }

    async function getMealDetails(mealId) {
        try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            let data = await response.json();
            displayMealDetails(data.meals[0]);
        } catch (error) {
            console.error("Error fetching meal details:", error);
        }
    }
    function displayMeals2(meals) {
        let cartona = "";
        for (let i = 0; i < meals.length; i++) {
            cartona += `<div class="col-md-3 position-relative meal-item" data-id="${meals[i].idMeal}">
                <div class="div position-relative">
                    <img src="${meals[i].strMealThumb}" alt="" class="img-fluid rounded-2">
                    <div class="wone bg-white text-black d-flex align-items-center justify-content-center">
                        <h2>${meals[i].strMeal.split(" ").slice(0, 1).join(" ")}</h2>
                    </div>
                </div>
            </div>`;
        }
        $("#row").html(cartona);
        attachMealClickHandler();
    }
    function displayMealDetails(meal) {
        $('#recipe-image').attr('src', meal.strMealThumb);
        $('#recipe-title').text(meal.strMeal);
        $('#instruction').text(meal.strInstructions);
        $('#areatext').html(`<span class="h2 fwbold">Area : </span> ${meal.strArea}`);
        $('#categorytext').html(`<span class="h2 fwbold">Category : </span> ${meal.strCategory}`);

        let ingredients = '';
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients += `<li class="alert alert-info w-mine m-1" role="alert">${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
            }
        }
        $('#rdetails').html(ingredients);

        let tags = '';
        if (meal.strTags) {
            meal.strTags.split(',').forEach(tag => {
                tags += `<li class="alert alert-danger w-mine m-1" role="alert">${tag}</li>`;
            });
        }
        $('#tags').html(tags);

        $('#source').attr('onclick', `window.open('${meal.strSource}', '_blank')`);
        $('#YouTube').attr('onclick', `window.open('${meal.strYoutube}', '_blank')`);

        $('#row').addClass("d-none");
        $('#recipe-section').removeClass("d-none");
    }

    getRecipe();
 // Categories
 $('#categories').on('click', function () {
    $('#row').addClass("d-none");
    $('#dsearch').addClass("d-none");
    $('#dcategories').removeClass("d-none");
    $('#darea').addClass("d-none");
    $('#recipe-section').addClass("d-none");
    $('#irow').addClass("d-none");
    $('#dcontact').addClass("d-none");
    $('#searchResults').addClass("d-none");
    getcategory();
});
var categories = [];

async function getcategory() {
    try {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        let data = await response.json();
        categories = data.categories;
        displaycategories();
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function displaycategories() {
    let cartona = "";
    for (let i = 0; i < categories.length; i++) {
        cartona += `<div class="col-md-3 position-relative category-item" style="cursor: pointer;" data-category="${categories[i].strCategory}">
            <div class="div position-relative">
                <img src="${categories[i].strCategoryThumb}" alt="" class="img-fluid rounded-2">
                <div class="wone bg-white text-black d-flex align-items-center justify-content-center">
                    <h2>${categories[i].strCategory}</h2>
                </div>
            </div>
        </div>`;
    }
    $("#rcategory").html(cartona);
    attachCategoryClickHandler();
}

function attachCategoryClickHandler() {
    $(".category-item").on('click', function () {
        let category = $(this).data('category');
        getMealsByCategory(category);
    });
}

async function getMealsByCategory(category) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let data = await response.json();
        displayMeals2(data.meals);
        $('#row').removeClass("d-none");
        $('#dsearch').addClass("d-none");
        $('#dcategories').addClass("d-none");
        $('#darea').addClass("d-none");
        $('#recipe-section').addClass("d-none");
        $('#irow').addClass("d-none");
        $('#dcontact').addClass("d-none");
        $('#searchResults').addClass("d-none");
    } catch (error) {
        console.error("Error fetching meals by category:", error);
    }
}
//area
    $('#area').on('click', function () {
        $('#row').addClass("d-none");
        $('#dsearch').addClass("d-none");
        $('#dcategories').addClass("d-none");
        $('#darea').removeClass("d-none");
        $('#recipe-section').addClass("d-none");
        $('#irow').addClass("d-none");
        $('#dcontact').addClass("d-none");
        $('#searchResults').addClass("d-none");
        getarea();

    });

    $('#ingredients').on('click', function () {
        $('#row').addClass("d-none");
        $('#dsearch').addClass("d-none");
        $('#dcategories').addClass("d-none");
        $('#darea').addClass("d-none");
        $('#recipe-section').addClass("d-none");
        $('#irow').removeClass("d-none");
        $('#dcontact').addClass("d-none");
        $('#searchResults').addClass("d-none");
        getIngredients();
    });
    var area = [];

    async function getarea() {
        try {
            let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            let data = await response.json();
            area = data.meals;
            displayarea();
        } catch (error) {
            console.error("Error fetching area:", error);
        }
    }

    function displayarea() {
        let cartona = "";
        for (let i = 0; i < area.length; i++) {
            cartona += `
                <div class="col-md-3 d-flex justify-content-center align-items-center flex-column mb-2 area-item" data-area="${area[i].strArea}">
                    <div class="div position-relative d-flex justify-content-center align-items-center flex-column">
                        <i class="fa-solid fa-house-laptop fs-auto"></i>
                        <h2>${area[i].strArea}</h2>
                    </div>
                </div>`;
        }
        $("#rarea").html(cartona);
        attachAreaClickHandler();
    }

    function attachAreaClickHandler() {
        $(".area-item").on('click', function () {
            let area = $(this).data('area');
            getMealsByArea(area);
        });
    }

    async function getMealsByArea(area) {
        try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
            let data = await response.json();
            displayMeals2(data.meals);
            $('#row').removeClass("d-none");
            $('#dsearch').addClass("d-none");
            $('#dcategories').addClass("d-none");
            $('#darea').addClass("d-none");
            $('#recipe-section').addClass("d-none");
            $('#irow').addClass("d-none");
            $('#dcontact').addClass("d-none");
            $('#searchResults').addClass("d-none");
        } catch (error) {
            console.error("Error fetching meals by area:", error);
        }
    }
//ingredients
    var ingredients = [];

    async function getIngredients() {
        try {
            let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
            let data = await response.json();
            ingredients = data.meals;
            displayIngredients();
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
    }

    function displayIngredients() {
        let cartona = "";
        for (let i = 0; i < 25; i++) {
            cartona += `<div class="col-md-3 d-flex justify-content-center align-items-center flex-column mb-2 ingredient-item" data-ingredient="${ingredients[i].strIngredient}">
                    <i class="fa-solid fa-drumstick-bite fs-auto mb-2"></i>
                    <h2 class="h1 text-center">${ingredients[i].strIngredient}</h2>
                    <p class="text-center">${ingredients[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>`;
        }
        $("#irow").html(cartona);
        attachIngredientClickHandler();
    }

    function attachIngredientClickHandler() {
        $(".ingredient-item").on('click', function () {
            let ingredient = $(this).data('ingredient');
            getMealsByIngredient(ingredient);
        });
    }

    async function getMealsByIngredient(ingredient) {
        try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            let data = await response.json();
            displayMeals2(data.meals);
            $('#row').removeClass("d-none");
            $('#dsearch').addClass("d-none");
            $('#dcategories').addClass("d-none");
            $('#darea').addClass("d-none");
            $('#recipe-section').addClass("d-none");
            $('#irow').addClass("d-none");
            $('#dcontact').addClass("d-none");
            $('#searchResults').addClass("d-none");
        } catch (error) {
            console.error("Error fetching meals by ingredient:", error);
        }
    }

    // Contact form display
    $('#contact').on('click', function () {
        $('#row').addClass("d-none");
        $('#dsearch').addClass("d-none");
        $('#dcategories').addClass("d-none");
        $('#darea').addClass("d-none");
        $('#recipe-section').addClass("d-none");
        $('#irow').addClass("d-none");
        $('#dcontact').removeClass("d-none");
        $('#searchResults').addClass("d-none");
    });

    // Form validation functions
    function validateName(name) {
        return /^[a-zA-Z ]+$/.test(name); 
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
    }

    function validatePhone(phone) {
        return /^\d{10}$/.test(phone); 
    }

    function validateAge(age) {
        return age > 0 && age < 150;
    }

    function validatePassword(password) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    }

    function validateRepassword(password, repassword) {
        return password === repassword; 
    }

    function updateSubmitButton() {
        let nameValid = validateName($('#nameInput').val());
        let emailValid = validateEmail($('#emailInput').val());
        let phoneValid = validatePhone($('#phoneInput').val());
        let ageValid = validateAge($('#ageInput').val());
        let passwordValid = validatePassword($('#passwordInput').val());
        let repasswordValid = validateRepassword($('#passwordInput').val(), $('#repasswordInput').val());

        let formValid = nameValid && emailValid && phoneValid && ageValid && passwordValid && repasswordValid;

        $('#submitBtn').prop('disabled', !formValid);
    }

    // Form input validation and event bindings
    $('#nameInput').on('input', function () {
        $('#nameAlert').toggleClass('d-none', validateName($(this).val()));
        updateSubmitButton();
    });

    $('#emailInput').on('input', function () {
        $('#emailAlert').toggleClass('d-none', validateEmail($(this).val()));
        updateSubmitButton();
    });

    $('#phoneInput').on('input', function () {
        $('#phoneAlert').toggleClass('d-none', validatePhone($(this).val()));
        updateSubmitButton();
    });

    $('#ageInput').on('input', function () {
        $('#ageAlert').toggleClass('d-none', validateAge($(this).val()));
        updateSubmitButton();
    });

    $('#passwordInput').on('input', function () {
        $('#passwordAlert').toggleClass('d-none', validatePassword($(this).val()));
        updateSubmitButton();
    });

    $('#repasswordInput').on('input', function () {
        $('#repasswordAlert').toggleClass('d-none', validateRepassword($('#passwordInput').val(), $(this).val()));
        updateSubmitButton();
    });

    $('#submitBtn').on('click', function (e) {
        e.preventDefault();
    });

    // Search
    $('#search').on('click', function () {
        $('#row').addClass("d-none");
        $('#dsearch').removeClass("d-none");
        $('#dcategories').addClass("d-none");
        $('#darea').addClass("d-none");
        $('#recipe-section').addClass("d-none");
        $('#irow').addClass("d-none");
        $('#dcontact').addClass("d-none");
        $('#searchResults').addClass("d-none");
    });

    $('#searchByName').on('input', function () {
        let query = $(this).val().trim();
        if (query.length > 0) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
                .then(response => response.json())
                .then(data => {
                    displaySearchResults(data.meals);
                })
                .catch(error => console.error('Error:', error));
        } else {
            $('#searchResults').empty();
        }
    });

    function displaySearchResults(meals) 
    {
        let cartona = "";
        if (meals) {
            meals.forEach(meal => {
                cartona += `<div class="col-md-3 position-relative meal-item mb-3 cursor-pointer" data-id="${meal.idMeal}">
                    <div class="position-relative m-2">
                        <img src="${meal.strMealThumb}" alt="" class="img-fluid rounded-2" alt="${meal.strMeal}">
                        <div class="wone bg-white text-black d-flex align-items-center justify-content-center">
                            <h2>${meal.strMeal}</h2>
                        </div>
                    </div>
                </div>`;
            });
        } else {
            cartona = '<p>No results found</p>';
        }
        $('#row').addClass("d-none");
        $('#dcategories').addClass("d-none");
        $('#darea').addClass("d-none");
        $('#recipe-section').addClass("d-none");
        $('#irow').addClass("d-none");
        $('#dcontact').addClass("d-none");
        $('#searchResults').html(cartona).removeClass("d-none");
        attachMealClickHandler();
    }

    function attachMealClickHandler() {
        $(".meal-item").on('click', function () {
            let mealId = $(this).data('id');
            getMealDetails(mealId);
            $('#row').addClass("d-none");
            $('#dcategories').addClass("d-none");
            $('#darea').addClass("d-none");
            $('#recipe-section').addClass("d-none");
            $('#irow').addClass("d-none");
            $('#dcontact').addClass("d-none");
            $('#dsearch').addClass("d-none");
            $('#searchResults').addClass("d-none");
        });
    }
     // Search by First Letter
     $('#searchByFirstLetter').on('input', function () {
        let letter = $(this).val().trim();
        if (letter.length === 1) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
                .then(response => response.json())
                .then(data => {
                    displaySearchResults(data.meals);
                })
                .catch(error => console.error('Error:', error));
        } else {
            $('#searchResults').empty();
        }
    });
});