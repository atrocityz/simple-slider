const slider = document.querySelector("[data-slider]");
const prevBtn = document.querySelector("[data-btn-prev]");
const nextBtn = document.querySelector("[data-btn-next]");

const images = ["https://placehold.co/800x400?text=Slide+1", "https://placehold.co/800x400?text=Slide+2", "https://placehold.co/800x400?text=Slide+3", "https://placehold.co/800x400?text=Slide+4"];

let currentIndex = 0;
const ANIMATION_TIME = 0.3;

const setupSlides = () => {
  images.forEach((imagesUrl, index) => {
    const img = document.createElement("img");
    img.classList.add("slider__item");
    img.src = imagesUrl;
    img.dataset.index = index;
    img.alt = `slide ${index + 1}`;

    slider.appendChild(img);
  });

  const firstClone = slider.firstElementChild.cloneNode(true);
  const lastClone = slider.lastElementChild.cloneNode(true);

  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slider.firstChild);
};

const initialSlider = () => {
  const slideWidth = slider.firstElementChild.offsetWidth;
  slider.style.transition = `none`;
  slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
};

const goToNextSlide = () => {
  const slideWidth = slider.firstElementChild.offsetWidth;
  currentIndex++;
  slider.style.transition = `translate ${ANIMATION_TIME}s ease-in-out`;
  slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;

  slider.addEventListener("transitionstart", () => (nextBtn.disabled = true), { once: true });

  slider.addEventListener(
    "transitionend",
    () => {
      nextBtn.disabled = false;
      if (currentIndex >= images.length) {
        currentIndex = 0;
        slider.style.transition = `none`;
        slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
      }
    },
    { once: true }
  );
};

const goToPrevSlide = () => {
  const slideWidth = slider.firstElementChild.offsetWidth;
  currentIndex--;
  slider.style.transition = `translate ${ANIMATION_TIME}s ease-in-out`;
  slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;

  slider.addEventListener("transitionstart", () => (prevBtn.disabled = true), { once: true });

  slider.addEventListener(
    "transitionend",
    () => {
      prevBtn.disabled = false;
      if (currentIndex < 0) {
        currentIndex = images.length - 1;
        slider.style.transition = `none`;
        slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
      }
    },
    { once: true }
  );
};

nextBtn.addEventListener("click", () => goToNextSlide());
prevBtn.addEventListener("click", () => goToPrevSlide());

setupSlides();
initialSlider();

window.addEventListener("resize", () => initialSlider());
