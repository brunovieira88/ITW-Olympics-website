google.charts.load('current', { 'packages': ['corechart'] });

function drawMedalsChart(medals) {
    if (!medals || medals.length === 0) return;

    var goldCount = medals.filter(m => m.MedalName === 'Gold Medal').length;
    var silverCount = medals.filter(m => m.MedalName === 'Silver Medal').length;
    var bronzeCount = medals.filter(m => m.MedalName === 'Bronze Medal').length;

    var data = google.visualization.arrayToDataTable([
        ['Medal', 'Count', { role: 'style' }],
        ['Gold', goldCount, 'gold'],
        ['Silver', silverCount, 'silver'],
        ['Bronze', bronzeCount, 'color: #CD7F32']
    ]);

    var options = {
        title: 'Medal Distribution',
        bar: { groupWidth: '75%' },
        legend: { position: 'none' },
        backgroundColor: 'transparent',
        titleTextStyle: {
            color: '#007bff',
            fontSize: 16,
            bold: true
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('medals-chart'));
    chart.draw(data, options);
}

function ViewModel() {
    var self = this;
    self.Name = ko.observable('');
    self.Photo = ko.observable('');
    self.Url = ko.observable('');
    self.Athletes = ko.observableArray([]);
    self.Coaches = ko.observableArray([]);
    self.Medals = ko.observableArray([]);
    self.Teams = ko.observableArray([]);

    const urlParams = new URLSearchParams(window.location.search);
    const nocId = urlParams.get('id');
    if (!nocId) {
        alert('Nenhum ID de NOC fornecido na URL.');
        return;
    }

    const apiUrl = `http://192.168.160.58/Paris2024/api/NOCs/${nocId}`;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(data) {
            self.Name(data.Name);
            self.Photo(data.Photo);
            self.Url(data.Url);
            self.Athletes(data.Athletes || []);
            self.Coaches(data.Coaches || []);
            self.Medals(data.Medals || []);
            self.Teams(data.Teams || []);
            google.charts.setOnLoadCallback(() => drawMedalsChart(data.Medals));
        },
        error: function() {
            console.error('Erro ao buscar dados do NOC.');
            alert('Erro ao buscar dados do NOC. Por favor, tente novamente mais tarde.');
        }
    });
}
ko.applyBindings(new ViewModel());