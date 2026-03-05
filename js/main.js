(function () {
  function initSlider() {
    var slider = document.querySelector("[data-slider]");
    if (!slider) {
      return;
    }

    var img = slider.querySelector("[data-slider-image]");
    var caption = slider.querySelector("[data-slider-caption]");
    var prevBtn = slider.querySelector("[data-slider-prev]");
    var nextBtn = slider.querySelector("[data-slider-next]");

    if (!img || !caption || !prevBtn || !nextBtn) {
      return;
    }

    var slides = [
      { src: "images/slide1.jpg", alt: "Slide 1: gaming controller and desk setup", text: "Gaming setup" },
      { src: "images/slide2.jpg", alt: "Slide 2: sketchbook and pencils", text: "Drawing and creativity" },
      { src: "images/slide3.jpg", alt: "Slide 3: headphones and music", text: "Music and focus" }
    ];

    var index = 0;

    function render() {
      img.src = slides[index].src;
      img.alt = slides[index].alt;
      caption.textContent = slides[index].text;
    }

    prevBtn.addEventListener("click", function () {
      index = (index - 1 + slides.length) % slides.length;
      render();
    });

    nextBtn.addEventListener("click", function () {
      index = (index + 1) % slides.length;
      render();
    });

    render();
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
      { name: "Downtown Chicago", position: { lat: 41.883, lng: -87.632 } },
      { name: "Museum Campus", position: { lat: 41.866, lng: -87.614 } },
      { name: "Hyde Park", position: { lat: 41.794, lng: -87.591 } }
    ];

    var map = new window.google.maps.Map(mapEl, {
      center: places[0].position,
      zoom: 12,
      mapTypeControl: true
    });

    var info = new window.google.maps.InfoWindow();

    places.forEach(function (p) {
      var marker = new window.google.maps.Marker({
        position: p.position,
        map: map,
        title: p.name
      });

      marker.addListener("click", function () {
        info.setContent("<p>" + p.name + "</p>");
        info.open(map, marker);
      });
    });

    var line = new window.google.maps.Polyline({
      path: places.map(function (p) { return p.position; }),
      geodesic: true,
      strokeOpacity: 0.8,
      strokeWeight: 3
    });

    line.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        var userPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        new window.google.maps.Marker({
          position: userPos,
          map: map,
          title: "Your approximate location"
        });

        map.setCenter(userPos);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSlider();
  });

  window.initMap = function () {
    initMapFeature();
  };
})();
