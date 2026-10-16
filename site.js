
/* ---- Edit these three things, then republish ---- */
/* ---- Accounts (Supabase): paste your two values from Project Settings > API ---- */
var SUPABASE_URL = "";   // e.g. https://abcdxyz.supabase.co
var SUPABASE_KEY = "";   // the "anon public" key (safe to put here)

/* ---- Payments ---- */
var PAYPAL_CLIENT_ID = "";  // from developer.paypal.com > Apps & Credentials (use the Live one when ready)
var STRIPE_LINK = "";       // a Stripe Payment Link (customers choose the amount), e.g. https://buy.stripe.com/xxxx
var PAY_CURRENCY = "USD";   // PayPal and cards charge in USD. Prices below are in USD too.

var CURRENCY = "USD";
var GAMES = [
  {id:"pubgm", name:"PUBG Mobile", tag:"Mobile", svcs:[
    {n:"Rank push", d:"Climb to the tier you choose.", p:9},
    {n:"Conqueror push", d:"Top-tier push by a high-rank player.", p:32},
    {n:"Win boost (5 matches)", d:"Duo or squad wins with a pro.", p:5.5}]},
  {id:"ff", name:"Free Fire", tag:"Mobile", svcs:[
    {n:"Rank push", d:"Climb to the tier you choose.", p:7},
    {n:"Grandmaster push", d:"Finish the season at the top.", p:23},
    {n:"Win boost (5 matches)", d:"Squad wins with a pro.", p:4.5}]},
  {id:"codm", name:"Call of Duty Mobile", tag:"Mobile", svcs:[
    {n:"Ranked push", d:"Climb to the tier you choose.", p:10},
    {n:"Legendary push", d:"Reach Legendary rank.", p:27},
    {n:"Camo or level grind", d:"Weapon levels and camo challenges.", p:6.5}]},
  {id:"mlbb", name:"Mobile Legends", tag:"Mobile", svcs:[
    {n:"Rank boost", d:"Climb to the tier you choose.", p:8},
    {n:"Mythic push", d:"Reach Mythic and beyond.", p:21.5},
    {n:"Win boost (5 matches)", d:"Wins with a high-rank player.", p:4.5}]},
  {id:"val", name:"Valorant", tag:"PC", svcs:[
    {n:"Rank boost", d:"Division by division to your target.", p:16},
    {n:"Placement matches", d:"Strong start to the new season.", p:12.5},
    {n:"Win boost (3 matches)", d:"Wins with a pro.", p:9}]},
  {id:"cs2", name:"Counter-Strike 2", tag:"PC", svcs:[
    {n:"Premier rating boost", d:"Raise your rating to the target.", p:18},
    {n:"Faceit level boost", d:"Climb to the level you choose.", p:19.5},
    {n:"Win boost (3 matches)", d:"Wins with a pro.", p:9}]},
  {id:"fn", name:"Fortnite", tag:"PC / Console", svcs:[
    {n:"Ranked boost", d:"Climb to the rank you choose.", p:12.5},
    {n:"Victory Royale pack (3)", d:"Three wins with a pro.", p:9},
    {n:"Battle Pass levels", d:"Level up your pass quickly.", p:7}]},
  {id:"apex", name:"Apex Legends", tag:"PC / Console", svcs:[
    {n:"Rank boost", d:"Climb to the tier you choose.", p:14.5},
    {n:"Badge or kills", d:"Damage badges and kill challenges.", p:10.5},
    {n:"Win boost (3 matches)", d:"Wins with a pro.", p:9}]}
];


/* ---- TOP-UP BUNDLES: add or edit lines here ----
   Format:  {n:"Name shown to customer", p:price_number}
   Each game id matches the ids in GAMES above. Prices are examples. */
var BUNDLES = {
  pubgm:[{n:"60 UC",p:1},{n:"325 UC",p:4.5},{n:"660 UC",p:9.5},{n:"1800 UC",p:23}],
  ff:[{n:"100 Diamonds",p:1},{n:"310 Diamonds",p:3},{n:"520 Diamonds",p:5.5},{n:"Weekly Membership",p:3}],
  codm:[{n:"80 CP",p:1},{n:"400 CP",p:5},{n:"800 CP",p:10},{n:"2000 CP",p:24.5}],
  mlbb:[{n:"86 Diamonds",p:1},{n:"172 Diamonds",p:2.5},{n:"429 Diamonds",p:6},{n:"Weekly Diamond Pass",p:3}],
  val:[{n:"475 VP",p:4},{n:"1000 VP",p:8},{n:"2050 VP",p:16.5}],
  fn:[{n:"1000 V-Bucks",p:10},{n:"2800 V-Bucks",p:25.5},{n:"5000 V-Bucks",p:43}],
  apex:[{n:"1000 Apex Coins",p:9.5},{n:"2150 Apex Coins",p:18.5},{n:"4350 Apex Coins",p:35.5}]
};
GAMES.forEach(function(g){
  (BUNDLES[g.id]||[]).forEach(function(b){ g.svcs.push({n:b.n, d:"Top-up delivered to your account ID", p:b.p, t:1}); });
});

var ICONS = {
  pubgm:'<path d="M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  ff:'<path d="M12 3c1 3 4 4.5 4 8.5A4 4 0 0 1 8 12c0-1.5.6-2.5 1.5-3.5C9.5 10 11 9.5 11 7c0-1.5.4-2.8 1-4z"/><path d="M8 18h8"/>',
  codm:'<circle cx="12" cy="12" r="7"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
  mlbb:'<path d="M5 19L19 5"/><path d="M14 5h5v5"/><path d="M5 14l5 5"/><path d="M4 20l2-2"/>',
  val:'<path d="M3 6l9 13 9-13"/><path d="M8 6l4 6 4-6"/>',
  cs2:'<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>',
  fn:'<path d="M12 3l3 6 6 1-4.5 4.2 1.2 6.3L12 17.5 6.3 20.5l1.2-6.3L3 10l6-1z"/>',
  apex:'<path d="M12 3l9 17H3z"/><path d="M12 10v5"/>'
};
/* ================= app code (no need to edit below) ================= */
var $ = function(id){return document.getElementById(id)};
var fmt = function(n){ return "$" + (n % 1 ? n.toFixed(2) : n); };
var user = null, sb = null, profile = null;
var current = 0;

function store(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v);}catch(e){return null;} }

/* ---------- auth ---------- */
function authConfigured(){ return !!(SUPABASE_URL && SUPABASE_KEY && window.supabase); }
function initAuth(done){
  if(!authConfigured()){ done(); return; }
  try{
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    sb.auth.getSession().then(function(r){
      user = r && r.data && r.data.session ? r.data.session.user : null; done();
    }).catch(function(){ done(); });
  }catch(e){ done(); }
}
function loadProfile(done){
  if(!sb || !user){ done(); return; }
  sb.from("profiles").select("is_admin,discount_pct").eq("id", user.id).maybeSingle().then(function(r){
    profile = (r && r.data) || null; done();
  }).catch(function(){ done(); });
}
function myDiscount(){ var d = profile && Number(profile.discount_pct); return (d > 0 && d <= 90) ? d : 0; }
function displayName(){
  if(!user) return "";
  var m = user.user_metadata || {};
  return m.name || (user.email ? user.email.split("@")[0] : "");
}
function drawAuthSlot(){
  var s = $("authSlot"); if(!s) return;
  s.innerHTML = "";
  if(user){
    var span = document.createElement("span"); span.className = "hi"; span.textContent = "Hi, " + displayName();
    var out = document.createElement("button"); out.type = "button"; out.className = "linkbtn"; out.textContent = "Log out";
    out.addEventListener("click", function(){ sb.auth.signOut().then(function(){ location.href = "index.html"; }); });
    if(profile && profile.is_admin){ var ad = document.createElement("a"); ad.className = "linkbtn"; ad.href = "admin.html"; ad.textContent = "Admin"; s.appendChild(ad); }
    s.appendChild(span); s.appendChild(out);
  } else {
    s.innerHTML = '<a class="linkbtn" href="login.html">Log in</a><a class="btn small" href="signup.html">Sign up</a>';
  }
}
function showMsg(text, ok){
  var m = $("msg"); if(!m) return;
  m.hidden = false; m.textContent = text; m.className = "msg " + (ok ? "ok" : "bad");
}
function notConfigured(){
  showMsg("Accounts are not switched on yet. The site owner needs to add the Supabase keys.", false);
}
function setupSignup(){
  var f = $("signupForm"); if(!f) return;
  f.addEventListener("submit", function(e){
    e.preventDefault();
    if(!authConfigured()){ notConfigured(); return; }
    var name = $("uName").value.trim(), wa = $("uWa").value.replace(/\D/g,""),
        email = $("uEmail").value.trim(), pw = $("uPass").value;
    if(!name){ showMsg("Enter your name.", false); return; }
    if(wa.length < 10){ showMsg("Enter your WhatsApp number with country code, for example 923001234567.", false); return; }
    if(pw.length < 8){ showMsg("Use a password with at least 8 characters.", false); return; }
    var btn = f.querySelector("button[type=submit]"); btn.disabled = true;
    sb.auth.signUp({email:email, password:pw, options:{data:{name:name, whatsapp:wa}}}).then(function(r){
      btn.disabled = false;
      if(r.error){ showMsg(r.error.message, false); return; }
      if(r.data && r.data.session){ location.href = "order.html"; }
      else { showMsg("Account created. Check your email and tap the confirmation link, then log in.", true); f.reset(); }
    }).catch(function(){ btn.disabled = false; showMsg("Could not reach the sign-up service. Check your internet and try again.", false); });
  });
}
function setupLogin(){
  var f = $("loginForm"); if(!f) return;
  f.addEventListener("submit", function(e){
    e.preventDefault();
    if(!authConfigured()){ notConfigured(); return; }
    var btn = f.querySelector("button[type=submit]"); btn.disabled = true;
    sb.auth.signInWithPassword({email:$("lEmail").value.trim(), password:$("lPass").value}).then(function(r){
      btn.disabled = false;
      if(r.error){ showMsg(r.error.message, false); return; }
      location.href = "order.html";
    }).catch(function(){ btn.disabled = false; showMsg("Could not reach the login service. Check your internet and try again.", false); });
  });
  var fp = $("forgot");
  if(fp) fp.addEventListener("click", function(){
    if(!authConfigured()){ notConfigured(); return; }
    var em = $("lEmail").value.trim();
    if(!em){ showMsg("Type your email above first, then tap Forgot password.", false); return; }
    sb.auth.resetPasswordForEmail(em).then(function(r){
      showMsg(r.error ? r.error.message : "Password reset email sent. Check your inbox.", !r.error);
    });
  });
}

/* ---------- home grid ---------- */
function renderHome(){
  var g = $("homeGrid"); if(!g) return;
  var q = ($("homeSearch").value || "").trim().toLowerCase();
  g.innerHTML = ""; var n = 0;
  GAMES.forEach(function(game,i){
    if(q && game.name.toLowerCase().indexOf(q) < 0) return;
    n++;
    var a = document.createElement("a"); a.className = "gcard"; a.href = "games.html?g=" + i;
    a.style.setProperty("--h", String((i * 47 + 205) % 360));
    a.innerHTML = '<span class="go" aria-hidden="true">↗</span>' + icon(game.id) + "<b></b><small></small>";
    a.querySelector("b").textContent = game.name; a.querySelector("small").textContent = game.tag;
    a.addEventListener("click", function(){ store("lx_game", String(i)); });
    g.appendChild(a);
  });
  if(!n){ var d = document.createElement("div"); d.className = "nomatch"; d.textContent = "No games match that search."; g.appendChild(d); }
}
function setupHome(){ if(!$("homeGrid")) return; document.body.classList.add("home"); $("homeSearch").addEventListener("input", renderHome); renderHome(); }

/* ---------- games page ---------- */
function icon(id){ return '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[id]||"") + '</svg>'; }
function renderGames(){
  var g = $("gameGrid"); if(!g) return; g.innerHTML = "";
  GAMES.forEach(function(game,i){
    var b = document.createElement("button");
    b.type = "button"; b.className = "game";
    b.setAttribute("aria-pressed", i===current ? "true":"false");
    b.innerHTML = icon(game.id) + "<strong></strong><small></small>";
    b.querySelector("strong").textContent = game.name; b.querySelector("small").textContent = game.tag;
    b.addEventListener("click", function(){ current = i; renderGames(); renderServices(); });
    g.appendChild(b);
  });
}
function goOrder(gi, si){
  store("lx_pick", gi + "," + si);
  location.href = "order.html?g=" + gi + "&s=" + si;
}
function renderServices(){
  var box = $("services"); if(!box) return;
  var game = GAMES[current]; box.innerHTML = "";
  var h = document.createElement("header");
  h.innerHTML = "<h3></h3><span>Prices in USD</span>";
  h.firstChild.textContent = game.name; box.appendChild(h);
  var seenTop = false;
  game.svcs.forEach(function(s,i){
    if(s.t && !seenTop){
      seenTop = true;
      var sh = document.createElement("div"); sh.className = "subhead"; sh.textContent = "Top-up bundles"; box.appendChild(sh);
    }
    var r = document.createElement("div"); r.className = "svc";
    r.innerHTML = "<div><b></b><p></p></div><span class='price'></span><button type='button' class='btn ghost'>" + (s.t ? "Buy" : "Order") + "</button>";
    r.querySelector("b").textContent = s.n;
    r.querySelector("p").textContent = s.d;
    r.querySelector(".price").textContent = fmt(s.p) + (s.t ? "" : " / unit");
    r.querySelector("button").addEventListener("click", function(){ goOrder(current, i); });
    box.appendChild(r);
  });
}

/* ---------- order page ---------- */
function fillGameSelect(){
  var fg = $("fGame"); fg.innerHTML = "";
  GAMES.forEach(function(g,i){ var o = document.createElement("option"); o.value = i; o.textContent = g.name; fg.appendChild(o); });
  fg.value = String(current);
}
function fillServiceSelect(){
  var fs = $("fSvc"); fs.innerHTML = "";
  GAMES[current].svcs.forEach(function(s,i){ var o = document.createElement("option"); o.value = i; o.textContent = (s.t ? "Top-up: " : "") + s.n; fs.appendChild(o); });
}
function curSvc(){ return GAMES[current].svcs[+$("fSvc").value || 0]; }
function qty(){ var q = parseInt($("fQty").value,10); return (isNaN(q) || q < 1) ? 1 : Math.min(q, 99); }
function totalNum(){ return Math.max(1, Math.round(curSvc().p * qty() * (100 - myDiscount())) / 100); }
function totalUSD(){ return totalNum().toFixed(2); }
function updateOrder(){
  var game = GAMES[current], s = curSvc();
  var from = $("fFrom").value.trim(), to = $("fTo").value.trim();
  $("rankRow").hidden = !!s.t;
  $("sGame").textContent = game.name;
  $("sSvc").textContent = s.n + (qty() > 1 ? "  x " + qty() : "");
  $("sClimb").textContent = s.t ? "Top-up to your player ID" : ((from || to) ? ((from || "?") + "  →  " + (to || "?")) : "Add your ranks");
  $("sPrice").textContent = fmt(totalNum());
  $("sUsd").textContent = "Charged in " + PAY_CURRENCY + " (" + totalUSD() + ")";
  var dd = $("sDisc"); if(dd){ dd.hidden = !myDiscount(); dd.textContent = "Your customer discount: " + myDiscount() + "% off applied"; }
}
function payMsg(text, ok){
  var m = $("payMsg"); m.hidden = !text; m.textContent = text || ""; m.className = "msg " + (ok ? "ok" : "bad");
}
function makeCode(){
  var c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", out = "LX-";
  for(var i=0;i<6;i++) out += c.charAt(Math.floor(Math.random()*c.length));
  return out;
}
function orderDetails(){
  var s = curSvc();
  return {
    game: GAMES[current].name, service: s.n, quantity: qty(),
    current_rank: s.t ? "" : $("fFrom").value.trim(), wanted_rank: s.t ? "" : $("fTo").value.trim(),
    player_id: $("fPid").value.trim(), name: $("fName").value.trim(), platform: $("fPlat").value,
    notes: $("fNote").value.trim(), discount_pct: myDiscount(), amount_usd: parseFloat(totalUSD())
  };
}
function checkOrder(){
  var s = curSvc();
  if(!authConfigured()){ payMsg("Orders are not switched on yet. The site owner needs to add the Supabase keys.", false); return false; }
  if(!user){ payMsg("Please log in or sign up before you pay, so we can find your order.", false); return false; }
  if(!$("fPid").value.trim()){ payMsg("Enter your player ID or in-game name.", false); return false; }
  if(!s.t && (!$("fFrom").value.trim() || !$("fTo").value.trim())){ payMsg("Enter your current and wanted rank.", false); return false; }
  payMsg("", true); return true;
}
function saveOrder(method){
  var d = orderDetails(); d.code = makeCode(); d.method = method;
  return sb.from("orders").insert(d).then(function(r){
    if(r.error) throw new Error("Could not save your order: " + r.error.message);
    return d;
  });
}
function payDescription(d){
  var t = "Levelixx " + d.code + " | " + d.game + " | " + d.service + (d.quantity>1 ? " x"+d.quantity : "") + " | " + (d.wanted_rank ? d.current_rank + ">" + d.wanted_rank + " | " : "") + d.player_id;
  return t.slice(0,126);
}
function setupStripe(){
  var b = $("stripeBtn"); if(!b) return;
  if(!STRIPE_LINK){ b.hidden = true; return; }
  b.addEventListener("click", function(){
    if(!checkOrder()) return;
    b.disabled = true;
    saveOrder("Stripe").then(function(d){
      var sep = STRIPE_LINK.indexOf("?") > -1 ? "&" : "?";
      location.href = STRIPE_LINK + sep + "client_reference_id=" + d.code.replace(/-/g,"") + "&prefilled_email=" + encodeURIComponent(user.email || "");
    }).catch(function(err){ b.disabled = false; payMsg(err.message, false); });
  });
}
function setupPayPal(){
  var box = $("paypalBtns"); if(!box) return;
  if(!PAYPAL_CLIENT_ID){ box.hidden = true; return; }
  var sc = document.createElement("script");
  sc.src = "https://www.paypal.com/sdk/js?client-id=" + encodeURIComponent(PAYPAL_CLIENT_ID) + "&currency=" + PAY_CURRENCY + "&intent=capture";
  sc.onerror = function(){ box.textContent = "PayPal could not load. Check your connection and refresh."; };
  sc.onload = function(){
    var pending = null;
    window.paypal.Buttons({
      style:{layout:"vertical", color:"white", shape:"rect", label:"paypal"},
      onClick: function(data, actions){ return checkOrder() ? actions.resolve() : actions.reject(); },
      createOrder: function(data, actions){
        return saveOrder("PayPal").then(function(d){
          pending = d;
          return actions.order.create({purchase_units:[{
            amount:{currency_code:PAY_CURRENCY, value:totalUSD()},
            description: payDescription(d), custom_id: d.code
          }]});
        });
      },
      onApprove: function(data, actions){
        return actions.order.capture().then(function(){
          var code = pending ? pending.code : "";
          $("orderForm").hidden = true;
          $("payBox").hidden = true;
          var done = $("doneBox"); done.hidden = false;
          done.querySelector("b").textContent = code;
        });
      },
      onError: function(){ payMsg("Payment did not go through. You were not charged. Try again.", false); }
    }).render("#paypalBtns");
  };
  document.head.appendChild(sc);
}
function setupOrder(){
  if(!$("orderForm")) return;
  var q = {};
  try{ new URLSearchParams(location.search).forEach(function(v,k){ q[k]=v; }); }catch(e){}
  var gi = parseInt(q.g,10), si = parseInt(q.s,10);
  if(isNaN(gi)){ var p = (store("lx_pick")||"").split(","); gi = parseInt(p[0],10); si = parseInt(p[1],10); }
  if(!isNaN(gi) && GAMES[gi]) current = gi; else si = 0;
  fillGameSelect(); fillServiceSelect();
  if(!isNaN(si) && GAMES[current].svcs[si]) $("fSvc").value = String(si);
  if(user && !$("fName").value) $("fName").value = displayName();
  $("fGame").addEventListener("change", function(e){ current = +e.target.value; fillServiceSelect(); updateOrder(); });
  ["fSvc","fQty","fFrom","fTo","fPid","fName","fPlat","fNote"].forEach(function(id){
    $(id).addEventListener("input", updateOrder); $(id).addEventListener("change", updateOrder);
  });
  $("orderForm").addEventListener("submit", function(e){ e.preventDefault(); });
  var hint = $("loginHint"); if(hint) hint.hidden = !!user;
  if(!PAYPAL_CLIENT_ID && !STRIPE_LINK) payMsg("Payments are not switched on yet. The site owner needs to add PayPal or Stripe details.", false);
  updateOrder(); setupPayPal(); setupStripe();
}


/* ---------- admin page ---------- */
function el(tag, text, cls){ var e = document.createElement(tag); if(text !== undefined && text !== null) e.textContent = text; if(cls) e.className = cls; return e; }
function usd(n){ return PAY_CURRENCY + " " + (Number(n) || 0).toFixed(2); }
var adminData = {customers:[], orders:[]};
function adminNotice(text, link){
  var n = $("adminMsg"); n.hidden = false; n.textContent = text; n.className = "msg bad";
  if(link){ n.appendChild(document.createTextNode(" ")); var l = el("a", link[0]); l.href = link[1]; n.appendChild(l); }
}
function setupAdmin(){
  if(!$("adminRoot")) return;
  if(!authConfigured()){ adminNotice("Accounts are not switched on yet. Add the Supabase keys first."); return; }
  if(!user){ adminNotice("Log in with your admin account first.", ["Log in", "login.html"]); return; }
  if(!profile || !profile.is_admin){ adminNotice("This page is for Levelixx staff only."); return; }
  $("adminBody").hidden = false;
  loadAdmin();
}
function loadAdmin(){
  Promise.all([
    sb.from("customer_spend").select("*").order("spent_usd",{ascending:false}),
    sb.from("orders").select("*").order("created_at",{ascending:false}).limit(300)
  ]).then(function(rs){
    if(rs[0].error || rs[1].error){ adminNotice("Could not load data: " + (rs[0].error || rs[1].error).message); return; }
    adminData.customers = rs[0].data || []; adminData.orders = rs[1].data || [];
    renderAdmin();
  }).catch(function(){ adminNotice("Could not reach the database. Check your internet."); });
}
function filteredCustomers(){
  var q = ($("cSearch").value || "").trim().toLowerCase();
  var min = parseFloat($("minSpend").value); if(isNaN(min)) min = 0;
  return adminData.customers.filter(function(c){
    var hay = ((c.name||"") + " " + (c.email||"") + " " + (c.whatsapp||"")).toLowerCase();
    return (!q || hay.indexOf(q) > -1) && Number(c.spent_usd || 0) >= min;
  });
}
function renderAdmin(){
  var paid = adminData.customers.reduce(function(s,c){ return s + Number(c.spent_usd||0); }, 0);
  var openCount = adminData.orders.filter(function(o){ return o.status === "awaiting payment"; }).length;
  var tiles = $("tiles"); tiles.innerHTML = "";
  [["Customers", adminData.customers.length], ["Orders", adminData.orders.length], ["Awaiting payment", openCount], ["Paid so far", usd(paid)]].forEach(function(t){
    var d = el("div","","tile"); d.appendChild(el("b", t[1])); d.appendChild(el("span", t[0])); tiles.appendChild(d);
  });
  renderCustomers(); renderOrders();
}
function mailtoFor(c){
  var d = c.discount_pct > 0 ? c.discount_pct + "% off your next order" : "a special offer";
  var subject = "A thank-you from Levelixx";
  var body = "Hi " + (c.name || "there") + ",\n\nThanks for ordering with Levelixx. As a thank-you, here is " + d + ". Just log in and order as usual.\n\nLevelixx Game Boosting";
  return "mailto:" + c.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}
function renderCustomers(){
  var list = filteredCustomers(), body = $("custBody"); body.innerHTML = "";
  $("custCount").textContent = list.length + " customers shown";
  list.forEach(function(c){
    var tr = el("tr");
    var who = el("td"); who.appendChild(el("b", c.name || "(no name)")); who.appendChild(el("div", c.whatsapp || "", "sub"));
    tr.appendChild(who);
    tr.appendChild(el("td", c.email));
    tr.appendChild(el("td", String(c.order_count || 0)));
    tr.appendChild(el("td", usd(c.spent_usd), "num"));
    var dt = el("td"); var inp = el("input"); inp.type = "number"; inp.min = "0"; inp.max = "90"; inp.value = String(c.discount_pct || 0);
    inp.setAttribute("aria-label", "Discount percent for " + (c.email||"")); inp.className = "disc";
    var sv = el("button", "Save", "btn ghost small"); sv.type = "button";
    sv.addEventListener("click", function(){
      var n = Math.max(0, Math.min(90, parseInt(inp.value,10) || 0));
      sv.disabled = true;
      sb.from("profiles").update({discount_pct:n}).eq("id", c.id).then(function(r){
        sv.disabled = false;
        if(r.error){ sv.textContent = "Failed"; return; }
        c.discount_pct = n; inp.value = String(n); sv.textContent = "Saved";
        setTimeout(function(){ sv.textContent = "Save"; }, 1500);
      });
    });
    var wrap = el("div","","discwrap"); wrap.appendChild(inp); wrap.appendChild(el("span","%")); wrap.appendChild(sv); dt.appendChild(wrap); tr.appendChild(dt);
    var mt = el("td"); var ml = el("a","Email"); ml.href = mailtoFor(c); mt.appendChild(ml); tr.appendChild(mt);
    body.appendChild(tr);
  });
}
var STATUSES = ["awaiting payment","paid","in progress","done","cancelled"];
function renderOrders(){
  var body = $("ordBody"); body.innerHTML = "";
  adminData.orders.forEach(function(o){
    var tr = el("tr");
    tr.appendChild(el("td", o.code, "mono"));
    tr.appendChild(el("td", new Date(o.created_at).toLocaleDateString()));
    var cust = adminData.customers.filter(function(c){ return c.id === o.user_id; })[0];
    tr.appendChild(el("td", cust ? (cust.name || cust.email) : "–"));
    var item = el("td"); item.appendChild(el("b", o.game + " · " + o.service + (o.quantity > 1 ? " x" + o.quantity : "")));
    var det = (o.wanted_rank ? o.current_rank + " → " + o.wanted_rank + " · " : "") + "ID " + o.player_id + (o.notes ? " · " + o.notes : "");
    item.appendChild(el("div", det, "sub")); tr.appendChild(item);
    tr.appendChild(el("td", usd(o.amount_usd) + (o.discount_pct ? " (-" + o.discount_pct + "%)" : ""), "num"));
    tr.appendChild(el("td", o.method));
    var st = el("td"); var sel = el("select"); sel.setAttribute("aria-label", "Status of " + o.code);
    STATUSES.forEach(function(s){ var op = el("option", s); op.value = s; if(s === o.status) op.selected = true; sel.appendChild(op); });
    sel.addEventListener("change", function(){
      sb.from("orders").update({status: sel.value}).eq("id", o.id).then(function(r){
        if(r.error){ sel.value = o.status; return; }
        o.status = sel.value; loadAdmin();
      });
    });
    st.appendChild(sel); tr.appendChild(st);
    body.appendChild(tr);
  });
}
function copyText(text, msgEl, okText){
  var done = function(){ msgEl.textContent = okText; };
  try{ navigator.clipboard.writeText(text).then(done).catch(function(){ msgEl.textContent = "Copy blocked. Select the text in the box and copy it yourself."; }); }
  catch(e){ msgEl.textContent = "Copy blocked. Select the text in the box and copy it yourself."; }
}
function setupAdminTools(){
  if(!$("adminRoot")) return;
  $("cSearch").addEventListener("input", renderCustomers);
  $("minSpend").addEventListener("input", renderCustomers);
  $("copyEmails").addEventListener("click", function(){
    var emails = filteredCustomers().map(function(c){ return c.email; }).filter(Boolean).join(", ");
    $("emailBox").value = emails; copyText(emails, $("toolMsg"), "Copied " + filteredCustomers().length + " emails. Paste them into the BCC field of your email app.");
  });
  var armed = false;
  $("bulkDisc").addEventListener("click", function(){
    var pct = Math.max(0, Math.min(90, parseInt($("bulkPct").value,10) || 0));
    var ids = filteredCustomers().map(function(c){ return c.id; });
    if(!ids.length){ $("toolMsg").textContent = "No customers match the filter."; return; }
    if(!armed){ armed = true; $("bulkDisc").textContent = "Tap again to give " + pct + "% to " + ids.length + " customers"; return; }
    armed = false; $("bulkDisc").textContent = "Give discount to shown customers";
    sb.from("profiles").update({discount_pct:pct}).in("id", ids).then(function(r){
      $("toolMsg").textContent = r.error ? ("Failed: " + r.error.message) : ("Gave " + pct + "% off to " + ids.length + " customers.");
      if(!r.error) loadAdmin();
    });
  });
}

/* ---------- start ---------- */
if($("gameGrid")){
  var qq = {}; try{ new URLSearchParams(location.search).forEach(function(v,k){ qq[k]=v; }); }catch(e){}
  var gg = parseInt(qq.g,10); if(isNaN(gg)) gg = parseInt(store("lx_game"),10);
  if(!isNaN(gg) && GAMES[gg]) current = gg;
}
initAuth(function(){ loadProfile(function(){
  drawAuthSlot(); setupHome();
  renderGames(); renderServices();
  setupOrder(); setupSignup(); setupLogin(); setupAdmin(); setupAdminTools();
}); });
