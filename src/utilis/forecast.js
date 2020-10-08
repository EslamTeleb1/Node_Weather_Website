const request=require('request');

const forecast=(lat,long,callBack)=>{
   // const url = "http://api.weatherstack.com/current?access_key=729fff8f0fcc8e19e766f1ea02353d5a&query=New%20York"
    const key='729fff8f0fcc8e19e766f1ea02353d5a';
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${lat},${long}`;

request({url ,json:true}, (error, {body}) => {
    //console.log(error,response);
    if(error)
    {
         callBack("can't connect to the open weather map",undefined);
    }
    else if(body.error)
    {
        callBack("can't find the location",undefined);

    }
    else{
        
        const  temperature =body.current.temperature,
        feelsLike = body.current.feelslike,
        weatherDescription = body.current.weather_descriptions[0],
        localtime= body.location.localtime;

        callBack(undefined,{
            temperature,
            feelsLike ,
            weatherDescription ,
            localtime
        });

    }
   
})

}

module.exports=forecast;