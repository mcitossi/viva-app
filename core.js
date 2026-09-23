export const dateKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const minutes=t=>Number(t.slice(0,2))*60+Number(t.slice(3));
export function slots(wake,end){const result=[];for(let m=minutes(wake);m<=minutes(end);m+=60)result.push(`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`);return result}
export function nutrition(food,grams){return Object.fromEntries(['kcal','protein','carbs','fat'].map(k=>[k,food[k]*grams/100]))}
export function totals(meals){return meals.reduce((a,m)=>{const n=nutrition(m.food,m.grams);for(const k in a)a[k]+=n[k];return a},{kcal:0,protein:0,carbs:0,fat:0})}
export function dueItems(day,now){const m=now.getHours()*60+now.getMinutes();return [...slots(day.wake,day.end).filter(t=>minutes(t)<=m&&!day.water[t]).map(t=>({key:`water:${t}`,time:t,label:`Acqua · ${t}`})),...day.routine.filter(s=>minutes(s.time)<=m&&!day.taken[s.id]).map(s=>({key:`supp:${s.id}`,time:s.time,label:`${s.name} · ${s.time}`}))]}
