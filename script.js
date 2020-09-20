function callRestService() {
  var xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "https://vast-oasis-59549.herokuapp.com/restaurants?latitude=48&longitude=76.2",
    // "./data.json",
    false
  );
  xhttp.send(null);

  return xhttp.responseText;
}

function dataPoint(restaurant, attribute, hide = false) {
  let dataElem = document.createElement("td");
  if (hide) {
    dataElem.classList.add("hide");
  }
  if (attribute === "imageUrl") {
    let img = document.createElement("img");
    img.setAttribute("alt", restaurant.name + "-image");
    img.setAttribute("src", restaurant.imageUrl);
    dataElem.appendChild(img);
  } else {
    dataElem.innerHTML = restaurant[attribute];
  }

  return dataElem;
}

var btn = document.getElementById("fetch");
btn.onclick = function () {
  let data = callRestService();

  let restTableBody = document.querySelector("#restaurant-table-body");
  console.log(data);
  let restaurants = JSON.parse(data).restaurants;
  console.log(restaurants);

  for (let i = 0; i < restaurants.length; i++) {
    let row = document.createElement("tr");
    row.classList.add("clickable-menu");

    let restaurant = restaurants[i];
    console.log(restaurant);

    row.appendChild(dataPoint(restaurant, "restaurantId", true));
    row.appendChild(dataPoint(restaurant, "imageUrl"));
    row.appendChild(dataPoint(restaurant, "name"));
    row.appendChild(dataPoint(restaurant, "city"));
    row.appendChild(dataPoint(restaurant, "attributes"));

    restTableBody.appendChild(row);
  }

  if (restaurants.length > 0) {
    let restTable = document.querySelector("#restaurant-table");
    restTable.style.display = "block";
  } else {
    console.log("here");

    document.querySelector("#table-container").innerHTML =
      "No Restaurants open in your area at this time";
  }

  addItemListeners();
};

function addItemListeners() {
  let rows = document.querySelectorAll(".clickable-menu");

  for (let i = 0; i < rows.length; i++) {
    rows[i].onclick = (function () {
      return function () {
        var menu = getMenu(5992); //this.cells[0].innerHTML);
        console.log("items in menu " + JSON.parse(menu).menu.items.length);
      };
    })(rows[i]);
  }
}

function clickB() {
  btn.click();
}

function getMenu(restaurantId) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "https://vast-oasis-59549.herokuapp.com/menu?restaurantId=" + restaurantId,
    false
  );
  var sendDate = new Date().getTime();
  console.log(sendDate);
  xhttp.send(null);
  var gotDate = new Date().getTime();
  console.log(gotDate - sendDate + "ms");
  return xhttp.responseText;
}

// {
// 	"restaurantId": "10",
// 	"name": "AndhraSpice",
// 	"city": "Hsr Layout",
// 	"imageUrl": "https://images.pexels.com/photos/1268558/pexels-photo-1268558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
// 	"latitude": 48.0547933447429,
// 	"longitude": 76.25429541274355,
// 	"opensAt": null,
// 	"closesAt": null,
// 	"attributes": ["Tamil", "South Indian"]
// }
