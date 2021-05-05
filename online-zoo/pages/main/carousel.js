'use strict';
const gap = 20;
const carousel = document.getElementById('carousel');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
let image = document.querySelector('.slider-item').offsetWidth;

let slideIndex = 0;

next.addEventListener('click', () => {
    slideIndex++;
    console.log(carousel.querySelectorAll('.meet-pets-slider__items'));
    carousel.querySelectorAll('.meet-pets-slider__items').forEach(item => {
        console.log(item);
        item.scrollTo((image + gap) * slideIndex, 0);
    });
})