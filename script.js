document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value
    if(input){
        showWarning('Carregando...')

        let link = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=62aaa1d1ac60e78addfaec380feb62d7&units=metric&lang=pt_br`
        let results = await fetch(link)
        let json = await results.json()

        if(json.cod === 200)
        {
           AtualizarInterface
           ({
                City: json.name,
                Temp: json.main.temp,
                Icon: json.weather[0].icon,
                WindDirection:json.wind.deg ,
                WindSpeed: json.wind.speed
            })
            
            
        }
        else{
            document.querySelector('.resultado').innerHTML = '';
            showWarning('A Cidade Digitada Está Incorreta!!!')
        }
       // console.log(json.main)
        //console.log(json.weather)
        //console.log(json.wind)
       
       
    }
    
})


function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}

function AtualizarInterface(clima){
    document.querySelector('.aviso').innerHTML = '';
    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.resultado .titulo').innerHTML = `${clima.City}`
    document.querySelector('.temp .tempInfo').innerHTML = `${clima.Temp}<sup>ºC</sup>`
    document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${clima.Icon}@2x.png`
    document.querySelector('.vento .ventoInfo').innerHTML = `${clima.WindSpeed}<span>km/h</span>`
    document.querySelector('.vento .ventoPonto').style.transform = `rotate(${clima.WindDirection}deg)`
}