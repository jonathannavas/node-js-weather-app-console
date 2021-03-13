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

    async ciudad (lugar = ''){
        
        //peticion http
        
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();

            console.log(resp.data);

            
        } catch (error) {
            return [];
        }

        return []; //retornar las ciudades o lugares que coincidan con este lugar
    }

}

module.exports = Busquedas;

