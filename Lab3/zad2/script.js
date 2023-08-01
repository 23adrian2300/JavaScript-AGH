
function applyStyles(){
    document.getElementsByTagName('header')[0].classList.add('azure');
    document.getElementsByTagName('div')[0].classList.add('main-container');
    document.getElementsByTagName('nav')[0].classList.add('azure');
    document.getElementsByTagName('main')[0].classList.add('azure');
    document.getElementsByTagName('aside')[0].classList.add('azure');
    document.getElementsByTagName('footer')[0].classList.add('azure');
}

function deleteStyles(){
    var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        all[i].classList = [];
    }
}

const wojskiConcert = [
    'Natenczas Wojski chwycił na taśmie przypięty',
    'Swój róg bawoli, długi, cętkowany, kręty',
    'Jak wąż boa, oburącz do ust go przycisnął,',
    'Wzdął policzki jak banię, w oczach krwią zabłysnął,',
    'Zasunął wpół powieki, wciągnął w głąb pół brzucha',   
    'I do płuc wysłał z niego cały zapas ducha,',
    'I zagrał: róg jak wicher, wirowatym dechem',
    'Niesie w puszczę muzykę i podwaja echem.',
  
    'Umilkli strzelcy, stali szczwacze zadziwieni',
    'Mocą, czystością, dziwną harmoniją pieni.',
    'Starzec cały kunszt, którym niegdyś w lasach słynął,',
    'Jeszcze raz przed uszami myśliwców rozwinął;',
    'Napełnił wnet, ożywił knieje i dąbrowy,',
    'Jakby psiarnię w nie wpuścił i rozpoczął łowy.',
  
    'Bo w graniu była łowów historyja krótka:',
    'Zrazu odzew dźwięczący, rześki: to pobudka;',
    'Potem jęki po jękach skomlą: to psów granie;',
    'A gdzieniegdzie ton twardszy jak grzmot: to strzelanie.'
  ];
  
  const mainElement = document.querySelector('main');
  
  let currentIndex = 0;
  
  function addParagraph() {
    if (currentIndex >= wojskiConcert.length) {
        document.getElementById('add').disabled = true;
      return;
    }
    const paragraph = document.createElement('blockquote');
    const paragraphText = document.createTextNode(wojskiConcert[currentIndex]);
    paragraph.appendChild(paragraphText);
    mainElement.appendChild(paragraph);
  
    currentIndex++;
  }
  


  document.getElementById('set').addEventListener('click', applyStyles);
  document.getElementById('delete').addEventListener('click', deleteStyles);
  document.getElementById('add').addEventListener('click', addParagraph);
