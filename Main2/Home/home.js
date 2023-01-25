$(document).ready(function(){
    // $("#flip").click(function(){
    //   $("#panel").slideToggle("slow");
    // });
    
    var allQuotes = $('ul.quotes li');
    var allQuotesLength = allQuotes.length;
    console.log(allQuotesLength);
    var currentQuote = 0;
    var show = $('.show');

    // if(currentQuote < allQuotesLength){
    //     let init = currentQuote++;
    //     let output = allQuotes[init].innerText;
    // }
    
    setInterval(()=>{
        if(currentQuote < allQuotesLength){
            let init = currentQuote++;
            let output = allQuotes[init].innerHTML;
            allQuotes[init].style.color = 'brown';
            // console.log(output);
            if(window.innerWidth <= 650) {
                let value = `<div class="show" style="font-size: 18px; width: 100vw;">${output}</div>`
                show.slideToggle(800).html(value);
               }else if(window.innerWidth > 702) {
                let value = `<div class="show" style="font-size: 22px; width: 100vw;">${output}</div>`
                show.slideToggle(800).html(value);
               }
        }if(currentQuote == allQuotesLength){
            currentQuote = 0;
        }
    }, 3000);

    //   document.body.style.backgroundColor = "yellow";
});