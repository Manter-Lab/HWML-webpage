var gallery = document.querySelector('.image_gallery');
var imageContainer = gallery.querySelector('.images');
var images = imageContainer.querySelectorAll('img');
var galleryLeft = gallery.querySelector('.image_gallery .left_button');
var galleryRight = gallery.querySelector('.image_gallery .right_button');

var buttonBar = gallery.querySelector('.selector_buttons');
var buttons = buttonBar.querySelectorAll('button');
var playPause = buttonBar.querySelector('.play_pause');

let touchstartX = 0
let touchendX = 0
var index = Math.floor(Math.random() * images.length);
var oldIndex;
var paused = false;

// Add active to the first image
images[index].classList.add('active');
buttons[index].classList.add('active');

var imageTimer = setInterval(updateGallery, 5000, 1); // Change image every 5 seconds

function galleryDirection(direction, target = -1) {
    updateGallery(direction, target);
    if (!paused) {
        clearInterval(imageTimer);
        imageTimer = setInterval(updateGallery, 5000, 1);
    }
}

// Direction 1 moves to the right, 0 moves to the left
// Target skips directly to an image index, bypassing
// direction entirely
function updateGallery(direction, target = -1) {
    function removeImageAttr() {
        images[oldIndex].classList.remove('active', 'fadeout');
        images[oldIndex].removeEventListener('animationend', removeImageAttr);
    }

    oldIndex = index;

    if (target > -1) {
        index = target;
    } else if (direction == 1) {
        index += 1;
    } else {
        index -= 1;
    }

    if (index >= images.length) {
        index = 0;
        oldIndex = images.length - 1;
    } else if (index < 0) {
        index = images.length - 1;
        oldIndex = 0;
    }

    images.forEach((el) => el.classList.remove('active', 'fadeout'));
    images[index].classList.add('active');
    buttons[index].classList.add('active');
    images[oldIndex].classList.add('active', 'fadeout');
    buttons[oldIndex].classList.remove('active');
    images[oldIndex].addEventListener('animationend', removeImageAttr);
    images[index].removeEventListener('animationend', removeImageAttr);
}

galleryLeft.addEventListener("click", function() {
    galleryDirection(0)
});

galleryRight.addEventListener("click", function() {
    galleryDirection(1)
});

function checkDirection() {
    if (touchendX < touchstartX - 50) {
        galleryDirection(1)
    }
    if (touchendX > touchstartX + 50) {
        galleryDirection(0)
    }
}

gallery.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
}, {passive: true});

gallery.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
});

imageContainer.onclick = e => {
    if (e.target === e.currentTarget) return;
    if (window.matchMedia('(max-width: 870px)').matches) return;

    var dialog = document.querySelector('.image_gallery dialog');
    dialog.addEventListener('click', function (event) {
        var rect = dialog.getBoundingClientRect();
        var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if(!isInDialog) {
            dialog.close();
        }
    });

    var fullImage = imageList[0][index];
    var extension = imageList[1][index];

    dialog.children[0].src = "/galleries/" + fullImage + ".webp";
    var fullResImage = "/images/" + fullImage + extension;
    dialog.showModal();
    dialog.children[0].src = fullResImage;
    dialog.children[1].href = fullResImage;
}

buttonBar.onclick = e => {
    if(e.target === e.currentTarget || e.target == Array.from(e.target.parentElement.children)[0]) {
        return;
    }
    var index = Array.from(e.target.parentElement.children).indexOf(e.target) - 1;
    galleryDirection(1, index);
}

playPause.onclick = e => {
    if (paused) {
        e.target.src = "/assets/images/icons/pause.svg"
        e.target.title = "Playing";
        paused = false;
        clearInterval(imageTimer);
        imageTimer = setInterval(updateGallery, 5000, 1);
    } else {
        e.target.src = "/assets/images/icons/play.svg";
        e.target.title = "Paused";
        paused = true;
        clearInterval(imageTimer);
    }
}
