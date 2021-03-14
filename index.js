require('dotenv').config();

const { inquirerMenu,pausa, leerInput,listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    let opt;
    const busquedas = new Busquedas();

    do{

        opt = await inquirerMenu();

        switch (opt) {

            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                //buscar los lugares
                const lugares = await busquedas.ciudad( termino );
                const id = await listarLugares(lugares);
                //seleccionar el lugar
                const lugarSel = lugares.find( l => l.id === id );

                //clima
                const clima = await busquedas.climarLugar(lugarSel.lat,lugarSel.lng);
                console.log(clima);
                //mostrar informacion del clima

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ',lugarSel.nombre);
                console.log('Lat: ',lugarSel.lat);
                console.log('Lng: ',lugarSel.lng);
                console.log('Temperatura: ',clima.temp);
                console.log('Minima: ',clima.min);
                console.log('Maxima: ',clima.max);
                console.log('Como esta el clima: ',clima.desc);
                break;
        }

        if(opt !== 0) await pausa();

    }while(opt !== 0);

}
main();