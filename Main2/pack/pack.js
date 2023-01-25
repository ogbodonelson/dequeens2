// initialValue of goods
let initialValue = document.querySelector('div.initialGoods');
let initialBags = document.querySelector('input.initialBags');
let initialBundles = document.querySelector('input.initialBundles');
let initialPcs = document.querySelector('input.initialPcs');
let displayInitialValue = document.querySelector('h3.displayInitialValue');
let buttonInitialValue = document.getElementById('initialValues');
let table = document.querySelector('table');

buttonInitialValue.addEventListener('click', (e)=>{
    displayInitialValue.innerHTML = `${initialBags.value}Bags ${initialBundles.value}Bundles ${initialPcs.value}Pieces`;
});


// for table
let soldGoods = document.querySelector('div.soldGoods');
let soldBag = document.getElementById('soldBag');
let soldBundle = document.getElementById('soldBundle');
let soldPcs = document.getElementById('soldPcs');
let totalBagsSold=0;
let totalBundlesSold=0;
let totalPcsSold=0;
soldGoods.addEventListener('click', (e)=>{
    let target = e.target;
        if(target.matches('button.soldBag')){
            totalBagsSold += Number(soldBag.value);
        soldBags(soldBag.value, 75000, 'Bags', 'cancelBag', 'soldBags', 'removeBag');
    }else if(target.matches('button.soldBundle')){
        totalBundlesSold += Number(soldBundle.value);
        soldBags(soldBundle.value, 7500, 'Bundles', 'cancelBundle', 'soldBundles', 'removeBundle');
    }else if(target.matches('button.soldPcs')){
        totalPcsSold += Number(soldPcs.value);
        soldBags(soldPcs.value, 800, 'Pcs', 'cancelPcs', 'soldPcs', 'removePcs');
    }
});

let a = 0;
function soldBags(valuesOfWhatWeSold, fixedPricesOfEach, nameOfItem, cancel, soldItem, remove){
    let Amount = valuesOfWhatWeSold * fixedPricesOfEach;
    let add = `<tr>
            <td class = ${soldItem}>${valuesOfWhatWeSold}${nameOfItem}</td>
            <td>${Amount}</td>
            <td class = '${remove}'   style="background-color: red;">X</td>
            </tr>`
            table.innerHTML += add;
            amountTotal(Amount);
            // total(amountTotal(Amount));
}

// amount total
let Total = 0;
function amountTotal(total){
    Total += total;
    console.log(Total);
}

function deleteRow(t){
    if(t.matches('.removeBag') || t.matches('.removeBundle') || t.matches('.removePcs')){
        // console.log(t.parentElement)
        t.parentElement.remove();
        let numberFromString = t.parentElement.cells[0].innerHTML;
        let valueOfCell2 = Number(t.parentElement.cells[1].innerHTML);
        // let alphabetsFromString = answer.match(/[a-zA-Z]/);
        seperate(numberFromString);
        Total -= valueOfCell2;
        let className = t.parentElement.cells[0].classList[0];

        // checking if the class names are the same to run the subtraction from the total
        if(className == 'soldBags'){
            totalBagsSold -= seperatedNumberValue;
        }else if(className == 'soldBundles'){
            totalBundlesSold -= seperatedNumberValue;
        }else{
            totalPcsSold -= seperatedNumberValue;
        }
    }
}

let seperatedNumberValue;
// function to seperate number from string
function seperate(str){
    var string = str;
    var matchesNum = string.match(/(\d+)/);
    seperatedNumberValue = matchesNum[0];
    console.log(seperatedNumberValue);
}

table.addEventListener('click', (e)=>{
    let target = e.target;
    deleteRow(target);
});

// function to get total value
function total(totalValue){
    let to = document.querySelector('h3.total');
    to.innerHTML = `Total:₦${totalValue}`;
}

// remaining goods
let remaining = document.querySelector('.remaining');
let done = document.querySelector('.done');
done.addEventListener('click', ()=>{
    total(Total);
    remaining.innerHTML = `${totalBagsSold}Bags ${totalBundlesSold}Bundles ${totalPcsSold}Pieces`;
});

// balancing goods
let balanceButton = document.querySelector('button.balance');
let balancedBundle = initialBundles.value - totalBundlesSold;
let balancedPcs = initialPcs.value - totalPcsSold;

balanceButton.addEventListener('click', (e)=>{
    let balance = document.querySelector('h3.balance');
    let tbs = Number(totalBagsSold);
    let ib = Number(initialBags.value);
    let subtractBags = ib + (-tbs)
    let tbus = Number(totalBundlesSold);
    let ibu = Number(initialBundles.value);
    let subtractBundles = ibu + (-tbus);
    let tp = Number(totalPcsSold);
    let ip = Number(initialPcs.value);
    let subtractPcs = ip + (-tp);
    let eye = document.querySelector('h3.eye');

    if(Math.sign(subtractPcs) === 1){
        balance.innerHTML = `${subtractBags}Bags ${subtractBundles}Bundles ${subtractPcs}Pcs`;
    }else if(Math.sign(subtractPcs) === -1 && soldPcs.value <= 10){
        let negativeValuePcs = 10+(subtractPcs);
        let remove_from_initialBundles = initialBundles.value - 1;
        let d = remove_from_initialBundles - tbus;
        let e = negativeValuePcs
        // balance.innerHTML = `${subtractBags}Bags ${d}Bundles ${negativeValuePcs}Pcs`;
        console.log(negativeValuePcs)
        forPcs(subtractBags, d, negativeValuePcs);
    }

    function forPcs(a, b, c){
        balance.innerHTML = `${a}Bags ${b}Bundles ${c}Pcs`;
    }

    if(Math.sign(subtractBundles) === 1){
    }else if(Math.sign(subtractBundles) === -1 && soldBundle.value <= 10){
        let negativeValueBundles = 10+(subtractBundles);
        let remove_from_initialBags = initialBags.value - 1;
        let d = remove_from_initialBags - tbs;
        balance.innerHTML = `${d}Bags ${negativeValueBundles}Bundles ${subtractPcs}Pcs`;
    }

    if(Math.sign(subtractBundles) == -1 && soldBundle.value <= 10 && Math.sign(subtractPcs) == -1 && soldPcs.value <= 10){
        let negativeValuePcs = 10+(subtractPcs);
        let negativeValueBundles = 10+(subtractBundles)-1;
        let for_the_bag = subtractBags - 1;
        if(Math.sign(for_the_bag) === 1){
    balance.innerHTML = `${for_the_bag}Bags ${negativeValueBundles}Bundles ${negativeValuePcs}Pcs`;
            negBunNegPcs(for_the_bag, negativeValueBundles, negativeValuePcs);
        }
    }
});

function negBunNegPcs(bag, bun, pc){
    balance.innerHTML = `${bag}Bags ${bun}Bundles ${pc}Pcs`;
}