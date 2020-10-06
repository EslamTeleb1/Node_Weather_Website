const request=require('request');

const gecode=(address,callback)=>
{

   const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiaXNsYW10aWxpYiIsImEiOiJja2ZiMnNoZnAxMjNvMnJtYXpmdmViZ2twIn0.luqXoQUoIFYVF8t2bRHdcg"


request({url,json:true},(error,{body})=>{

   if(error)
   {
      callback("can't connect to the Weather GeoCoding",undefined);
   }
   else if(body.features.length==0)
   {
    //  console.log("can't find the right soulation")
      callback("can't find the right location",undefined);
   }
   else{

      const longtitude =body.features[0].center[0];
      const latitude=body.features[0].center[1];
      const location=body.features[0].place_name;

   callback(undefined,{
      longtitude,
      latitude,
      location
   });

   }
   
})

}

module.exports=gecode;