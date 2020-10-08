const path=require('path');
const express= require('express');
const hbs=require('hbs');
const forecast =require('./utilis/forecast.js');
const geoCode =require('./utilis/geoCode.js');

const publicDirectoryPath= path.join(__dirname,'../public');

const viewsPath=path.join(__dirname,'../templates/views')

const partialPath= path.join(__dirname,'../templates/partials')

const port=process.env.PORT||3000;

const app=express();

app.set('view engine','hbs');
app.set('views',viewsPath);

hbs.registerPartials(partialPath);
 
app.use(express.static(publicDirectoryPath)); 

app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather',
        name:'Islam'
    })
})
app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About',
        name:'Islam Tolba'
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        text:'help page',
        title:'help page',
        name:'islam'
    })
})

app.get('/weather',(req,res)=>{


    if(!req.query.address)
    {
        return res.send('you should provide an Address ');
    }
    if(req.query.address)
    {
        geoCode(req.query.address,(error,response)=>{

            if(error)
            {
                res.send(error);
            }
            else{
                forecast(response.latitude,response.longtitude,(errorForecast,responseForecast)=>{
                 //   console.log(response.location);
                    if(errorForecast)
                    {
                        res.send(errorForecast)
                    }
                    else{
                            const dataResult=[
                                response.location,
                                responseForecast]
                     //  console.log(dataResult);
                        res.send(dataResult);
                    }
                })
            }
        })
     
    }
    // res.send({
    //     forecast:'it is snowing now !!',
    //     location:'philadifia',
    //     title:'weather page',
    //     name:'islam'
    // });

})
// app.get('/help/*',(req,res)=>{


//     res.send('an article  help not  found');
// })
app.get('/help/*',(req,res)=>{

    res.render('404',{
        title:404,
        name:'Islam',
        messageError:"can't find the article help page"

    });
})
app.get('*',(req,res)=>{

    res.render('404',{
        title:404,
        name:'Islam',
        messageError:"can't find the  page"

    });
})


app.listen(port,()=>{

    console.log('server is up '+port);

})
