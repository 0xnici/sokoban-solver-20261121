import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,X=[0,0,-1,1],Y=[-1,1,0,0],C='udlr',S=(a,b)=>a-b;
const solve=t=>{
const r=t.split('\n').filter(x=>x.length),H=r.length,W=Math.max(...r.map(x=>x.length)),N=W*H,w=new Uint8Array(N).fill(1),g=new Uint8Array(N);
let B=[],p=0;
for(let i=0;i<N;i++){const x=i%W,y=i/W|0,c=r[y][x]||'#';if(c!='#')w[i]=0;if('.*+'.includes(c))g[i]=1;if('$*'.includes(c))B.push(i);if('@+'.includes(c))p=i;}
B.sort(S);
const hY=p/W|0,fl=new Uint8Array(N),a2=new Uint8Array(N);
for(let i=0;i<N;i++){fl[i]=1-w[i];a2[i]=fl[i]&&(i/W|0)!=hY?1:0;}
const bfs=(a,oc,al)=>{const v=new Int32Array(N).fill(-1),d=new Int8Array(N),q=[a];v[a]=a;for(const c of q){const x=c%W,y=c/W|0;for(let j=0;j<4;j++){const nx=x+X[j],ny=y+Y[j];if(nx<0||nx>=W||ny<0||ny>=H)continue;const n=ny*W+nx;if(v[n]>=0||!al[n]||oc&&oc[n])continue;v[n]=c;d[n]=j;q.push(n);}}return[v,d,q];};
const walk=(a,b,oc,al)=>{const[v,d]=bfs(a,oc,al);if(v[b]<0)return null;let s='',x=b;while(x!=a){s=C[d[x]]+s;x=v[x];}return s;};
const R=[];
for(let s=0;s<N;s++){if(!a2[s]||R.some(r=>r.includes(s)))continue;const[,,cs]=bfs(s,0,a2);R.push(cs);}
const M=[];
for(const cs of R){const rb=B.filter(b=>cs.includes(b)),rg=cs.filter(c=>g[c]);if(!rb.length)continue;if(rb.length!=rg.length)return'';let e=-1;for(const c of cs){const y=c/W|0;if(y==hY-1&&!w[c+W])e=c+W;if(y==hY+1&&!w[c-W])e=c-W;}if(e<0)return'';M.push({cs,rb,rg,e});}
const oc=new Uint8Array(N);for(const b of B)oc[b]=1;
const rs=rm=>{const al=new Uint8Array(N);for(const c of rm.cs)al[c]=1;al[rm.e]=1;
const P=[rm.e],Q=[rm.rb.slice()],PR=[-1],PD=[-1],sn=new Set([rm.e+':'+rm.rb.join(',')]);
if(rm.rb.every(b=>g[b]))return{m:'',e:rm.e};
const bd=h=>{let s='';for(let k=h;PR[k]>=0;k=PR[k]){const pp=PR[k],d=PD[k],pb=P[k],o=new Uint8Array(N);for(const b of Q[pp])o[b]=1;const wk=walk(P[pp],pb-(Y[d]*W+X[d]),o,al);if(wk==null)return null;s=wk+C[d]+s;}return s;};
let e2=0;
for(let h=0;h<P.length;h++){if(++e2>4e5)return null;const p=P[h],bs=Q[h],o=new Uint8Array(N);for(const b of bs)o[b]=1;const[v]=bfs(p,o,al);
for(let bi=0;bi<bs.length;bi++){const b=bs[bi];for(let d=0;d<4;d++){const tt=b+Y[d]*W+X[d],st=b-(Y[d]*W+X[d]);if(!al[tt]||tt==rm.e||o[tt]||v[st]<0)continue;
if(!g[tt]&&(w[tt-1]||w[tt+1])&&(w[tt-W]||w[tt+W]))continue;
const n2=bs.slice();n2[bi]=tt;n2.sort(S);const k=b+':'+n2.join(',');if(sn.has(k))continue;sn.add(k);P.push(b);Q.push(n2);PR.push(h);PD.push(d);if(n2.every(b=>g[b])){const s=bd(P.length-1);if(s!=null)return{m:s,e:b};}}}}
return null;};
let mv='',pl=p;
for(const rm of M){const wk=walk(pl,rm.e,oc,fl);if(wk==null)return mv;mv+=wk;pl=rm.e;const s=rs(rm);if(!s)return mv;mv+=s.m;pl=s.e;for(const b of rm.rb)oc[b]=0;for(const b of rm.rg)oc[b]=1;}
return mv;};
for(const id of readdirSync(I)){const mv=solve(readFileSync(I+'/'+id+'/level.txt','utf8'));mkdirSync(O+'/'+id,{recursive:true});writeFileSync(O+'/'+id+'/solution.txt',mv);}
