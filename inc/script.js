function toggleScreen() {
    let body = document.body;
    let topRightButton = document.querySelector('.top-right');
    let centerButton = document.querySelector('.center');

    if (body.style.backgroundColor === 'black') {
        body.style.backgroundColor = 'white';
        topRightButton.style.display = 'block';
        centerButton.style.display = 'none';
    } else {
        body.style.backgroundColor = 'black';
        topRightButton.style.display = 'none';
        centerButton.style.display = 'block';
        centerButton.style.color = 'white';
    }
}
