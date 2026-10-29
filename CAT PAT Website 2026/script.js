const root=document.documentElement;
const nav=document.querySelector('.nav-links');
const menu=document.querySelector('.menu-btn');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}))}
const topBtn=document.querySelector('.back-top');window.addEventListener('scroll',()=>{if(topBtn)topBtn.style.display=window.scrollY>600?'block':'none';const p=document.querySelector('.progress');if(p){const max=document.documentElement.scrollHeight-innerHeight;p.style.width=(max?scrollY/max*100:0)+'%'}});topBtn?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');e.target.querySelectorAll('.bar-fill').forEach(b=>b.style.width=b.dataset.width);e.target.querySelectorAll('.col').forEach(c=>c.style.height=c.dataset.height)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const savedTheme=localStorage.getItem('cat-theme');if(savedTheme==='dark')root.classList.add('dark');document.querySelector('.theme-btn')?.addEventListener('click',()=>{root.classList.toggle('dark');localStorage.setItem('cat-theme',root.classList.contains('dark')?'dark':'light')});
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');const f=btn.dataset.filter;document.querySelectorAll('.compare-card').forEach(c=>c.hidden=!(f==='all'||c.dataset.type.includes(f)))}));
document.querySelector('.print-btn')?.addEventListener('click',()=>print());
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
// Click-to-learn cards
for(const card of document.querySelectorAll('.info-card')){
  const toggle=()=>{card.classList.toggle('flipped');card.setAttribute('aria-pressed',String(card.classList.contains('flipped')))};
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle()}});
}
// Climate Tech Challenge mini-game
const gameData=[
 {q:'Which technology received the most selections in the questionnaire?',a:['Wind energy','Solar energy','Electric vehicles','Smart farming'],c:1,ex:'Solar energy received 7 of the 15 selections.'},
 {q:'What was the most common barrier to adopting green technology?',a:['High cost','Lack of support','No interest','Too much recycling'],c:0,ex:'High cost was selected by 7 respondents.'},
 {q:'Which statement about electric vehicles is correct?',a:['EVs always have zero life-cycle emissions','EVs produce no tailpipe emissions while driving','EVs do not need electricity','EVs cannot use renewable energy'],c:1,ex:'EVs produce no tailpipe emissions while running on electricity.'},
 {q:'What does climate adaptation mean?',a:['Ignoring climate risks','Adjusting to climate impacts and improving resilience','Only planting trees','Replacing every device'],c:1,ex:'Adaptation means adjusting to climate impacts and increasing resilience.'},
 {q:'Which combination best matches the project conclusion?',a:['One technology only','Clean energy, transport, recycling and smart resource use','Fossil fuels and more waste','Apps without behaviour change'],c:1,ex:'The project concludes that an affordable combination of technologies is strongest.'}
];
const game=document.querySelector('[data-climate-game]');
if(game){let index=0,score=0,locked=false;const q=game.querySelector('[data-game-question]'),opts=game.querySelector('[data-game-options]'),feedback=game.querySelector('[data-game-feedback]'),next=game.querySelector('[data-game-next]'),restart=game.querySelector('[data-game-restart]'),progressText=game.querySelector('[data-game-progress]'),scoreText=game.querySelector('[data-game-score]'),playArea=game.querySelector('[data-game-play]'),result=game.querySelector('[data-game-result]'),final=game.querySelector('[data-game-final]');
 const render=()=>{locked=false;feedback.textContent='';next.hidden=true;const item=gameData[index];q.textContent=item.q;progressText.textContent=`Question ${index+1} of ${gameData.length}`;scoreText.textContent=`Score: ${score}`;opts.innerHTML='';item.a.forEach((answer,i)=>{const b=document.createElement('button');b.type='button';b.className='game-option';b.textContent=answer;b.addEventListener('click',()=>choose(b,i));opts.appendChild(b)})};
 const choose=(button,choice)=>{if(locked)return;locked=true;const item=gameData[index];const buttons=[...opts.children];buttons[item.c].classList.add('correct');if(choice===item.c){score++;feedback.textContent='Correct! '+item.ex}else{button.classList.add('wrong');feedback.textContent='Not quite. '+item.ex}scoreText.textContent=`Score: ${score}`;next.hidden=false};
 next.addEventListener('click',()=>{index++;if(index<gameData.length)render();else{playArea.hidden=true;result.classList.add('show');final.textContent=`You scored ${score} out of ${gameData.length}.`}});
 restart.addEventListener('click',()=>{index=0;score=0;playArea.hidden=false;result.classList.remove('show');render()});render()}
