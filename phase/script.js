let interacted = false;
const soundCorrect = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-video-game-win-2016.mp3");
const soundWrong   = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3");

const questions = [
  { text: "في أي وقت نزلت لعبة ماينكرافت؟", options: ["2008", "2009", "2010"], answer: 1 },
  { text: "كم تحتاج أوبسيديان لتبني بوابة النذر؟", options: ["8", "10", "12"], answer: 1 },
  { text: "كم يوجد من حرف في الأبجدية؟", options: ["28", "8", "29"], answer: 1, extra: "8 = ا ل ا ب ج د ي ة" },
  { text: "والد واحد اسمه يوسف، لديه ثلاثة أبناء: مصطفى وأحمد، فمن هو الثالث؟", options: ["كريم", "يوسف", "أحمد"], answer: 1, comment: "منعرفش من وين كريم يجيب في هذي الأسئلة..." },
  { text: "من اكتشف أمريكا؟", options: ["كريستوفر كولومبوس", "الفايكنج", "أحمد"], answer: 2 }
];

let current = 0;
let timeLeft = 15;
let timerInterval;

const questionText = document.getElementById('questionText');
const optionsDiv = document.getElementById('options');
const progress = document.getElementById('progress');
const extraDiv = document.getElementById('extra');
const commentDiv = document.getElementById('comment');
const timerDiv = document.getElementById('timer');

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 15;
  timerDiv.textContent = `⏳ الوقت المتبقي: ${timeLeft}`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `⏳ الوقت المتبقي: ${timeLeft}`;
    if(timeLeft <= 0){
      clearInterval(timerInterval);
      playSound('wrong');
      questions.push(questions.splice(current,1)[0]);
      loadQuestion();
    }
  },1000);
}

function playSound(type){
  if(!interacted){ interacted=true; }
  try{
    if(type==='correct'){ soundCorrect.currentTime=0; soundCorrect.play(); }
    else{ soundWrong.currentTime=0; soundWrong.play(); }
  }catch(e){}
}

function loadQuestion(){
  const q = questions[current];
  questionText.textContent = q.text;
  optionsDiv.innerHTML = '';
  extraDiv.textContent = '';
  commentDiv.textContent = q.comment || ''; // يظهر تحت الخيارات على اليسار
  progress.textContent = `السؤال ${current+1} من ${questions.length}`;
  startTimer();

  q.options.forEach((opt,i)=>{
    const btn = document.createElement('button');
    btn.className='option';
    btn.textContent=opt;
    btn.onclick=()=>{ if(!interacted) interacted=true; selectAnswer(i,btn); };
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(index,button){
  clearInterval(timerInterval);
  const q = questions[current];
  const buttons = document.querySelectorAll('.option');
  buttons.forEach(b=>b.disabled=true);

  if(index===q.answer){
    button.classList.add('correct');
    playSound('correct');
    if(q.extra) extraDiv.textContent=q.extra;
    setTimeout(()=>{
      current++;
      if(current<questions.length){ loadQuestion(); }
      else{
        questionText.textContent="🎉 أحسنت! أنهيت Phase 1";
        optionsDiv.innerHTML='';
        timerDiv.textContent='';
        // الكود السري الكبير
        progress.innerHTML = 'كودك السري هو';
        extraDiv.innerHTML = '<span id="secretCode">#double</span>';
      }
    },1200);
  } else {
    button.classList.add('wrong');
    playSound('wrong');
    questions.push(questions.splice(current,1)[0]);
    setTimeout(loadQuestion,2000);
  }
}

loadQuestion();
