const axios = require('axios');

class Busquedas{

    historial = [];

    constructor(){
        //TODO: Leer db si existe
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }

    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        }
    }

    async ciudad (lugar = ''){
        
        //peticion http
        
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();

            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

            
        } catch (error) {
            return [];
        }
    }

    async climarLugar( lat,log ){
        
        try {
            
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}`,
                params: this.paramsOpenWeather
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;
            
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
          

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Busquedas;

