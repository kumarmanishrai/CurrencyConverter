


(async () => {
    
    let data = await fetch("https://open.er-api.com/v6/latest/USD");
    let countryData = await data.json();
    let rates = countryData.rates
    // console.log(Object.keys(rates));
    
    if(rates){
        let countryNames = Object.keys(rates)
        const select1 = document.querySelector(".select1")
        const select2 = document.querySelector(".select2")
        for(key of countryNames){
            let newOption1= document.createElement('option');
            newOption1.value = key;
            newOption1.text = key;
            if(key == "USD"){
                newOption1.selected = true;
                let newImage = document.getElementsByClassName("img1")[0]
                let name = key.slice(0, -1);

               newImage.setAttribute('src',`https://flagsapi.com/${name}/shiny/64.png`)

                
            }
            select1.appendChild(newOption1);

            let newOption2= document.createElement('option');
            newOption2.value = key;
            newOption2.text = key;
            if(key == "INR"){
                newOption2.selected = true;
                let newImage = document.getElementsByClassName("img2")[0]
                let name = key.slice(0, -1);

                newImage.setAttribute('src',`https://flagsapi.com/${name}/shiny/64.png`)

                
            }

            select2.appendChild(newOption2);

        }
    }

    
    
})()



const selects = document.getElementsByClassName("select")

const selectArray = Array.from(selects)

selectArray.forEach((select) => {
    select.addEventListener("change",()=> {
        let imageId = select.dataset.image;
        let name = select.value.slice(0, -1)
        // console.log(name)

        const newImage = document.querySelector(`.${imageId}`)

        newImage.setAttribute('src',`https://flagsapi.com/${name}/shiny/64.png`)
    })
})



const input = document.querySelector(".input");
const exchangeBtn = document.querySelector(".exchange-btn");

exchangeBtn.addEventListener("click", async () => {

    
    let inputVal = input.value
    console.log(typeof(inputVal))
    if(Number(inputVal) < 0 || inputVal == "") {
        alert("Please select a valid positive number")
        window.location.reload()
    }
    
    let parent = document.querySelector(".converted-money")

    let resultHeading = document.createElement("h5")
    resultHeading.style.color = "black"
    resultHeading.innerText = "Loading..."
    parent.appendChild(resultHeading)

    

    const select1 = document.querySelector(".select1")
    const select2 = document.querySelector(".select2")

    let countryfrom = select1.value
    let countryto = select2.value

    let data = await fetch(`https://open.er-api.com/v6/latest/${countryfrom}`)
    let jsonData = await data.json()
    ratesObj = jsonData.rates

    const entries = Object.entries(ratesObj)
    entries.forEach(([key, value]) => {
        if(key == countryto){
            // console.log(key, value)
            exchangeRate = value
        }
    })

    let result = exchangeRate*inputVal;



    
    resultHeading.textContent = `${inputVal} ${select1.value} = ${result} ${select2.value}`

    let child = parent.firstChild
    if(child){
        parent.removeChild(child)
    }
    parent.appendChild(resultHeading)


})
































