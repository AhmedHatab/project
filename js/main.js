

$('.btnNav').click(function() {
  if (document.querySelector('.btnNav').classList.contains('fa-xmark')) {
        $(".mainNav").animate({opacity:'0'},500); 
        $(".mainNav").animate({width:'0'},700); 
        $(".headNav").animate({left:'0'},700); 
        document.querySelector('.btnNav').classList.replace('fa-xmark','fa-align-justify')   
  }
  else{
    
      $(".mainNav").animate({width:'200px'},500);
      $(".mainNav").animate({opacity:'1'},200); 
      $(".headNav").animate({left:'200px'},500);
      document.querySelector('.btnNav').classList.replace('fa-align-justify','fa-xmark')
  }
})

//------------------


//-----------fetch api
var apiData;
async function getApi(category) {
   var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${category}`)
    apiData = await response.json();
   displayData()
}

//--------------main data
( async function () {  
  await getApi('sweet potato');
}
)();
//----------------- movement in data
let aValue = '';
     var aElement= document.querySelectorAll('.mainNav a');
    for (let i = 0; i < aElement.length; i++) {
    aElement[i].addEventListener("click",function() { 
      aValue =aElement[i].innerHTML;
      ( async function () {  
        await getApi(aValue);
      }
      )();
      })  
    }  
//---- display data
function displayData() {
   var cartona="";
  for (let i = 0; i < apiData.recipes.length; i++) {
   cartona += `<div class="col-lg-4">
                    <div class="imgcover m-auto ">
                        <img class="img-fluid" src="${apiData.recipes[i].image_url}">
                        <div class="captionImg">
                            <h1>${apiData.recipes[i].title}</h1>
                            <p>publisher is ${apiData.recipes[i].publisher}</p>
                        </div>
                    </div>
               </div>`
   document.querySelector('.row').innerHTML=cartona

  }    
}
//-------seachTxt
document.querySelector('.seachInput').oninput = function seachTxt() {
  var cartona = "";
  for (let i = 0; i < apiData.recipes.length; i++) {
      if ( apiData.recipes[i].title.toLowerCase().includes(this.value.toLowerCase())) {
        cartona += `<div class="col-md-4">
        <div class="imgcover m-auto ">
            <img class="img-fluid" src="${apiData.recipes[i].image_url}">
            <div class="captionImg">
                <h1>${apiData.recipes[i].title}</h1>
                <p>publisher is ${apiData.recipes[i].publisher}</p>
            </div>
        </div>
   </div>`
      }
  }

  document.querySelector('.row').innerHTML=cartona
}

