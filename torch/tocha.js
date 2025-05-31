function TorchRouteViewModel() {
    var self = this;
    self.routes = ko.observableArray([]);
    var isRunning = false; 

    self.formatDate = function (dateString) {
        var date = new Date(dateString);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        var hours = String(date.getHours()).padStart(2, '0');
        var minutes = String(date.getMinutes()).padStart(2, '0');
        var seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    //table de + info
    var table = document.querySelector('.table');
    var toggleButton = document.getElementById('showTable');
    toggleButton.addEventListener('click', () => {
        table.classList.toggle('d-none');
        if (table.classList.contains('d-none')) {
            toggleButton.textContent = '+Informação';
        } else {
            toggleButton.textContent = '-Informação';
        }
    });
    self.loadRoutes = function () {
        $.ajax({
            url: 'http://192.168.160.58/Paris2024/api/Torch_route', 
            type: 'GET', 
            dataType: 'json', 
            success: function (data) {
                self.routes(data);  
                self.initMap();     
            },
            error: function (xhr, status, error) {
                console.error('Erro ao carregar os dados:', error);
            }
        });
    };
        

    self.initMap = function () {
        var map = L.map('map').setView([37.645740, 21.625454], 15);

        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var latlngs = [];
        var dataset = [];

        var torchIcon = L.icon({
            iconUrl: 'torch-icon.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        var personIcon = L.icon({
            iconUrl: 'gajoandar.png',
            iconSize: [80, 80],
            iconAnchor: [40, 80],
            popupAnchor: [0, -80]
        });

        self.routes().forEach(function (route) {
            if (route.Lat && route.Lon) {
                var lat = parseFloat(route.Lat);
                var lon = parseFloat(route.Lon);
                if (!isNaN(lat) && !isNaN(lon)) {
                    var marker = L.marker([lat, lon], { icon: torchIcon }).addTo(map)
                        .bindPopup(`<b>${route.Title}</b><br>${route.City}<br>Stage: ${route.Stage_number}<br>${self.formatDate(route.Date_start)} to ${self.formatDate(route.Date_end)}<br><a href="${route.Url}" target="_blank">More info</a>`);
                    latlngs.push([lat, lon]);
                    dataset.push({ lat: lat, lon: lon, timestamp: new Date(route.Date_start).getTime() });
                }
            }
        });

        if (latlngs.length > 1) {

            var polyline = L.polyline([], { color: 'orange', weight: 2 }).addTo(map);
            map.fitBounds(L.latLngBounds(latlngs));

            var personMarker = L.marker(latlngs[0], { icon: personIcon }).addTo(map);

            let tick = dataset[0].timestamp;
            const endTime = dataset[dataset.length - 1].timestamp;
            let interval;
            let currentIndex = 0;
            let interpolatedPoints = [];

            const progressBar = document.getElementById('progressBar');
            const flame = document.getElementById('flame');

            // função para gerar pontos 
            function interpolatePoints(p1, p2, numPoints) {
                let points = [];
                for (let i = 0; i <= numPoints; i++) {
                    let factor = i / numPoints;
                    points.push([
                        p1[0] + (p2[0] - p1[0]) * factor,
                        p1[1] + (p2[1] - p1[1]) * factor
                    ]);
                }
                return points;
            }

            for (let i = 0; i < dataset.length - 1; i++) {
                let start = [dataset[i].lat, dataset[i].lon];
                let end = [dataset[i + 1].lat, dataset[i + 1].lon];
                let points = interpolatePoints(start, end, 40); // número de pontos 
                interpolatedPoints = interpolatedPoints.concat(points);
            }

            function start() {
                if (isRunning) return; 
                interval = setInterval(() => {
                    if (currentIndex >= interpolatedPoints.length) {
                        stop();
                    } else {
                        moveMarker();
                    }
                }, 30); // alterar a velocidade
                isRunning = true; 
            }

            function stop() {
                clearInterval(interval);
                isRunning = false;
                if (currentIndex >= interpolatedPoints.length) {
                    progressBar.style.width = '100%'; 
                    flame.style.left = '100%'; 
                }
            }

            function moveMarker() {
                if (currentIndex < interpolatedPoints.length) {
                    let position = interpolatedPoints[currentIndex];
                    personMarker.setLatLng(position);
                    polyline.addLatLng(position);
                    currentIndex++;

                    
                    let progress = (currentIndex / interpolatedPoints.length) * 100;
                    progressBar.style.width = progress + '%';

                    
                }
            }

            function toggleAnimation() {
                if (isRunning) {
                    stop();
                    document.getElementById('toggleButton').innerText = 'Continuar';
                } else {
                    start();
                    document.getElementById('toggleButton').innerText = 'Parar';
                }
            }

            function resetAnimation() {
                clearInterval(interval);
                currentIndex = 0;
                polyline.setLatLngs([]);
                personMarker.setLatLng(interpolatedPoints[0]);
                progressBar.style.width = '0%'; 
                flame.style.left = '0%'; 
                start();
                document.getElementById('toggleButton').innerText = 'Parar';
                isRunning = true;
            }

            document.getElementById('toggleButton').addEventListener('click', toggleAnimation);
            document.getElementById('resetButton').addEventListener('click', resetAnimation);

            console.log('Starting animation');
            start();
        }
    };

    self.loadRoutes();
}

ko.applyBindings(new TorchRouteViewModel());
