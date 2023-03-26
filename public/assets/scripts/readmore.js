function showMore(event) {
    var dots = event.target.previousElementSibling.querySelector(".dots");
    var moreText = event.target.previousElementSibling.querySelector(".more");
    var image = event.target.parentElement.querySelector(".profile_img");
    var btnText = event.target;

    if (dots.style.display === "none") {
        moreText.style.display = "inline-block";
        moreText.classList.add("slide_up");
        image.scrollIntoView({behavior: "smooth"});

        moreText.addEventListener('animationend', function eventHandler() {
            moreText.style.display = "none";
            moreText.classList.remove("slide_up");

            dots.style.display = "inline";
            btnText.innerHTML = "▾ Read more ▾";

            moreText.removeEventListener('animationend', eventHandler);
        });
    } else {
        dots.scrollIntoView({behavior: "smooth", inline: "nearest"});
        dots.style.display = "none";
        btnText.innerHTML = "▴ Read less ▴";
        moreText.style.display = "inline-block";

        moreText.addEventListener('animationend', function eventHandler() {
            moreText.style.display = "inline";
        });
    }
}
