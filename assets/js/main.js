function cronometro(){
    const timer = document.querySelector('.timer');
    const timeSaved = document.querySelector('.time-saved');
    const start = document.querySelector('.start');
    const pause = document.querySelector('.pause');
    const reset = document.querySelector('.reset');
    const save = document.querySelector('.save');
    const del = document.querySelector('.delete');

    let milliseconds = 0;
    let interval;
    let act = false;

    document.addEventListener('click',function(e){
        const el = e.target;
        if(el.classList.contains('start')){
            createTimer()
            timer.style.color = 'white'
            act = false;
        }
        if(el.classList.contains('pause')){
            clearInterval(interval);
            timer.style.color = 'red'
            act = true;
        }
        if(el.classList.contains('reset')){
            clearInterval(interval);
            timer.style.color = 'white'
            timer.innerHTML = '00:00:00<span>:00<span>'
            milliseconds = 0;
            act = true;
        }
        if(el.classList.contains('save')){
            console.log('save')
            createTimeSaved(milliseconds);
        }
        if(el.classList.contains('delete')){
            el.parentElement.remove();
            console.log('apagar clicado')
        }
    })
   

    //keypress
    document.addEventListener('keypress',function(e){
        e.preventDefault();
        const el = e.target;
        if(e.key === 'Enter'){
            start.click()
        }
        if(e.key === ' '){
            pause.click()
        }
        if(e.key === 's'){
            save.click()
        }
        if(e.key === 'r'){
            reset.click()
        }
    })

    //save
    function createTimeSaved(mili){
        let li = document.createElement('li');
        if(act === true && milliseconds !== 0){
            li.innerHTML = createHoursMili(mili);
            timeSaved.appendChild(li);
            buttonDelete(li);
        }
    }

    function buttonDelete(li){
        li.innerHTML += '    ';
        const btn = document.createElement('button');
        btn.innerHTML = 'delete';
        btn.setAttribute('class','delete');
        li.appendChild(btn);
    }

//###################################################################



    //timer
    function addZero(num){
        return num >= 10 ? num : `0${num}`
    }

    function createHoursMili(mili){
        let date = new Date(mili);
        let milliseconds = date.getMilliseconds();
        return `${date.toLocaleTimeString('pt-BR',{
            hours12: false,
            timeZone: 'UTC',
        })}<span>:${addZero(milliseconds / 10)}</span>`;
    }

    function createTimer(){
        if(milliseconds === 0){
            interval = setInterval(function(){
                milliseconds += 10;
                timer.innerHTML = createHoursMili(milliseconds);
  
            }, 10);
        }else if(milliseconds !== 0 && act === false){
            console.log('botão ja precionado')
        }else if(act === true){
            interval = setInterval(function(){
                milliseconds += 10;
                timer.innerHTML = createHoursMili(milliseconds);
            }, 10);
        }
    }
}
cronometro()