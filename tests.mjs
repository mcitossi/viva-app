import test from 'node:test';import assert from 'node:assert/strict';
import {dateKey,slots,nutrition,totals,dueItems} from './core.js';import {foodProvider} from './foods.js';
test('orari inclusivi con minuti e fine non allineata',()=>{assert.deepEqual(slots('07:30','10:00'),['07:30','08:30','09:30']);assert.equal(slots('07:00','22:00').length,16);assert.deepEqual(slots('08:00','08:00'),['08:00'])});
test('calcolo porzioni e somme senza arrotondamenti intermedi',()=>{const food={kcal:200,protein:10,carbs:30,fat:5};assert.deepEqual(nutrition(food,150),{kcal:300,protein:15,carbs:45,fat:7.5});assert.equal(totals([{food,grams:150},{food,grams:50}]).kcal,400);assert.equal(totals([]).kcal,0)});
test('scadenze escludono attività completate e future',()=>{const d={wake:'07:00',end:'10:00',water:{'07:00':true},routine:[{id:'a',name:'A',time:'08:00'},{id:'b',name:'B',time:'09:00'}],taken:{a:true}};assert.deepEqual(dueItems(d,new Date(2026,8,22,8,30)).map(x=>x.key),['water:08:00'])});
test('database asincrono e ricerca case insensitive',async()=>{const found=await foodProvider.search('RISO');assert.ok(found.length>=6);assert.ok(found.some(f=>f.name==='Riso basmati, crudo'));assert.ok(found.some(f=>f.name==='Riso integrale, cotto bollito'));assert.equal((await foodProvider.get('riso')).kcal,365)});
test('date locali',()=>assert.equal(dateKey(new Date(2026,0,2,23,30)),'2026-01-02'));

import {planFoods} from './plan-foods.js';
test('catalogo verificato: id unici, valori e fonti presenti',()=>{assert.equal(new Set(planFoods.map(f=>f.id)).size,planFoods.length);for(const f of planFoods){for(const key of ['kcal','protein','carbs','fat'])assert.ok(Number.isFinite(f[key])&&f[key]>=0);assert.ok(f.source.startsWith('https://'))}});
test('FAGE e Wasa: porzioni calcolate dalle etichette',async()=>{assert.equal(nutrition(await foodProvider.get('fage-total-0'),200).kcal,108);assert.equal(nutrition(await foodProvider.get('wasa-integrale'),40).kcal,135.2)});
test('alimenti personali e snapshot dei pasti restano indipendenti',async()=>{const custom={id:'custom-test',name:'Prova personale',kcal:100,protein:10,carbs:12,fat:2};assert.equal((await foodProvider.search('PERSONALE',[custom])).length,1);const snapshot={...(await foodProvider.get('fage-total-0'))};snapshot.kcal=99;assert.equal((await foodProvider.get('fage-total-0')).kcal,54)});
