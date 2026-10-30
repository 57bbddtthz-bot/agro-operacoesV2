(()=>{
 const css=`<style>
 #menuToggle{font-size:22px;min-width:42px}#agroMenuShade{display:none;position:fixed;inset:66px 0 0;background:#10251b66;z-index:20}#agroMenu{position:absolute;right:10px;top:10px;width:min(310px,calc(100vw - 20px));max-height:calc(100vh - 100px);overflow:auto;background:#fff;color:#203027;border-radius:16px;padding:12px;box-shadow:0 16px 45px #0003}#agroMenu.open,#agroMenuShade.open{display:block}.agro-menu-title{font-weight:850;padding:10px 12px;color:#174c35}.agro-menu-btn{display:block;width:100%;text-align:left;border:0;background:#fff;padding:12px;border-radius:10px;color:#33483a;font-weight:650}.agro-menu-btn:active,.agro-menu-btn:hover{background:#eaf3ec}.agro-menu-sep{border:0;border-top:1px solid #dfe7e1;margin:8px 0}.agro-menu-last{font-weight:800;color:#174c35}.stat-click{cursor:pointer;text-align:left;font:inherit}.stat-click:active{transform:scale(.99)}
 </style>`;
 document.head.insertAdjacentHTML('beforeend',css);
 const shade=document.createElement('div');shade.id='agroMenuShade';shade.innerHTML=`<nav id="agroMenu"><div class="agro-menu-title">Menu AGRO OPERAÇÕES</div>
 <button class="agro-menu-btn" data-go="dashboard">▦ Painel</button><button class="agro-menu-btn" data-go="os">▤ Ordens de serviço</button><button class="agro-menu-btn" data-go="estrutura">⌂ Fazendas e sedes</button><button class="agro-menu-btn" data-go="talhoes">▧ Talhões</button><button class="agro-menu-btn" data-go="voos">✈ Voos e hectares</button><button class="agro-menu-btn" data-go="ocorrencias">! Ocorrências</button><button class="agro-menu-btn" data-go="relatorios">▥ Relatórios</button>
 <hr class="agro-menu-sep"><button class="agro-menu-btn" data-go="calculadora">🧮 Calculadora aérea</button><button class="agro-menu-btn" data-go="produtos">🧪 Produtos e bulas</button><button class="agro-menu-btn" data-go="compatibilidade">⚗ Compatibilidade</button><button class="agro-menu-btn" data-go="clima">🌦 Condições climáticas</button><button class="agro-menu-btn" data-go="pesquisa">🔎 Pesquisa técnica</button>
 <hr class="agro-menu-sep"><button class="agro-menu-btn agro-menu-last" data-go="configuracoes">⚙ Configurações</button><button class="agro-menu-btn" id="menuLogout">⇥ Sair</button></nav>`;
 document.body.appendChild(shade);
 const close=()=>shade.classList.remove('open');
 document.getElementById('menuToggle')?.addEventListener('click',()=>shade.classList.toggle('open'));
 shade.addEventListener('click',e=>{if(e.target===shade)close();});
 shade.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{close();if(window.go)window.go(b.dataset.go)}));
 shade.querySelector('#menuLogout').addEventListener('click',()=>{close();if(window.logout)window.logout()});
 // No menu lateral móvel: as funções adicionais ficam somente no menu de três barras.
 const hideModuleBottom=()=>document.querySelectorAll('#mobileNav [data-page]').forEach(b=>b.remove());
 new MutationObserver(hideModuleBottom).observe(document.getElementById('mobileNav'),{childList:true});setTimeout(hideModuleBottom,250);
})();
