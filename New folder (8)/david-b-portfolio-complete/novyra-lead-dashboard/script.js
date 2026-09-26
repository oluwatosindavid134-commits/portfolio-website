const leads = [
 {name:"BrightSmile Dental", type:"Dental clinic", location:"Houston, TX", score:96, opp:"high", outreach:"Sent"},
 {name:"Oakline Family Dental", type:"Dental clinic", location:"Austin, TX", score:91, opp:"high", outreach:"Ready"},
 {name:"Peak Fitness Studio", type:"Fitness", location:"Dallas, TX", score:88, opp:"high", outreach:"Sent"},
 {name:"Evergreen Skin Clinic", type:"Medical clinic", location:"Phoenix, AZ", score:84, opp:"high", outreach:"Ready"},
 {name:"Bloom Hair Collective", type:"Salon", location:"Miami, FL", score:76, opp:"medium", outreach:"Sent"},
 {name:"Northstar Legal", type:"Law firm", location:"Chicago, IL", score:72, opp:"medium", outreach:"Ready"},
 {name:"Harbor Physical Therapy", type:"Healthcare", location:"Tampa, FL", score:68, opp:"medium", outreach:"Sent"},
 {name:"Rise Wellness Center", type:"Wellness", location:"Denver, CO", score:61, opp:"low", outreach:"Ready"}
];

const table = document.getElementById("leadTable");
const search = document.getElementById("searchInput");
const filter = document.getElementById("scoreFilter");

function initials(name){return name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}
function render(){
 const q = search.value.toLowerCase();
 const f = filter.value;
 const rows = leads.filter(l => (f==="all" || l.opp===f) && [l.name,l.type,l.location].join(" ").toLowerCase().includes(q));
 table.innerHTML = rows.map((l,i)=>`<tr>
 <td><div class="business-cell"><span class="biz-avatar">${initials(l.name)}</span><div><strong>${l.name}</strong><small>${l.outreach==="Sent"?"Contact identified":"Research in progress"}</small></div></div></td>
 <td>${l.type}</td><td>${l.location}</td><td><span class="score">${l.score}</span>/100</td>
 <td><span class="pill ${l.opp}">${l.opp[0].toUpperCase()+l.opp.slice(1)}</span></td>
 <td><span class="pill ${l.outreach==="Sent"?"sent":"ready"}">${l.outreach}</span></td><td><button class="row-btn" title="More">⋯</button></td></tr>`).join("");
}
search.addEventListener("input",render); filter.addEventListener("change",render); render();

const modal=document.getElementById("leadModal");
document.getElementById("addLeadBtn").onclick=()=>modal.classList.add("show");
document.getElementById("closeModal").onclick=()=>modal.classList.remove("show");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});
document.getElementById("leadForm").addEventListener("submit",e=>{
 e.preventDefault(); const d=new FormData(e.target); const score=Number(d.get("score"));
 leads.unshift({name:d.get("business"),type:d.get("category"),location:d.get("location"),score,opp:score>=80?"high":score>=65?"medium":"low",outreach:"Ready"});
 document.getElementById("prospectCount").textContent=24+leads.length-8;
 document.getElementById("highCount").textContent=leads.filter(x=>x.opp==="high").length;
 render(); e.target.reset(); modal.classList.remove("show");
});
document.querySelectorAll(".send-btn").forEach(b=>b.addEventListener("click",()=>{b.textContent="Queued ✓";b.style.opacity=".7"}));
