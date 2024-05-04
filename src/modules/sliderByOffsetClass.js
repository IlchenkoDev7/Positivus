class SliderByOffset{
    constructor(slidesArray, slideClass, sliderWrapperSelector, innerSlideWrapperSelector, currentSlideNumberSelector, totalSlideNumberSelector, nextButtonSelector, prevButtonSelector, mainSliderBlockSelector) {

        this.slidesArray = slidesArray;
        this.slideClass = slideClass;

        this.sliderWrapper = document.querySelector(sliderWrapperSelector);
        this.currentSlideNumber = document.querySelector(currentSlideNumberSelector);
        this.totalSlideNumber = document.querySelector(totalSlideNumberSelector);
        this.nextButton = document.querySelector(nextButtonSelector);
        this.prevButton = document.querySelector(prevButtonSelector);
        this.mainSliderBlock = document.querySelector(mainSliderBlockSelector);
        this.innerSlideWrapper = document.querySelector(innerSlideWrapperSelector);
        
        this.totalSlideCount = slidesArray.length;

        this.slideElements = [];
        this.carouselElements = [];

        this.wrapperWidth = window.getComputedStyle(this.sliderWrapper).width;

        this.wrapperWidthNumber = +(this.wrapperWidth.replace(/\D/g, ''));

        this.offset = 0;
        this.currentSlideIndex = 0;

    }

    // main function, which initialize slider
    initSlider() {
        this.setTotalSlidesNumber();

        this.createAndSettingsWrappers();

        this.changeSlide(this.offset, this.currentSlideIndex);

        this.makeCarousel();

        this.changeCarousel(this.currentSlideIndex)

        this.carouselElements.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.changeSlideByCarouselDot(index);

                this.changeSlide(this.offset, this.currentSlideIndex);

                this.changeCarousel(this.currentSlideIndex);
            });
        });

        this.prevButton.addEventListener('click', () => {
            this.prevSlideIndex();

            this.changeSlide(this.offset, this.currentSlideIndex);

            this.changeCarousel(this.currentSlideIndex)
        });

        this.nextButton.addEventListener('click', () => {
            this.nextSlideIndex();

            this.changeSlide(this.offset, this.currentSlideIndex);

            this.changeCarousel(this.currentSlideIndex)
        });
    }

    
    // work with wrappers, creating slides and append to wrappers
    createAndSettingsWrappers() {
        this.appendSlidesToInnerWrapper();

        this.slideElements.forEach(slide => {
            slide.style.width = `${this.wrapperWidthNumber}px`;
        });

        this.innerSlideWrapper.style.width = `${100 * this.slideElements.length}%`
        this.innerSlideWrapper.style.display = 'flex';
        this.innerSlideWrapper.style.transition = '0.5s all'


        this.sliderWrapper.style.overflow = 'hidden';
    }

    appendSlidesToInnerWrapper() {
        this.clearInnerWrapper();

        this.createSlidesElements().forEach((slideElement) => {
            this.innerSlideWrapper.append(slideElement);
        })
    }

    createSlidesElements() {
        this.slidesArray.forEach((slide) => {
            const slideElement = document.createElement('div');
            slideElement.classList.add('offer__slide');

            slideElement.innerHTML = `
                    <img src="${slide.img}" alt="${slide.altimg}">
                `;

            this.slideElements.push(slideElement);
        });

        return this.slideElements;
    }

    clearInnerWrapper() {
        if (this.innerSlideWrapper.innerHTML !== '') {
            document.querySelectorAll(`.${this.slideClass}`).forEach(slide => {
                slide.remove();
            })
        }
    }


    // change slide by slider offset and slide index
    changeSlide(offset, index) {
        this.innerSlideWrapper.style.transform = `translateX(-${offset}px)`;

        this.changeCurrentNumber(index + 1)
    }


    // work with carousel
    makeCarousel() {
        this.mainSliderBlock.style.position = 'relative';

        const carouselIndicatorsBlock = document.createElement('ol');
        carouselIndicatorsBlock.classList.add('carousel-indicators');

        this.slideElements.forEach((slide) => {
            const dot = document.createElement('li');
            dot.classList.add('dot');

            this.carouselElements.push(dot);

            carouselIndicatorsBlock.append(dot);
        })

        this.mainSliderBlock.append(carouselIndicatorsBlock);
    }

    changeCarousel(slideIndex) {
        this.carouselElements.forEach((dot) => {
            dot.style.opacity = 0.6;
        })
        this.carouselElements[slideIndex].style.opacity = '1';
    }


    // work with slider offset and slide index by carousel dot
    changeSlideByCarouselDot(slideIndex) {
        this.offset = (slideIndex) * (this.wrapperWidthNumber);

        this.currentSlideIndex = slideIndex;
    }



    // work with slider offset and slide index
    nextSlideIndex() {
        if (this.currentSlideIndex < this.totalSlideCount - 1) {
            this.offset += +this.wrapperWidthNumber;
            this.currentSlideIndex += 1
        } else {
            this.offset = 0;
            this.currentSlideIndex = 0;
        }
    }

    prevSlideIndex() {
        if (this.currentSlideIndex > 0) {
            this.offset -= +this.wrapperWidthNumber;
            this.currentSlideIndex -= 1
        } else {
            this.offset = +this.wrapperWidthNumber * (this.slideElements.length - 1);
            this.currentSlideIndex = this.totalSlideCount - 1
        }
    }



    // work with numbers over slider (current slide / total slider count)
    setTotalSlidesNumber() {
        let count = this.totalSlideCount;

        if (count.toString().length === 1) {
            count = `0${count}`;
        }
        this.totalSlideNumber.textContent = count;
    }

    changeCurrentNumber(index) {
        if (index.toString().length === 1) {
            index = `0${index}`;
        }

        this.currentSlideNumber.textContent = `${index}`;
    }

}

export default SliderByOffset;