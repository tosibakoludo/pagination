const baseUrl = "https://api.coinranking.com/v2/coins";
const proxyUrl = "https://taki-proxy.herokuapp.com/";

let coinsData = [];
let currPage = 3;
let pageSize = 5;

async function getData() {
    const res = await fetch(proxyUrl + baseUrl);
    const coins = await res.json();

    coinsData = coins.data.coins;
}

async function renderTable(page = 1) {
    await getData();

    document.getElementById("first").style.display = "block";
    document.getElementById("previous").style.display = "block";
    document.getElementById("dotsPrevious").style.display = "block";
    document.getElementById("previousPreviousPage").style.display = "block";
    document.getElementById("previousPreviousPage").innerHTML = currPage - 2;
    document.getElementById("previousPage").style.display = "block";
    document.getElementById("previousPage").innerHTML = currPage - 1;
    document.getElementById("currPage").innerHTML = currPage;
    document.getElementById("nextPage").style.display = "block";
    document.getElementById("nextPage").innerHTML = currPage + 1;
    document.getElementById("nextNextPage").style.display = "block";
    document.getElementById("nextNextPage").innerHTML = currPage + 2;
    document.getElementById("dotsNext").style.display = "block";
    document.getElementById("next").style.display = "block";
    document.getElementById("last").style.display = "block";

    switch (page) {
        case 1:
            document.getElementById("first").style.display = "none";
            document.getElementById("previousPreviousPage").style.display = "none";
            document.getElementById("previous").style.display = "none";
            document.getElementById("dotsPrevious").style.display = "none";
            document.getElementById("previousPage").style.display = "none";
            break;
        case 2:
            document.getElementById("previousPreviousPage").style.display = "none";
            document.getElementById("dotsPrevious").style.display = "none";
            break;
        case 3:
            document.getElementById("dotsPrevious").style.display = "none";
            break;
        case Math.ceil(coinsData.length / pageSize) - 2:
            document.getElementById("dotsNext").style.display = "none";
            break;
        case Math.ceil(coinsData.length / pageSize) - 1:
            document.getElementById("dotsNext").style.display = "none";
            document.getElementById("nextNextPage").style.display = "none";
            break;
        case Math.ceil(coinsData.length / pageSize):
            document.getElementById("next").style.display = "none";
            document.getElementById("last").style.display = "none";
            document.getElementById("nextPage").style.display = "none";
            document.getElementById("nextNextPage").style.display = "none";
            document.getElementById("dotsNext").style.display = "none";
            break;
    }

    let ispis = "";
    coinsData.filter((elem, index) => {
        let start = (currPage - 1) * pageSize;
        let end = currPage * pageSize;
        if (index >= start && index < end) return true;
    }).forEach(coin => {
        ispis += `<tr><td>${coin.rank}</td><td>${coin.name}</td><td>${Math.round(coin.price)}</td><td>${coin.marketCap}</td><td>${coin.symbol}</td></tr>`
    })
    document.getElementById("data").innerHTML = ispis;
}

renderTable(currPage);

document.getElementById("first").addEventListener("click", firstPage);
document.getElementById("previous").addEventListener("click", previousPage);
document.getElementById("previousPreviousPage").addEventListener("click", previousPreviousPage);
document.getElementById("previousPage").addEventListener("click", previousPage);
document.getElementById("nextPage").addEventListener("click", nextPage);
document.getElementById("nextNextPage").addEventListener("click", nextNextPage);
document.getElementById("next").addEventListener("click", nextPage);
document.getElementById("last").addEventListener("click", lastPage);

function firstPage() {
    currPage = 1;
    renderTable();
}

function previousPreviousPage() {
    if (currPage > 2) {
        currPage--;
        currPage--;
        renderTable(currPage);
    }
}

function previousPage() {
    if (currPage > 1) {
        currPage--;
        renderTable(currPage);
    }
}

function nextPage() {
    if (currPage * pageSize < coinsData.length) {
        currPage++;
        renderTable(currPage);
    }
}

function nextNextPage() {
    if (currPage * pageSize < coinsData.length - 1) {
        currPage++;
        currPage++;
        renderTable(currPage);
    }
}

function lastPage() {
    currPage = Math.ceil(coinsData.length / pageSize);
    renderTable(currPage);
}
