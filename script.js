const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const ASSET = "assets/";
const APP_VERSION = "stage3-5-user-listings-2026-10-20";
let currentUser = readStore("kossbill-auth-session", null);
let properties = [];
let compareIds = new Set(Array.isArray(readStore(accountKey("compare"), [])) ? readStore(accountKey("compare"), []).map(Number) : []);
let propertyMapInstance = null;
const state = {view:"home",filter:"Semua",query:"",sort:"recommended",selected:null,lastView:"search",booking:null,userArea:"",minPrice:"",maxPrice:"",occupant:"",amenity:"",pendingBookId:null};
function readStore(key, fallback){try{const value=localStorage.getItem(key);return value===null?fallback:JSON.parse(value)}catch(error){console.warn(`KossBill: data lokal ${key} tidak valid; memakai nilai default.`,error);return fallback}}
let bookmarks = new Set(Array.isArray(readStore("kossbill-bookmarks", [])) ? readStore("kossbill-bookmarks", []) : []);
let bookings = Array.isArray(readStore("kossbill-bookings", [])) ? readStore("kossbill-bookings", []) : [];
let profile = readStore("kossbill-profile", {name:"Rosalina Yani",email:"rosalina@example.com"});
let toastTimer;
function accountScope(){return currentUser&&currentUser.email?String(currentUser.email).trim().toLowerCase():"guest";}
function accountKey(key){return `kossbill:${accountScope()}:${key}`;}
function loadAccountData(){
  bookmarks=new Set(Array.isArray(readStore(accountKey("bookmarks"),[]))?readStore(accountKey("bookmarks"),[]):[]);
  bookings=Array.isArray(readStore(accountKey("bookings"),[]))?readStore(accountKey("bookings"),[]):[];
  profile=readStore(accountKey("profile"),currentUser?{name:currentUser.name,email:currentUser.email}:{name:"",email:""});
  compareIds=new Set(Array.isArray(readStore(accountKey("compare"),[]))?readStore(accountKey("compare"),[]).map(Number):[]);
  chatMessages=readStore(accountKey("chat-messages"),{});
}
function clearAccountUI(){
  renderBookmarks();renderHistory();renderCompare();updateCounts();
  if(state.view==="profile")renderProfile();
  if(state.view==="chat")nav("home");
}
let viewStack = ["home"];
let chatProperty = null;
let chatMessages = readStore(accountKey("chat-messages"), {});
loadAccountData();
function users(){const value=readStore("kossbill-users", []);return Array.isArray(value)?value:[]}
async function hashPassword(value){if(window.crypto?.subtle){const bytes=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value));return [...new Uint8Array(bytes)].map(b=>b.toString(16).padStart(2,"0")).join("")}return "demo:"+value;}
function refreshAuthUI(){const name=currentUser?.name||"Masuk / Daftar";$(".profile-name").textContent=name;$(".avatar").textContent=currentUser?(name.trim()[0]||"U").toUpperCase():"U";}
function authMessage(id,msg,success=false){const el=$(id);el.textContent=msg;el.classList.toggle("success",success)}

function money(n){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n).replace(/\u00a0/g," ")}
function safe(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function notify(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
function save(){localStorage.setItem(accountKey("bookmarks"),JSON.stringify([...bookmarks]));localStorage.setItem(accountKey("bookings"),JSON.stringify(bookings));localStorage.setItem(accountKey("profile"),JSON.stringify(profile));localStorage.setItem(accountKey("compare"),JSON.stringify([...compareIds]));localStorage.setItem(accountKey("chat-messages"),JSON.stringify(chatMessages))}
function nav(view){if(state.view!==view){viewStack.push(view);if(viewStack.length>30)viewStack.shift()}state.view=view;const backBtn=$("#globalBack");if(backBtn)backBtn.classList.toggle("hidden",view==="home");$$(".view").forEach(v=>v.classList.toggle("active",v.id===`view-${view}`));$$("[data-nav]").forEach(b=>b.classList.toggle("active",b.dataset.nav===view));$$(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.nav===view));window.scrollTo({top:0,behavior:"smooth"});if(view==="search")renderSearch();if(view==="bookmarks")renderBookmarks();if(view==="history")renderHistory();if(view==="profile")renderProfile();if(view==="compare")renderCompare();if(view==="map")renderMap();updateCounts()}
function goBack(){if(viewStack.length>1){viewStack.pop();const prev=viewStack[viewStack.length-1];state.view=prev;navWithoutStack(prev)}else navWithoutStack("home")}
function navWithoutStack(view){state.view=view;$$ (".view").forEach(v=>v.classList.toggle("active",v.id===`view-${view}`));$$ ("[data-nav]").forEach(b=>b.classList.toggle("active",b.dataset.nav===view));const backBtn=$("#globalBack");if(backBtn)backBtn.classList.toggle("hidden",view==="home");window.scrollTo({top:0,behavior:"smooth"});if(view==="search")renderSearch();if(view==="bookmarks")renderBookmarks();if(view==="history")renderHistory();if(view==="profile")renderProfile();if(view==="chat")renderChat();if(view==="compare")renderCompare();if(view==="map")renderMap();updateCounts()}
function card(p){const saved=bookmarks.has(p.id), compared=compareIds.has(Number(p.id));const variants=p.roomOptions||[p];const prices=variants.map(v=>v.price).filter(v=>v!=null);const minPrice=prices.length?Math.min(...prices):null;const typeLabel=variants.length>1?`${variants.length} tipe kamar`:safe(p.type||"Kos");return `<article class="property-card"><div class="property-image"><img src="${ASSET+p.image}" alt="${safe("Foto "+p.name)}" loading="lazy"><span class="image-badge">${safe(p.badge||"Kos")}</span><button class="heart-btn ${saved?"saved":""}" data-heart="${p.id}" aria-label="${saved?"Hapus dari":"Simpan ke"} wishlist">${saved?"♥":"♡"}</button></div><div class="property-body"><div class="property-title-row"><div><h3>${safe(p.displayName||p.name)}</h3><div class="location"><span>⌖</span>${safe(p.location)}</div></div></div><div class="property-tags"><span class="tag">${typeLabel}</span><span class="tag">${safe(p.distance||"Lihat lokasi")}</span>${variants.length>1?'<span class="tag">Pilih tipe kamar</span>':''}</div><div class="property-bottom"><div class="price">${minPrice!=null?`${money(minPrice)}<small> / bln mulai</small>`:`<small>${safe(p.priceLabel||"Hubungi pengelola untuk harga")}</small>`}</div><div class="card-actions"><button class="detail-btn" data-detail="${p.id}">Detail →</button><button class="compare-btn ${compared?'selected':''}" data-compare="${p.id}" aria-pressed="${compared}">${compared?'✓ Dipilih':'⇄ Bandingkan'}</button></div></div></div></article>`}
function renderCards(el,arr){$(el).innerHTML=arr.map(card).join("");}
function skeletonCards(el,count=3){$(el).innerHTML=Array.from({length:count},()=>`<article class="property-card skeleton-card" aria-hidden="true"><div class="skeleton-block skeleton-image"></div><div class="property-body"><div class="skeleton-block skeleton-line wide"></div><div class="skeleton-block skeleton-line"></div><div class="skeleton-block skeleton-line short"></div><div class="skeleton-block skeleton-line wide"></div></div></article>`).join("");}
function setDataError(message){["#homeProperties","#searchProperties"].forEach(sel=>{const el=$(sel);if(el){el.classList.remove("hidden");el.innerHTML=`<div class="data-error" role="alert"><b>Data kos belum dapat dimuat.</b><p>${safe(message)}</p><button class="secondary-btn" type="button" id="retryData">Coba lagi</button></div>`}});const status=$("#searchStatus");if(status)status.textContent="Gagal memuat data. Gunakan tombol Coba lagi.";}
function propertyGroupKey(p){let n=String(p.name||"").toLowerCase().replace(/^(kost|kos)\s+/,"").replace(/\s+tipe\s+non\s+ac$/i,"").replace(/\s+tipe\s+[a-z0-9]+$/i,"").replace(/\s+non\s+ac$/i,"").replace(/\s+vvip$/i,"").replace(/\s+ac$/i,"").trim();return n.replace(/\s+/g," ")}
function buildPropertyGroups(data){const groups=new Map();for(const p of data){const key=propertyGroupKey(p);if(!groups.has(key))groups.set(key,{...p,displayName:p.name,roomOptions:[]});groups.get(key).roomOptions.push(p)}return [...groups.values()].map(g=>{g.roomOptions.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));const prices=g.roomOptions.map(v=>v.price).filter(v=>v!=null);g.price=prices.length?Math.min(...prices):null;return g})}
async function loadProperties(){
  skeletonCards("#homeProperties",3); skeletonCards("#searchProperties",4);
  try {
    const response=await fetch("data/properties.json",{headers:{Accept:"application/json"}});
    if(!response.ok) throw new Error(`Server merespons ${response.status}.`);
    const data=await response.json();
    if(!Array.isArray(data)||!data.length) throw new Error("Sumber data kosong atau formatnya tidak sesuai.");
    const validData=data.filter(p=>p&&p.id!==undefined&&p.name&&p.location&&p.image);
    if(!validData.length) throw new Error("Data JSON berhasil dibaca tetapi tidak memiliki listing valid (id, name, location, image). ");
    if(validData.length!==data.length) console.warn(`KossBill: ${data.length-validData.length} listing diabaikan karena data wajib tidak lengkap.`);
    properties=buildPropertyGroups(validData);
    $("#dataVersion")?.replaceChildren(document.createTextNode(`${APP_VERSION} · ${validData.length} data sumber`));
    $("#homeProperties").setAttribute("aria-busy","false");$("#searchProperties").setAttribute("aria-busy","false");
    renderCards("#homeProperties",properties.slice(0,3));renderSearch();

renderBookmarks();renderHistory();renderProfile();renderCompare();refreshAuthUI();updateCounts();
  } catch(error) {
    console.error("KossBill data loading error:",error);
    setDataError("Periksa koneksi Live Server dan file data/properties.json, lalu coba lagi.");$("#homeProperties").setAttribute("aria-busy","false");$("#searchProperties").setAttribute("aria-busy","false");
    notify("Gagal memuat data kos. Silakan coba lagi.");
  }
}
function updateCounts(){$(".wishlist-count").textContent=bookmarks.size;$("#bookmarkCount").textContent=`${bookmarks.size} kos disimpan`;const cc=$("#compareQuickCount");if(cc)cc.textContent=compareIds.size}
function normalizeText(value){return String(value??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("id-ID").trim()}
function matches(p){
  const q=normalizeText(state.query);
  const variants=p.roomOptions||[p];
  const searchable=[p.name,p.displayName,p.location,p.address,p.type,p.desc,p.description,p.sourceName,p.sourceUrl,p.mapsUrl,...(p.features||[]),...variants.flatMap(v=>[v.name,v.type,v.desc,v.description,...(v.features||[])])].filter(Boolean).join(" ");
  const queryMatch=!q||normalizeText(searchable).includes(q);
  const area=normalizeText(state.userArea);
  const areaText=normalizeText([p.location,p.address,p.name,p.displayName].filter(Boolean).join(" "));
  const nearMatch=state.filter!=="Terdekat"||(area.length>0&&areaText.includes(area));
  const categoryMatch=state.filter==="Semua"||state.filter==="Terdekat"||(p.category||[]).includes(state.filter)||(state.filter==="Termurah"&&p.price!=null&&p.price<=900000);
  const priceList=variants.map(v=>Number(v.price)).filter(v=>Number.isFinite(v)&&v>=0);
  const lowest=priceList.length?Math.min(...priceList):null;
  const highest=priceList.length?Math.max(...priceList):null;
  const min=state.minPrice===""?null:Number(state.minPrice), max=state.maxPrice===""?null:Number(state.maxPrice);
  const priceMatch=(min===null||!Number.isFinite(min)||highest!==null&&highest>=min)&&(max===null||!Number.isFinite(max)||lowest!==null&&lowest<=max);
  const occupantMatch=!state.occupant||variants.some(v=>normalizeText(v.type||"").includes(normalizeText(state.occupant)));
  const amenityMatch=!state.amenity||variants.some(v=>(v.features||[]).some(f=>normalizeText(f).includes(normalizeText(state.amenity))));
  return queryMatch&&categoryMatch&&nearMatch&&priceMatch&&occupantMatch&&amenityMatch;
}
function filtered(){let arr=properties.filter(matches);if(state.sort==="low")arr.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));if(state.sort==="high")arr.sort((a,b)=>(b.price??-Infinity)-(a.price??-Infinity));if(state.filter==="Termurah"&&state.sort==="recommended")arr.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));return arr}
function renderSearch(){const arr=filtered();renderCards("#searchProperties",arr);$("#resultCount").textContent=`${arr.length} pilihan`;$("#emptyState").classList.toggle("hidden",arr.length!==0);$("#searchProperties").classList.toggle("hidden",arr.length===0);$$(".filter-chip").forEach(b=>b.classList.toggle("selected",b.dataset.filter===state.filter));const status=$("#searchStatus");if(status)status.textContent=properties.length?`Memuat ${arr.length} dari ${properties.length} pilihan kos.`:"Data kos belum tersedia.";}
function renderBookmarks(){const arr=properties.filter(p=>bookmarks.has(p.id));renderCards("#bookmarkProperties",arr);$("#bookmarkEmpty").classList.toggle("hidden",arr.length!==0);$("#bookmarkCount").textContent=`${arr.length} kos disimpan`}
function renderHistory(){const list=$("#historyList");if(!list)return;$("#historyCount").textContent=`${bookings.length} pemesanan`;$("#historyEmpty").classList.toggle("hidden",bookings.length!==0);list.innerHTML=[...bookings].reverse().map(b=>{const p=properties.find(x=>String(x.id)===String(b.propertyId))||properties.find(x=>(x.roomOptions||[]).some(v=>String(v.id)===String(b.propertyId)))?.roomOptions?.find(v=>String(v.id)===String(b.propertyId))||properties.find(x=>x.id===Number(b.propertyId))||null;if(!p&&!b.propertyName)return "";const shown=p||{name:b.propertyName,displayName:b.propertyName,location:"Lokasi menunggu konfirmasi",image:""};const status=safe(b.status||"Menunggu konfirmasi");return `<article class="history-card"><img src="${ASSET+(shown.image||"Rectangle-7.jpg")}" alt="${safe(shown.name)}" loading="lazy"><div class="history-info"><h3>${safe(b.propertyName||shown.displayName||shown.name)}</h3><p>⌖ ${safe(shown.location||"Lokasi menunggu konfirmasi")}</p><p>◷ ${safe(b.startDate||"Tanggal belum tersedia")} · ${Number(b.duration)||1} bulan</p><p class="history-total">Total simulasi: <b>${b.total===null||b.total===undefined?"Menunggu konfirmasi harga":money(Number(b.total)||0)}</b></p><small class="history-reference">Referensi: KB-${String(b.id||"").slice(-7)}</small></div><span class="status ${/tolak|batal/i.test(status)?'cancelled':'pending'}">${status}</span></article>`}).join("")}
function contactAction(p){return `<button class="secondary-btn full-btn chat-owner" type="button" data-chat="${p.id}">💬 Chat pengelola di KossBill</button><p class="form-footnote">Chat internal demo. Pesan belum terkirim ke pengelola sampai backend chat dihubungkan.</p>`}
function openChat(id){const p=properties.find(x=>x.id===Number(id)) || state.selected;if(!p)return;if(!currentUser){state.pendingChatId=Number(id);notify("Masuk terlebih dahulu untuk menggunakan chat.");nav("login");return}chatProperty=p;$("#chatPropertyName").textContent=p.displayName||p.name;$("#chatPropertyMeta").textContent=p.location||"Properti KossBill";renderChat();nav("chat");}
function compareStore(){localStorage.setItem(accountKey("compare"),JSON.stringify([...compareIds]))}
function toggleCompare(id){id=Number(id);if(compareIds.has(id)){compareIds.delete(id);notify("Kos dihapus dari perbandingan.")}else{if(compareIds.size>=3){notify("Maksimal tiga kos dapat dibandingkan.");return}if(!properties.some(p=>Number(p.id)===id)){notify("Kos tidak ditemukan.");return}compareIds.add(id);notify("Kos ditambahkan ke perbandingan.")}compareStore();if(state.view==="search")renderSearch();renderCompare();updateCounts();}
function renderCompare(){const target=$("#compareContent");if(!target)return;const items=[...compareIds].map(id=>properties.find(p=>Number(p.id)===Number(id))).filter(Boolean);$("#compareHeadingCount").textContent=`${items.length} dari 3 kos`;
$("#compareEmpty").classList.toggle("hidden",items.length>0);target.classList.toggle("hidden",items.length===0);if(!items.length){target.innerHTML="";return}
const rows=[['Harga mulai',p=>{const prices=(p.roomOptions||[p]).map(v=>v.price).filter(v=>v!=null);return prices.length?money(Math.min(...prices))+" / bulan":(p.priceLabel||"Belum tersedia")}],['Lokasi',p=>p.location||"Belum tersedia"],['Tipe penghuni',p=>p.type||"Tanyakan pengelola"],['Fasilitas',p=>(p.features||[]).join(", ")||"Konfirmasi ke pengelola"],['Pilihan tipe kamar',p=>`${(p.roomOptions||[p]).length} tipe`],['Sumber',p=>p.sourceUrl?`<a href="${safe(p.sourceUrl)}" target="_blank" rel="noopener noreferrer">Buka sumber ↗</a>`:"Belum tersedia"]];
target.innerHTML=`<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Informasi</th>${items.map(p=>`<th><div class="compare-property"><img src="${ASSET+p.image}" alt=""><b>${safe(p.displayName||p.name)}</b><button class="compare-remove" data-compare="${p.id}">Hapus</button><button class="detail-btn" data-detail="${p.id}">Lihat detail</button></div></th>`).join("")}</tr></thead><tbody>${rows.map(([label,get])=>`<tr><th>${label}</th>${items.map(p=>`<td>${get(p)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}
function mapCoords(p){
  const c=p.coordinates||p.coords;
  if(!c)return null;
  const lat=Number(c.lat),lng=Number(c.lng??c.lon);
  return Number.isFinite(lat)&&Number.isFinite(lng)?{lat,lng,verified:true}:null;
}
function googleMapsSearchUrl(p){
  if(p.mapsUrl&&/^https?:\/\//i.test(p.mapsUrl))return p.mapsUrl;
  const query=[p.displayName||p.name,p.address||p.location,"Purwokerto Banyumas"].filter(Boolean).join(", ");
  return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(query);
}
function clearGoogleMapEmbed(){
  const old=$("#mapGoogleEmbed");if(old)old.remove();
  if($("#propertyMap"))$("#propertyMap").classList.remove("has-google-embed");
}
function showGoogleMapEmbed(p){
  const map=$("#propertyMap");if(!map)return;
  clearGoogleMapEmbed();
  const address=[p.displayName||p.name,p.address||p.location,"Purwokerto Banyumas Jawa Tengah"].filter(Boolean).join(", ");
  const frame=document.createElement("iframe");
  frame.id="mapGoogleEmbed";
  frame.title=`Peta Google Maps untuk ${p.displayName||p.name}`;
  frame.src="https://maps.google.com/maps?q="+encodeURIComponent(address)+"&output=embed";
  frame.loading="lazy";
  frame.referrerPolicy="no-referrer-when-downgrade";
  frame.allowFullscreen=true;
  frame.setAttribute("aria-label",`Lokasi ${p.displayName||p.name} di Google Maps`);
  map.appendChild(frame);
  map.classList.add("has-google-embed");
}
function populateMapSuggestions(){
  const dl=$("#mapPropertySuggestions");if(!dl)return;
  dl.innerHTML=properties.map(p=>`<option value="${safe(p.displayName||p.name)}">${safe(p.address||p.location||"")}</option>`).join("");
  $("#mapCount").textContent=`${properties.length} pilihan kos`;
}
function renderMap(){
  if(!$("#propertyMap"))return;
  populateMapSuggestions();
  if(window.L&&!propertyMapInstance){
    propertyMapInstance=L.map("propertyMap").setView([-7.424,109.239],12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'}).addTo(propertyMapInstance);
  }
  if(propertyMapInstance){
    propertyMapInstance.eachLayer(layer=>{if(layer instanceof L.Marker)propertyMapInstance.removeLayer(layer)});
    const known=properties.filter(p=>mapCoords(p));
    known.forEach(p=>{const c=mapCoords(p);L.marker([c.lat,c.lng]).addTo(propertyMapInstance).bindPopup(`<b>${safe(p.displayName||p.name)}</b><br>${safe(p.location||p.address||"")}<br>${p.price!=null?money(p.price)+" / bulan":"Harga belum tersedia"}`)});
    if(known.length){
      const bounds=L.latLngBounds(known.map(p=>{const c=mapCoords(p);return [c.lat,c.lng]}));
      propertyMapInstance.fitBounds(bounds.pad(.18));
    }
    setTimeout(()=>propertyMapInstance.invalidateSize(),100);
  }
  const notice=$("#mapNotice");
  if(notice)notice.textContent="Cari berdasarkan nama kos. Pin yang berasal dari koordinat tersimpan lebih akurat; jika koordinat belum tersedia, sistem mencoba mencari alamat dan akan memberi tahu jika hasilnya hanya perkiraan.";
}
async function searchMapProperty(query){
  const result=$("#mapSearchResult"),notice=$("#mapNotice"),button=$("#mapSearchButton");
  const q=String(query||"").trim();
  if(!q){result.textContent="Masukkan nama kos terlebih dahulu.";return}
  const normalized=normalizeText(q);
  let exact=properties.find(p=>normalizeText(p.displayName||p.name)===normalized);
  let candidates=exact?[exact]:properties.filter(p=>normalizeText([p.displayName,p.name,p.address,p.location].filter(Boolean).join(" ")).includes(normalized));
  if(!candidates.length){
    result.textContent=`Kos “${q}” belum ditemukan dalam ${properties.length} listing. Coba pilih nama dari saran pencarian.`;
    $("#mapGoogleLink").classList.add("hidden");$("#mapSelectedDetail").classList.add("hidden");
    return;
  }
  if(candidates.length>1&&!exact){
    const names=candidates.slice(0,5).map(p=>p.displayName||p.name).join(", ");
    result.textContent=`Ditemukan beberapa kos yang cocok: ${names}. Pilih nama lengkap dari saran, lalu cari lagi.`;
    return;
  }
  const p=candidates[0],name=p.displayName||p.name;
  button.disabled=true;button.textContent="Mencari lokasi…";
  clearGoogleMapEmbed();
  $("#mapSelectedName").textContent=name;
  const googleLink=$("#mapGoogleLink");googleLink.href=googleMapsSearchUrl(p);googleLink.classList.remove("hidden");
  const detailButton=$("#mapSelectedDetail");detailButton.dataset.detail=p.id;detailButton.classList.remove("hidden");
  try{
    let coords=mapCoords(p),accuracy=coords?"Koordinat tersimpan pada data listing.":"";
    if(!coords){
      const cache=readStore("kossbill-map-geocode-cache",{});
      const cacheKey=String(p.id);
      if(cache[cacheKey]&&Number.isFinite(Number(cache[cacheKey].lat))&&Number.isFinite(Number(cache[cacheKey].lng))){
        coords={lat:Number(cache[cacheKey].lat),lng:Number(cache[cacheKey].lng),verified:false};accuracy="Lokasi perkiraan dari pencarian alamat (bukan titik bangunan terverifikasi).";
      }else{
        const queryAddress=[p.address,p.location,"Banyumas Jawa Tengah Indonesia"].filter(Boolean).join(", ");
        const url="https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=id&q="+encodeURIComponent(queryAddress);
        const response=await fetch(url,{headers:{"Accept":"application/json"}});
        if(!response.ok)throw new Error("Layanan pencarian alamat sedang tidak tersedia.");
        const data=await response.json();
        if(data&&data.length){
          coords={lat:Number(data[0].lat),lng:Number(data[0].lon),verified:false};
          cache[cacheKey]={lat:coords.lat,lng:coords.lng,displayName:data[0].display_name||"",savedAt:Date.now()};
          localStorage.setItem("kossbill-map-geocode-cache",JSON.stringify(cache));
          accuracy="Lokasi perkiraan berdasarkan pencarian alamat; pastikan titik bangunan di Google Maps sebelum menganggapnya akurat.";
        }
      }
    }
    if(coords&&propertyMapInstance){
      propertyMapInstance.eachLayer(layer=>{if(layer instanceof L.Marker&&!layer._kossbillKnown)propertyMapInstance.removeLayer(layer)});
      const marker=L.marker([coords.lat,coords.lng]).addTo(propertyMapInstance);
      marker.bindPopup(`<b>${safe(name)}</b><br>${safe(p.address||p.location||"Alamat belum tersedia")}<br>${coords.verified?"Koordinat tersimpan":"Pin perkiraan alamat"}`).openPopup();
      propertyMapInstance.setView([coords.lat,coords.lng],17,{animate:true});
      result.textContent=`Lokasi peta: ${name}. ${accuracy}`;
      notice.textContent=coords.verified?"Pin memakai koordinat yang tersimpan pada data kos.":"Pin ini hasil geocoding alamat dan mungkin menunjuk area jalan/lingkungan, bukan tepat di bangunan kos.";
    }else{
      showGoogleMapEmbed(p);
      result.textContent=`Peta Google Maps ditampilkan untuk ${name}. Periksa pin dan nama tempat di peta untuk memastikan titiknya benar.`;
      notice.textContent="Koordinat tidak tersedia dari pencarian otomatis, jadi peta Google Maps ditampilkan langsung berdasarkan nama dan alamat kos.";
    }
  }catch(error){
    console.warn("Pencarian lokasi otomatis gagal; menampilkan Google Maps embed:",error);
    showGoogleMapEmbed(p);
    result.textContent=`Peta Google Maps ditampilkan untuk ${name} berdasarkan nama dan alamat kos. Periksa kembali titiknya karena koordinat bangunan belum terverifikasi.`;
    notice.textContent="Pencarian koordinat otomatis tidak berhasil. Google Maps ditampilkan sebagai alternatif, tanpa mengarang koordinat.";
  }finally{
    button.disabled=false;button.textContent="⌕ Cari di peta";
  }
}

function renderChat(){if(!chatProperty)return;const key=String(chatProperty.id);const list=chatMessages[key]||[];const el=$("#chatMessages");el.innerHTML=list.length?list.map(m=>`<div class="chat-message ${m.from==="user"?"mine":"theirs"}"><p>${safe(m.text)}</p><small>${new Date(m.at).toLocaleString("id-ID",{dateStyle:"short",timeStyle:"short"})}</small></div>`).join(""):`<div class="chat-welcome"><span>💬</span><h3>Mulai percakapan</h3><p>Tanyakan harga, fasilitas, ketersediaan kamar, atau jadwal survei kepada pengelola.</p><button type="button" class="suggested-message" data-chat-suggest="Apakah kamar masih tersedia?">Apakah kamar masih tersedia?</button><button type="button" class="suggested-message" data-chat-suggest="Boleh minta informasi fasilitas dan harga?">Tanya fasilitas dan harga</button></div>`;el.scrollTop=el.scrollHeight;}

function showDetail(id,variantId=null){const group=properties.find(x=>x.id===Number(id));if(!group)return;const options=group.roomOptions||[group];const p=variantId?options.find(x=>String(x.id)===String(variantId))||options[0]:options[0];state.selected=p;state.selectedGroup=group;state.lastView=state.view==="bookmarks"?"bookmarks":"search";const optionsHtml=options.length>1?`<div class="detail-panel room-options-panel"><h3>Pilih tipe kamar</h3><p class="muted">Pilih tipe kamar yang sesuai kebutuhanmu.</p><div class="room-options">${options.map(v=>`<button class="room-option ${v.id===p.id?"selected":""}" data-select-variant="${v.id}" data-parent="${group.id}"><span><b>${safe(v.name)}</b><small>${safe(v.type||"Tipe kamar")}</small></span><strong>${v.price!=null?money(v.price)+" / bln":"Tanya harga"}</strong></button>`).join("")}</div></div>`:"";const sourceUrl=p.mapsUrl||p.sourceUrl;const detailPrice=p.price!=null?`${money(p.price)} <small>/ bulan</small>`:`<span>${safe(p.priceLabel||"Harga belum tersedia · hubungi pengelola")}</span>`;const bookingButton=`<button class="primary-btn full-btn" data-book="${group.id}" data-book-variant="${p.id}">${p.price!=null?"Pesan kos sekarang":"Ajukan pemesanan"} <span>→</span></button>`;$("#detailContent").innerHTML=`<div class="detail-layout"><div><img class="detail-main-image" src="${ASSET+p.image}" alt="${safe(p.name)}"><div class="detail-thumbs"><img src="${ASSET+p.image}" alt="Tampilan properti"><img src="${ASSET+p.interior||p.image}" alt="Interior kamar"><img src="${ASSET+"Rectangle-7-3.jpg"}" alt="Referensi area bersama"></div><div class="detail-panel"><h3>Deskripsi properti</h3><p class="detail-description">${safe(p.desc||"Informasi properti dapat dilihat melalui sumber yang tersedia.")}</p>${sourceUrl?`<p class="form-footnote">Sumber: <a href="${safe(sourceUrl)}" target="_blank" rel="noopener noreferrer">Buka ${safe(p.sourceName||"sumber properti")} ↗</a></p>`:""}<h3>Fasilitas</h3><div class="amenities">${(p.features||[]).map(f=>`<span class="amenity">✓ ${safe(f)}</span>`).join("")||'<span class="muted">Tanyakan fasilitas langsung kepada pengelola.</span>'}</div></div>${optionsHtml}</div><div class="detail-info"><span class="eyebrow">Detail properti</span><h1>${safe(group.displayName||group.name)}</h1><div class="location">⌖ ${safe(p.location)}</div><div class="detail-price">${detailPrice}</div><div class="detail-facts"><div class="fact"><span>Jenis penghuni</span><b>${safe(p.type||"Tanyakan pengelola")}</b></div><div class="fact"><span>Pilihan kamar</span><b>${options.length>1?`${options.length} tipe tersedia`:safe(p.type||"Lihat sumber")}</b></div></div><div class="detail-panel"><h3>Ringkasan biaya</h3><div class="summary-line"><span>Sewa per bulan</span><b>${p.price!=null?money(p.price):(p.priceLabel||"Hubungi pengelola")}</b></div><div class="summary-line"><span>Biaya layanan</span><b>${money(0)}</b></div><div class="summary-line total"><span>Total per bulan</span><b>${p.price!=null?money(p.price):(p.priceLabel||"Hubungi pengelola")}</b></div>${bookingButton}<p class="form-footnote">${p.price!=null?"Pemesanan merupakan simulasi untuk prototipe tugas.":"Periksa sumber untuk informasi harga dan pemesanan."}</p>${contactAction(p)}</div></div></div>`;nav("detail")}
function startBooking(id,variantId=null){const group=properties.find(x=>String(x.id)===String(id));let p=group||state.selected;if(group&&variantId!=null){p=(group.roomOptions||[group]).find(v=>String(v.id)===String(variantId))||group;}if(!p)return;if(!currentUser){state.pendingBookId=group?group.id:p.id;state.pendingBookVariantId=variantId==null?null:String(variantId);notify("Masuk atau daftar dulu untuk mengajukan pemesanan.");nav("login");return;}state.selected=p;state.selectedGroup=group||p;state.booking=null;$("#bookingForm").reset();$("#startDate").min=new Date().toISOString().slice(0,10);renderSummary();nav("booking")}
function renderSummary(){const p=state.selected;if(!p)return;const dur=Number($("#duration").value||1);const hasPrice=Number.isFinite(Number(p.price))&&p.price!==null&&p.price!=="";const total=hasPrice?Number(p.price)*dur:null;$("#bookingSummary").innerHTML=`<h3>Ringkasan pesanan</h3><div class="summary-property"><img src="${ASSET+p.image}" alt="${safe(p.name)}"><div><b>${safe(p.displayName||p.name)}</b><small>${safe(p.location)}</small></div></div><div class="summary-line"><span>Harga sewa</span><b>${hasPrice?money(Number(p.price))+" / bulan":safe(p.priceLabel||"Menunggu konfirmasi pengelola")}</b></div><div class="summary-line"><span>Durasi</span><b>${dur} bulan</b></div><div class="summary-line"><span>Biaya layanan</span><b>${money(0)}</b></div><div class="summary-line total"><span>Total simulasi</span><b>${total===null?"Menunggu konfirmasi harga":money(total)}</b></div><p class="form-footnote">${hasPrice?"Total ini hanya simulasi tampilan dan bukan tagihan nyata.":"Kamu tetap dapat mengajukan pemesanan. Harga final perlu dikonfirmasi oleh pengelola; tidak ada biaya yang ditagihkan."}</p>`}
function finishBooking(form){const data=new FormData(form);const name=String(data.get("fullname")||"").trim();const phone=String(data.get("phone")||"").replace(/[\s-]/g,"");const startDate=String(data.get("startDate")||"").trim();const duration=Number(data.get("duration"));
  if(name.length<3){form.elements.fullname.setCustomValidity("Nama minimal 3 karakter.");form.elements.fullname.reportValidity();form.elements.fullname.setCustomValidity("");return false;}
  if(!/^[0-9+]{9,15}$/.test(phone)){form.elements.phone.setCustomValidity("Masukkan nomor telepon 9–15 digit.");form.elements.phone.reportValidity();form.elements.phone.setCustomValidity("");return false;}
  if(!startDate||startDate<new Date().toISOString().slice(0,10)){form.elements.startDate.setCustomValidity("Tanggal mulai tidak boleh sebelum hari ini.");form.elements.startDate.reportValidity();form.elements.startDate.setCustomValidity("");return false;}
  const hasPrice=Number.isFinite(Number(state.selected.price))&&state.selected.price!==null&&state.selected.price!=="";const b={id:Date.now(),propertyId:state.selected.id,propertyName:state.selected.displayName||state.selected.name,name,phone,startDate,duration,payment:hasPrice?data.get("payment"):"Menunggu konfirmasi harga",notes:String(data.get("notes")||"").trim(),total:hasPrice?Number(state.selected.price)*duration:null,status:"Menunggu konfirmasi"};bookings.push(b);save();state.booking=b;$("#confirmationCard").innerHTML=`<div class="confirmation-row"><span>Nomor referensi</span><b>KB-${String(b.id).slice(-7)}</b></div><div class="confirmation-row"><span>Nama pemesan</span><b>${safe(b.name)}</b></div><div class="confirmation-row"><span>Properti</span><b>${safe(b.propertyName)}</b></div><div class="confirmation-row"><span>Mulai sewa</span><b>${safe(b.startDate)}</b></div><div class="confirmation-row"><span>Durasi sewa</span><b>${b.duration} bulan</b></div><div class="confirmation-row"><span>Metode pembayaran</span><b>${safe(b.payment)}</b></div><div class="confirmation-row"><span>Total simulasi</span><b style="color:var(--green)">${b.total===null?"Menunggu konfirmasi harga":money(b.total)}</b></div><p class="form-footnote">Status: Menunggu konfirmasi · Pembayaran tidak diproses. ${b.total===null?"Harga final harus dikonfirmasi oleh pengelola.":""}</p>`;nav("payment");return true;}
function renderProfile(){refreshAuthUI();$("#profileName").value=profile.name;$("#profileEmail").value=profile.email;$(".profile-name").textContent=profile.name;$(".avatar").textContent=(profile.name||"U").trim().charAt(0).toUpperCase()}
function updateProfile(){profile={name:$("#profileName").value.trim(),email:$("#profileEmail").value.trim()};if(currentUser){currentUser={...currentUser,...profile};localStorage.setItem("kossbill-auth-session",JSON.stringify(currentUser));}save();renderProfile();notify("Profil demo berhasil disimpan")}
function resetDemo(){if(!confirm("Reset wishlist dan riwayat pemesanan demo?"))return;bookmarks=new Set();bookings=[];save();renderBookmarks();renderHistory();updateCounts();notify("Data demo berhasil direset")}

document.addEventListener("click",e=>{if(e.target.closest("#retryData")){loadProperties();return}const n=e.target.closest("[data-nav]");if(n){e.preventDefault();nav(n.dataset.nav);return}const heart=e.target.closest("[data-heart]");if(heart){const id=Number(heart.dataset.heart);bookmarks.has(id)?(bookmarks.delete(id),notify("Dihapus dari wishlist")):(bookmarks.add(id),notify("Disimpan ke wishlist"));save();updateCounts();renderCards("#homeProperties",properties.slice(0,3));if(state.view==="search")renderSearch();if(state.view==="bookmarks")renderBookmarks();return}const compare=e.target.closest("[data-compare]");if(compare){toggleCompare(compare.dataset.compare);return}const variant=e.target.closest("[data-select-variant]");if(variant){showDetail(variant.dataset.parent,variant.dataset.selectVariant);return}const detail=e.target.closest("[data-detail]");if(detail){showDetail(detail.dataset.detail);return}const book=e.target.closest("[data-book]");if(book){startBooking(book.dataset.book,book.dataset.bookVariant);return}if(e.target.closest("[data-back]")||e.target.closest("#globalBack")){goBack();return}const chat=e.target.closest("[data-chat]");if(chat){openChat(chat.dataset.chat);return}const suggest=e.target.closest("[data-chat-suggest]");if(suggest){$("#chatInput").value=suggest.dataset.chatSuggest;$("#chatInput").focus();return}const cat=e.target.closest("[data-category]");if(cat){state.filter=cat.dataset.category;state.query="";if(state.filter!=="Terdekat"){state.userArea="";$("#userArea").value="";}$("#searchQuery").value="";if(state.filter==="Terdekat"){nav("search");$("#userArea").focus();notify("Masukkan wilayahmu untuk mencari kos di sekitar area tersebut.");return;}nav("search");return}});
$("#heroSearch").addEventListener("submit",e=>{e.preventDefault();state.query=$("#heroQuery").value;$("#searchQuery").value=state.query;state.filter="Semua";nav("search")});
$("#searchQuery").addEventListener("input",e=>{state.query=e.target.value;renderSearch()});
$("#sortSelect").addEventListener("change",e=>{state.sort=e.target.value;renderSearch()});
$("#filterChips").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;state.filter=b.dataset.filter;if(state.filter==="Terdekat"&&!state.userArea){notify("Masukkan wilayah terlebih dahulu untuk filter terdekat.");$("#userArea").focus();}renderSearch()});
function resetAllSearch(){state.query="";state.filter="Semua";state.sort="recommended";state.userArea="";state.minPrice="";state.maxPrice="";state.occupant="";state.amenity="";$("#searchQuery").value="";$("#sortSelect").value="recommended";$("#userArea").value="";$("#minPrice").value="";$("#maxPrice").value="";$("#occupantFilter").value="";$("#amenityFilter").value="";$("#nearbyMessage").textContent="Pencarian berdasarkan wilayah; hasil ditampilkan dari data lokasi yang tersedia.";renderSearch();notify("Semua pencarian dan filter sudah direset.")}
$("#resetSearch").addEventListener("click",resetAllSearch);
$("#resetAdvancedFilters").addEventListener("click",()=>{state.minPrice="";state.maxPrice="";state.occupant="";state.amenity="";$("#minPrice").value="";$("#maxPrice").value="";$("#occupantFilter").value="";$("#amenityFilter").value="";renderSearch();notify("Filter lanjutan dibersihkan.")});
$("#applyFilters").addEventListener("click",()=>{const minValue=$("#minPrice").value,maxValue=$("#maxPrice").value;const min=Number(minValue),max=Number(maxValue);if((minValue!==""&&min<0)||(maxValue!==""&&max<0)){notify("Harga tidak boleh negatif.");return}if(minValue!==""&&maxValue!==""&&min>max){notify("Harga minimum tidak boleh lebih besar dari maksimum.");return}state.minPrice=minValue;state.maxPrice=maxValue;state.occupant=$("#occupantFilter").value;state.amenity=$("#amenityFilter").value;renderSearch();});
["#minPrice","#maxPrice","#occupantFilter","#amenityFilter"].forEach(sel=>$(sel).addEventListener("change",()=>{$("#applyFilters").click()}));
$("#applyNearby").addEventListener("click",()=>{state.userArea=$("#userArea").value.trim();if(!state.userArea){notify("Masukkan wilayah terlebih dahulu.");$("#userArea").focus();return;}state.filter="Terdekat";$("#nearbyMessage").textContent=`Menampilkan kos yang lokasi/nama areanya cocok dengan “${state.userArea}”. Ini pencocokan teks, bukan jarak kilometer.`;renderSearch();});
$("#clearNearby").addEventListener("click",()=>{state.userArea="";$("#userArea").value="";if(state.filter==="Terdekat")state.filter="Semua";$("#nearbyMessage").textContent="Pencarian berdasarkan wilayah; hasil ditampilkan dari data lokasi yang tersedia.";renderSearch();});
$("#userArea").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("#applyNearby").click();}});
$("#mapSearchForm")?.addEventListener("submit",e=>{e.preventDefault();searchMapProperty($("#mapSearchInput").value);});
$("#mapSearchReset")?.addEventListener("click",()=>{clearGoogleMapEmbed();$("#mapSearchInput").value="";$("#mapSearchResult").textContent="Cari kos berdasarkan nama. Peta akan menampilkan lokasi jika koordinat atau hasil pencarian alamat tersedia." ;$("#mapSelectedName").textContent="Belum ada kos dipilih";$("#mapGoogleLink").classList.add("hidden");$("#mapSelectedDetail").classList.add("hidden");if(propertyMapInstance)propertyMapInstance.setView([-7.424,109.239],12);});
$("#mapSearchInput")?.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("#mapSearchForm").requestSubmit();}});
$("#mapSelectedDetail")?.addEventListener("click",e=>{const id=Number(e.currentTarget.dataset.detail);if(id)showDetail(id);});
$("#clearCompare")?.addEventListener("click",()=>{compareIds.clear();compareStore();renderCompare();if(state.view==="search")renderSearch();notify("Pilihan perbandingan dikosongkan.")});
$("#duration").addEventListener("change",renderSummary);
$("#bookingForm").addEventListener("submit",async e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const button=form.querySelector('button[type="submit"]');const original=button.innerHTML;button.disabled=true;button.innerHTML='<span class="button-spinner" aria-hidden="true"></span> Mengirim...';button.setAttribute("aria-busy","true");try{await new Promise(resolve=>setTimeout(resolve,450));const completed=finishBooking(form);if(completed)notify("Pengajuan pemesanan berhasil disimpan.");}catch(error){console.error(error);notify("Pengajuan gagal disimpan. Coba lagi.");}finally{button.disabled=false;button.innerHTML=original;button.removeAttribute("aria-busy");}});
$("#profileBtn").addEventListener("click",()=>{if(currentUser){nav("profile")}else{nav("login")}});
$("#signupForm").addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget;const name=f.elements.name.value.trim();const email=f.elements.email.value.trim().toLowerCase();const password=f.elements.password.value;const confirm=f.elements.confirmPassword.value;authMessage("#signupMessage","");if(name.length<3){authMessage("#signupMessage","Nama minimal 3 karakter.");return}if(password.length<8){authMessage("#signupMessage","Kata sandi minimal 8 karakter.");return}if(password!==confirm){authMessage("#signupMessage","Konfirmasi kata sandi belum sama.");return}const list=users();if(list.some(u=>u.email===email)){authMessage("#signupMessage","Email ini sudah terdaftar. Silakan masuk.");return}const passHash=await hashPassword(password);list.push({name,email,passHash,createdAt:new Date().toISOString()});localStorage.setItem("kossbill-users",JSON.stringify(list));currentUser={name,email};localStorage.setItem("kossbill-auth-session",JSON.stringify(currentUser));loadAccountData();profile={name,email};save();refreshAuthUI();clearAccountUI();authMessage("#signupMessage","Akun demo berhasil dibuat.",true);notify("Pendaftaran berhasil. Selamat datang!");const pending=state.pendingBookId;const pendingVariant=state.pendingBookVariantId;state.pendingBookId=null;state.pendingBookVariantId=null;const pendingChat=state.pendingChatId;state.pendingChatId=null;setTimeout(()=>pendingChat?openChat(pendingChat):pending?startBooking(pending,pendingVariant):nav("home"),350)});
$("#loginForm").addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget;const email=f.elements.email.value.trim().toLowerCase();const password=f.elements.password.value;authMessage("#loginMessage","");const user=users().find(u=>u.email===email);const hash=await hashPassword(password);if(!user||user.passHash!==hash){authMessage("#loginMessage","Email atau kata sandi tidak cocok.");return}currentUser={name:user.name,email:user.email};localStorage.setItem("kossbill-auth-session",JSON.stringify(currentUser));loadAccountData();profile=readStore(accountKey("profile"),{name:user.name,email:user.email});save();refreshAuthUI();clearAccountUI();notify("Berhasil masuk ke KossBill.");const pending=state.pendingBookId;const pendingVariant=state.pendingBookVariantId;state.pendingBookId=null;state.pendingBookVariantId=null;const pendingChat=state.pendingChatId;state.pendingChatId=null;if(pendingChat)openChat(pendingChat);else if(pending)startBooking(pending,pendingVariant);else nav("home")});
document.addEventListener("click",e=>{const toggle=e.target.closest("[data-toggle-password]");if(toggle){const input=toggle.parentElement.querySelector("input");input.type=input.type==="password"?"text":"password";toggle.textContent=input.type==="password"?"Lihat":"Sembunyi";return}});
$("#profileForm").addEventListener("submit",e=>{e.preventDefault();updateProfile();$("#profileMessage").textContent="Perubahan tersimpan di browser ini."});
$("#resetData").addEventListener("click",resetDemo);
$("#logoutBtn").addEventListener("click",()=>{currentUser=null;localStorage.removeItem("kossbill-auth-session");loadAccountData();refreshAuthUI();clearAccountUI();notify("Kamu sudah keluar. Data akun sebelumnya tidak ditampilkan.");nav("home")});


$("#themeToggle").addEventListener("click",()=>{const dark=document.body.classList.toggle("dark-mode");localStorage.setItem("kossbill-theme",dark?"dark":"light");$("#themeToggle").textContent=dark?"☀":"☾";$("#themeToggle").setAttribute("aria-label",dark?"Aktifkan mode terang":"Aktifkan mode gelap");});
(function initTheme(){const dark=localStorage.getItem("kossbill-theme")==="dark";document.body.classList.toggle("dark-mode",dark);$("#themeToggle").textContent=dark?"☀":"☾";$("#themeToggle").setAttribute("aria-label",dark?"Aktifkan mode terang":"Aktifkan mode gelap")})();
$("#chatForm").addEventListener("submit",e=>{e.preventDefault();if(!chatProperty)return;const text=$("#chatInput").value.trim();if(!text)return;const key=String(chatProperty.id);chatMessages[key]=chatMessages[key]||[];chatMessages[key].push({from:"user",text,at:new Date().toISOString()});localStorage.setItem("kossbill-chat-messages",JSON.stringify(chatMessages));$("#chatInput").value="";renderChat();notify("Pesan tersimpan di chat demo, belum dikirim ke pengelola.")});
$("#globalBack").addEventListener("click",goBack);

renderBookmarks();renderHistory();renderProfile();refreshAuthUI();updateCounts();$("#startDate").min=new Date().toISOString().slice(0,10);loadProperties();
