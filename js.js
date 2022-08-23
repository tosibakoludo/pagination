const baseUrl = "https://api.coinranking.com/v2/coins";
const proxyUrl = "https://protected-sea-17533.herokuapp.com/";
// const proxyUrl = "https://taki-proxy.herokuapp.com/";

let coinsData = [];
// let currPage = 1;
// let pageSize = 10;

async function getData() {
    // const res = await fetch(baseUrl, {
    //     mode: 'no-cors'
    const res = await fetch(proxyUrl + baseUrl);
    console.log(res);
    const coins = await res.json();

    coinsData = coins.data.coins;
}

async function renderTable(page = 1) {
    await getData();

    //     if (page == 1) {
    //         document.getElementById("previous").style.visibility = "hidden";
    //     }
    //     else {
    //         document.getElementById("previous").style.visibility = "visible";
    //     }

    //     if (page == Math.ceil(coinsData / pageSize)) {
    //         document.getElementById("next").style.visibility = "hidden";
    //     }
    //     else {
    //         document.getElementById("next").style.visibility = "visible";
    //     }

    console.log(coinsData);

    //     let ispis = "";
    //     coinsData.filter((elem, index) => {
    //         let start = (currPage - 1) * pageSize;
    //         let end = currPage * pageSize;
    //         if (index >= start && index < end) return true;
    //     }).forEach(coin => {
    //         ispis += `<tr><td>${coin.rank}</td><td>${coin.name}</td><td>${Math.round(coin.price)}</td><td>${coin.marketCap}</td><td>${coin.symbol}</td></tr>`
    //     })

    //     document.getElementById("data").innerHTML = ispis;
}

renderTable();

// document.getElementById("previous").addEventListener("click", previousPage);
// document.getElementById("next").addEventListener("click", nextPage);

// function nextPage() {
//     if (currPage * pageSize < coinsData.length) {
//         currPage++;
//         randerTable(currPage);
//     }
// }

// function previousPage() {
//     if (currPage > 1) {
//         currPage--;
//         randerTable(currPage);
//     }
// }