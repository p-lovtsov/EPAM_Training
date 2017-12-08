deb.addEventListener( 'click', debounce(draw, 500) );

function debounce (func, timer) {
    var time = 0;
    return function () {
        if (time) {
            clearTimeout(time);
        }
        time = setTimeout( func, timer );
    }
}

function draw () {
    var div = document.createElement('div');
    div.innerText = document.querySelector('#deb').value;
    document.body.appendChild(div);
}