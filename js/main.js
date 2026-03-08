(function () {
  function initSlider() {
    var slider = document.querySelector("[data-slider]");
    if (!slider) {
      return;
    }

    var img = slider.querySelector("[data-slider-image]");
    var caption = slider.querySelector("[data-slider-caption]");
    var status = slider.querySelector("[data-slider-status]");
    var prevBtn = slider.querySelector("[data-slider-prev]");
    var nextBtn = slider.querySelector("[data-slider-next]");
    var pauseBtn = slider.querySelector("[data-slider-pause]");

    if (!img || !caption || !status || !prevBtn || !nextBtn || !pauseBtn) {
      return;
    }

    var slides = [
      {
        src: "images/slide1.jpg",
        alt: "Gaming setup with controller and display",
        text: "Gaming is one of my favorite hobbies."
      },
      {
        src: "images/slide2.jpg",
        alt: "Sketchbook and drawing tools",
        text: "Drawing helps me stay creative."
      },
      {
        src: "images/slide3.jpg",
        alt: "Headphones and music setup",
        text: "Music helps me relax and focus."
      }
    ];

    var index = 0;
    var isPlaying = true;
    var timer = null;

    function render() {
      img.src = slides[index].src;
      img.alt = slides[index].alt;
      caption.textContent = slides[index].text;
      status.textContent = "Slide " + (index + 1) + " of " + slides.length;
    }

    function nextSlide() {
      index = (index + 1) % slides.length;
      render();
    }

    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      render();
    }

    function startAutoPlay() {
      timer = window.setInterval(nextSlide, 4000);
      pauseBtn.textContent = "Pause";
      isPlaying = true;
    }

    function stopAutoPlay() {
      window.clearInterval(timer);
      pauseBtn.textContent = "Play";
      isPlaying = false;
    }

    prevBtn.addEventListener("click", function () {
      prevSlide();
    });

    nextBtn.addEventListener("click", function () {
      nextSlide();
    });

    pauseBtn.addEventListener("click", function () {
      if (isPlaying) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });

    render();
    startAutoPlay();
  }

  function initBackToTop() {
    var button = document.querySelector("[data-back-to-top]");
    if (!button) {
      return;
    }

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  function initMapFeature() {
    var mapEl = document.getElementById("map");
    if (!mapEl) {
      return;
    }

    if (!window.google || !window.google.maps) {
      mapEl.textContent = "Google Maps failed to load. Check your API key and internet connection.";
      return;
    }

    var places = [
      {
        name: "Illinois Institute of Technology",
        position: { lat: 41.8349, lng: -87.6270 }
      },
      {
        name: "Harold Washington College",
        position: { lat: 41.8765, lng: -87.6260 }
      },
      {
        name: "Downtown Chicago",
        position: { lat: 41.8830, lng: -87.6320 }
      }
    ];

    var map = new window.google.maps.Map(mapEl, {
      center: places[0].position,
      zoom: 11,
      mapTypeControl: true
    });

    var info = new window.google.maps.InfoWindow();

    places.forEach(function (place) {
      var marker = new window.google.maps.Marker({
        position: place.position,
        map: map,
        title: place.name
      });

      marker.addListener("click", function () {
        info.setContent("<p>" + place.name + "</p>");
        info.open(map, marker);
      });
    });

    var routeLine = new window.google.maps.Polyline({
      path: places.map(function (place) {
        return place.position;
      }),
      geodesic: true,
      strokeOpacity: 0.8,
      strokeWeight: 3
    });

    routeLine.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        new window.google.maps.Marker({
          position: userPosition,
          map: map,
          title: "Your approximate location"
        });

        map.setCenter(userPosition);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSlider();
    initBackToTop();
  });

  window.initMap = function () {
    initMapFeature();
  };
})();
