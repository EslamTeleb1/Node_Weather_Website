//console.log('client side loaded successfully!');

// fetch(url).then((response)=>{

//     response.json().then((data)=>{

//         if(data.error)
//         {
//             console.log(error);
//         }
//         else{
//             console.log(data.temperature);
//             console.log(data.feelsLike);
//             console.log(data.weatherDescription);
//         }
//     })
// })

const weatherForm=document.querySelector('form');
const search =document.querySelector('input');
const message1=document.querySelector('#message1');
const message2=document.querySelector('#message2');


weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault();
    console.log(search.value);
    const url=`/weather?address=${search.value}`;

    message1.textContent="loading...";
    message2.textContent='';

    fetch(url).then((response)=>{

        response.json().then((data)=>{
    
            //console.log(data);
            if(data.error)
            {
                message1.textContent=data.error;
                console.log(error);
            }
            else{
             message1.textContent=data[0]+", local time : " +data[1].localtime;//location and local time
             const result='temperature : '+ data[1].temperature +' , feelsLike : '+data[1].feelsLike + ' , Weather Description : '+data[1].weatherDescription ;// forecast
             message2.textContent=result;
             //console.log(Object.entries(data.responseForecast))
            }
        })
        .catch(function(error) {
            message1.textContent="can't find the location , try  another search ";
            message2.textContent='';
          });
    })


})