var mountains = document.querySelector('.mountaints')
var hole = document.querySelector('.hole')
var lava = document.querySelector('.lava')
var lake = document.querySelector('.lake')
var forest = document.querySelector('.forest')
var place_name = document.querySelector('#name')
var place_plants = document.querySelector('#plants')
var place_hazards = document.querySelector('#hazards')
var place_diffi = document.querySelector('#difficulty')
var btn = document.querySelector('#play')

function fillData(des_name, des_plants, des_hazards, des_diffi) {
    btn.disabled = false
    var l_des_name = des_name.toLowerCase();
    place_name.innerHTML = des_name;
    place_plants.innerHTML = des_plants;
    place_hazards.innerHTML = des_hazards;
    place_diffi.innerHTML = des_diffi;
    place_diffi.className = des_diffi;
    btn.addEventListener('click', ev => {
        window.location.href = './maps/' + l_des_name + '.html'
    })
}


