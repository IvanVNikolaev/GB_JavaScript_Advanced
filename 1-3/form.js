let $form = document.getElementById('form');

function testInput(elem, regexp) {
    if (!regexp.test(elem.value) || elem.value.length == 0) {
        elem.classList.add('error');
        elem.nextElementSibling.style.display = "block";
        return;
    }
    elem.classList.remove('error');
    elem.nextElementSibling.style.display = "none";
}

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    testInput(e.target[0], /^[a-zA-Zа-яА-ЯёЁ\s]+$/);
    testInput(e.target[1], /\+\d{1}\(\d{3}\)\d{3}-\d{4}/);
    testInput(e.target[2], /^([a-z0-9]+)(\.?)(-?)([a-z0-9]+)@([a-z0-9]+)(\.?)(-?)([a-z0-9]+)\.([a-z\.?]{2,6})$/i);
});