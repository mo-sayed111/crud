var nameInput = document.getElementById("productName")
var priceInput = document.getElementById("productPrice")
var categoryInput = document.getElementById("productCategory")
var descriptionInput = document.getElementById("productDescription")
var searchInput = document.getElementById("searchInput")
var productList = [];
if (localStorage.getItem("list") != null) {
    productList = JSON.parse(localStorage.getItem("list"))
    displayData()
}
else {
    productList = [];
}



var currenIndex = 0
function addProduct() {
    var product = {
        name: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        desc: descriptionInput.value
    }
    productList.push(product) //[{},{},{}]
    localStorage.setItem("list", JSON.stringify(productList))
    displayData()
}
function displayData() {
    var temp = ""
    for (var i = 0; i < productList.length; i++) {
        temp += `<tr>
        <td>`+ i + `</td>
        <td>`+ productList[i].name + `</td>
        <td>`+ productList[i].price + ` <button class="btn btn-info" onclick="inc()">+</button> </td>
        <td>`+ productList[i].category + `</td>
        <td>`+ productList[i].desc + `</td>
        <td>
            <button class="btn btn-warning" onclick="updateProduct(`+ i + `)"  >Update</button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteProduct(`+ i + `)" >delete</button>
        </td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = temp
}
function deleteProduct(x) {
    productList.splice(x, 1)

    localStorage.setItem("list", JSON.stringify(productList))
    displayData()
}
function clearForm() {

    nameInput.value = ""
    priceInput.value = ""
    categoryInput.value = ""
    descriptionInput.value = ""
}
function updateProduct(index) {
    currenIndex = index

    nameInput.value = productList[index].name
    priceInput.value = productList[index].price
    categoryInput.value = productList[index].category
    descriptionInput.value = productList[index].desc
    document.getElementById("btn-add").style.display = "none"
    document.getElementById("btn-edit").style.display = "inline-block"
}
function addEdit() {

    var product = {
        name: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        desc: descriptionInput.value
    }
    productList[currenIndex] = product

    localStorage.setItem("list", JSON.stringify(productList))
    displayData()
    document.getElementById("btn-add").style.display = "inline-block"
    document.getElementById("btn-edit").style.display = "none"

}





function inc(x) {

    var num = Number(productList[x].price)
    num++
    productList[x].price = num

    console.log(productList);
    displayData()
    localStorage.setItem("list", JSON.stringify(productList))
}


function search() {
    var searchValue = searchInput.value.toLowerCase()
    var temp = ""
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchValue) == true ||
            productList[i].category.toLowerCase().includes(searchValue) == true
        ) {
            temp += `<tr>
            <td>`+ i + `</td>
            
            <td>`+ productList[i].name.toLowerCase().replace(searchValue, "<span class='text-danger fw-bold'>" + searchValue + "</span>") + `</td>

            <td>`+ productList[i].price + ` <button class="btn btn-info" onclick="inc()">+</button> </td>
            <td>`+ productList[i].category.toLowerCase().replace(searchValue, "<span class='text-danger fw-bold'>" + searchValue + "</span>") + `</td>
            <td>`+ productList[i].desc + `</td>
            <td>
                <button class="btn btn-warning" onclick="updateProduct(`+ i + `)"  >Update</button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct(`+ i + `)" >delete</button>
            </td>
        </tr>`
        }

    }
    document.getElementById("tableBody").innerHTML = temp
}
