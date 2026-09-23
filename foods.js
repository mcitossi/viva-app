import {planFoods} from './plan-foods.js';
// Valori indicativi per 100 g di parte edibile: verificare le etichette dei prodotti.
// Contratto asincrono sostituibile con un provider API; ogni risultato usa lo stesso schema.
const rows = [
['avena','Fiocchi d’avena',389,16.9,66.3,6.9],['latte','Latte parzialmente scremato',46,3.3,4.9,1.6],['yogurt','Yogurt greco bianco 0%',59,10.3,3.6,.4],['pane','Pane integrale',247,13,41,4.2],['uovo','Uovo intero, senza guscio',143,12.6,.7,9.5],['banana','Banana, senza buccia',89,1.1,22.8,.3],['mela','Mela con buccia',52,.3,13.8,.2],['arancia','Arancia, senza buccia',47,.9,11.8,.1],['riso','Riso bianco, crudo',365,7.1,80,.7],['risoc','Riso bianco, cotto',130,2.7,28.2,.3],['pasta','Pasta di semola, cruda',371,13,74.7,1.5],['pastac','Pasta di semola, cotta',158,5.8,30.9,.9],['pollo','Petto di pollo, crudo',120,22.5,0,2.6],['tacchino','Petto di tacchino, crudo',114,23.7,0,1.5],['salmone','Salmone, crudo',208,20,0,13],['tonno','Tonno al naturale, sgocciolato',116,25.5,0,.8],['ceci','Ceci cotti, scolati',164,8.9,27.4,2.6],['lenticchie','Lenticchie cotte, scolate',116,9,20.1,.4],['tofu','Tofu al naturale',76,8.1,1.9,4.8],['patate','Patate lesse',87,1.9,20.1,.1],['zucchine','Zucchine crude',17,1.2,3.1,.3],['broccoli','Broccoli crudi',34,2.8,6.6,.4],['pomodoro','Pomodoro crudo',18,.9,3.9,.2],['carota','Carota cruda',41,.9,9.6,.2],['olio','Olio extravergine d’oliva',884,0,0,100],['mandorle','Mandorle',579,21.2,21.6,49.9],['noci','Noci sgusciate',654,15.2,13.7,65.2],['parmigiano','Parmigiano',402,32,0,30],['mozzarella','Mozzarella vaccina',253,18.7,.7,19.5]
];
const starterFoods=rows.map(([id,name,kcal,protein,carbs,fat])=>({id,name,kcal,protein,carbs,fat}));
export const foods=[...planFoods,...starterFoods];
export const foodProvider={
 async search(query='',customFoods=[]){return [...customFoods,...foods].filter(f=>f.name.toLocaleLowerCase('it').includes(query.toLocaleLowerCase('it')))},
 async get(id,customFoods=[]){return [...customFoods,...foods].find(f=>f.id===id)}
};
