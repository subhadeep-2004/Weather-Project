import express from "express";;
import axios from "axios";
import bodyParser from "body-parser";

//const URL= "https://api.openweathermap.org/data/2.5/weather"
//const API= "cd0c4963e682dd94b1d96e3cfc083fa4"

const app= express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



// //condition1=main , condition2= day or night
function presentCondition(condition1,condition2,condition3){

    const path= "/img/animated"
                if(condition1==="Thunderstorm"){
                    return path+"/thunder.svg" ;
                }
                else if(condition1==="Drizzle"){
                    return path+"/rainy-7.svg"
                }

                else if(condition1==="Rain" && condition2===1){
                    if(condition3==="light rain"){
                        return path+"/rainy-2.svg"
                    }
                    else if(condition3==="moderate rain"){
                        return path+"/rainy-1.svg";
                    }
                    else if(condition3==="frezzing rain"){
                        return path+"/snowy-6.svg";
                    }
                    else{
                        return path+"/rainy-3.svg";
                    }
                }
                else if(condition1==="Rain" && condition2==0){
                    if(condition3==="light rain"){
                        return path+"/rainy-4.svg"
                    }
                    else if(condition3==="moderate rain"){
                        return path+"/rainy-5.svg"   
                    }
                    else if(condition3==="frezzing rain"){
                        return path+"/snowy-6.svg";
                    } else{
                        return path+"/rainy-6.svg";
                    }
                }

                else if( condition1==="Snow"){
                    return path+"/snowy-6.svg";
                }
                else if( condition1==="Clear"&&condition2===1){
                    return path+"/day.svg";
                }
                else if(condition1==="Clear"&&condition2===0){
                    return path+"/night.svg";
                }

                else if(condition3=== "overcast clouds"){
                    return path+"/cloudy.svg";
                }
                else if(condition1==="Clouds" && condition2===1){
                    
                        return path+"/cloudy-day-1.svg";   
                }
                else if(condition1==="Clouds" && condition2===0){
                    
                        return path+"/cloudy-night-3.svg";   
                }
                else{

                    return path+"/Mist.png";
                }

    
}

//condition1=weather[0].main
//condition2=day or night
//condtion3=weather[0].description

app.get("/",async(req,res)=>{
    const locationSearched = "bhubaneswar";
    const url="https://weatherapi-com.p.rapidapi.com/forecast.json?q="+locationSearched+"&days=5";

    const url1="https://api.openweathermap.org/data/2.5/weather?q="+locationSearched+"&appid=a49a04c73cca03950bc9385dee66a22a&units=metric";

    try{
        const result= await axios.get(url,{
            headers: {
                'X-RapidAPI-Key': 'c623028e72mshd77dc2903fecaf0p19dd73jsn9f1931dbc590',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
              }

        })

        const result1= await axios.get(url1);

        const condition1=result1.data.weather[0].main;
        const condition2=result.data.current.is_day;
        const condition3=result1.data.weather[0].description;




        res.render("index1.ejs",{

            //result.data.current.condition.icon

            city: result1.data.name,
            img: presentCondition(condition1,condition2,condition3),
            airPressure: result1.data.main.pressure,
            temp: result1.data.main.temp,
            feels: result1.data.main.feels_like,
            descrip: result1.data.weather[0].description,
            humidity: result1.data.main.humidity,
            speed: result.data.current.wind_kph,
            
            img1: result.data.forecast.forecastday[0].hour[0].condition.icon,
            temp1:result.data.forecast.forecastday[0].hour[0].temp_c,
            descrip1: result.data.forecast.forecastday[0].hour[0].condition.text,
            humidity1: result.data.forecast.forecastday[0].hour[0].humidity,
           
            temp2: result.data.forecast.forecastday[0].hour[3].temp_c,
            humidity2 : result.data.forecast.forecastday[0].hour[3].humidity,
            img2: result.data.forecast.forecastday[0].hour[3].condition.icon,
            descrip2 :result.data.forecast.forecastday[0].hour[3].condition.text,

            temp3: result.data.forecast.forecastday[0].hour[6].temp_c,
            humidity3 : result.data.forecast.forecastday[0].hour[6].humidity,
            img3: result.data.forecast.forecastday[0].hour[6].condition.icon,
            descrip3 :result.data.forecast.forecastday[0].hour[6].condition.text,

            temp4: result.data.forecast.forecastday[0].hour[9].temp_c,
            humidity4 : result.data.forecast.forecastday[0].hour[9].humidity,
            img4: result.data.forecast.forecastday[0].hour[9].condition.icon,
            descrip4 :result.data.forecast.forecastday[0].hour[9].condition.text,
            
            temp5: result.data.forecast.forecastday[0].hour[12].temp_c,
            humidity5 : result.data.forecast.forecastday[0].hour[12].humidity,
            img5: result.data.forecast.forecastday[0].hour[12].condition.icon,
            descrip5 :result.data.forecast.forecastday[0].hour[12].condition.text,

            temp6: result.data.forecast.forecastday[0].hour[15].temp_c,
            humidity6 : result.data.forecast.forecastday[0].hour[15].humidity,
            img6: result.data.forecast.forecastday[0].hour[15].condition.icon,
            descrip6 :result.data.forecast.forecastday[0].hour[15].condition.text,

            temp7: result.data.forecast.forecastday[0].hour[18].temp_c,
            humidity7 : result.data.forecast.forecastday[0].hour[18].humidity,
            img7: result.data.forecast.forecastday[0].hour[18].condition.icon,
            descrip7 :result.data.forecast.forecastday[0].hour[18].condition.text,

            temp8: result.data.forecast.forecastday[0].hour[21].temp_c,
            humidity8 : result.data.forecast.forecastday[0].hour[21].humidity,
            img8: result.data.forecast.forecastday[0].hour[21].condition.icon,
            descrip8 :result.data.forecast.forecastday[0].hour[21].condition.text,

        
        })
    }catch(error){
        res.send(error.message);
        console.log(error.message);
    }
    
})





       


// As the data for current weather is giving wrong for some places so I have add another api for correct the current weather 

app.post("/search",async(req,res)=>{
    let locationSearched = req.body.location;
    locationSearched= locationSearched.toLowerCase();

    const url="https://weatherapi-com.p.rapidapi.com/forecast.json?q="+locationSearched+"&days=5";

    const url1="https://api.openweathermap.org/data/2.5/weather?q="+locationSearched+"&appid=a49a04c73cca03950bc9385dee66a22a&units=metric";


    try{
        const result= await axios.get(url,{
            headers: {
                'X-RapidAPI-Key': 'c623028e72mshd77dc2903fecaf0p19dd73jsn9f1931dbc590',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
              }

        })
        // console.log( JSON.stringify(result.data));
        const result1= await axios.get(url1);

        const condition1=result1.data.weather[0].main;
        const condition2=result.data.current.is_day;
        const condition3=result1.data.weather[0].description;




            res.render("index1.ejs",{

            city: result1.data.name,
            img:presentCondition(condition1,condition2,condition3),
            airPressure: result1.data.main.pressure,
            temp: result1.data.main.temp,
            feels: result1.data.main.feels_like,
            descrip: result1.data.weather[0].description,
            humidity: result1.data.main.humidity,
            speed: result.data.current.wind_kph,
            
            img1: result.data.forecast.forecastday[0].hour[0].condition.icon,
            temp1:result.data.forecast.forecastday[0].hour[0].temp_c,
            descrip1: result.data.forecast.forecastday[0].hour[0].condition.text,
            humidity1: result.data.forecast.forecastday[0].hour[0].humidity,
           
            temp2: result.data.forecast.forecastday[0].hour[3].temp_c,
            humidity2 : result.data.forecast.forecastday[0].hour[3].humidity,
            img2: result.data.forecast.forecastday[0].hour[3].condition.icon,
            descrip2 :result.data.forecast.forecastday[0].hour[3].condition.text,

            temp3: result.data.forecast.forecastday[0].hour[6].temp_c,
            humidity3 : result.data.forecast.forecastday[0].hour[6].humidity,
            img3: result.data.forecast.forecastday[0].hour[6].condition.icon,
            descrip3 :result.data.forecast.forecastday[0].hour[6].condition.text,

            temp4: result.data.forecast.forecastday[0].hour[9].temp_c,
            humidity4 : result.data.forecast.forecastday[0].hour[9].humidity,
            img4: result.data.forecast.forecastday[0].hour[9].condition.icon,
            descrip4 :result.data.forecast.forecastday[0].hour[9].condition.text,
            
            temp5: result.data.forecast.forecastday[0].hour[12].temp_c,
            humidity5 : result.data.forecast.forecastday[0].hour[12].humidity,
            img5: result.data.forecast.forecastday[0].hour[12].condition.icon,
            descrip5 :result.data.forecast.forecastday[0].hour[12].condition.text,

            temp6: result.data.forecast.forecastday[0].hour[15].temp_c,
            humidity6 : result.data.forecast.forecastday[0].hour[15].humidity,
            img6: result.data.forecast.forecastday[0].hour[15].condition.icon,
            descrip6 :result.data.forecast.forecastday[0].hour[15].condition.text,

            temp7: result.data.forecast.forecastday[0].hour[18].temp_c,
            humidity7 : result.data.forecast.forecastday[0].hour[18].humidity,
            img7: result.data.forecast.forecastday[0].hour[18].condition.icon,
            descrip7 :result.data.forecast.forecastday[0].hour[18].condition.text,

            temp8: result.data.forecast.forecastday[0].hour[21].temp_c,
            humidity8 : result.data.forecast.forecastday[0].hour[21].humidity,
            img8: result.data.forecast.forecastday[0].hour[21].condition.icon,
            descrip8 :result.data.forecast.forecastday[0].hour[21].condition.text,

        
        })

    
    }
    
    
    
    catch(error){
        res.send(error.message);
        console.log(error.message);
    }
    
})






app.listen(3000,()=>{
    console.log("The server is running");
})






