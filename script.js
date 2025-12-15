let map;
let agencies = [];
let modal = document.getElementById('agencyModal');
let agencyName = document.getElementById('agencyName');
let agencyAddress = document.getElementById('agencyAddress');
let agencySchedule = document.getElementById('agencySchedule');
let closeBtn = document.getElementById('closeBtn');
let directionsBtn = document.getElementById('directionsBtn');
let selectedAgency = null;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 5
  });

  // Load agencies from local JSON file
  fetch('agencies.json')
    .then(res => res.json())
    .then(data => {
      agencies = data;
      const bounds = new google.maps.LatLngBounds();

      agencies.forEach(agency => {
        const position = { lat: agency.lat, lng: agency.lng };
        bounds.extend(position);

        const marker = new google.maps.Marker({
          position: position,
          map: map,
          title: agency.name,
          icon: 'pin.png' // Local custom pin
        });

        marker.addListener('click', () => {
          selectedAgency = agency;
          agencyName.textContent = agency.name;
          agencyAddress.textContent = agency.address;
          agencySchedule.textContent = "Horario: " + agency.schedule;
          modal.style.display = 'flex';
        });
      });

      map.fitBounds(bounds);
    })
    .catch(err => console.error('Error cargando JSON:', err));
}

// Close modal
closeBtn.addEventListener('click', () => modal.style.display = 'none');

// Open Google Maps directions
directionsBtn.addEventListener('click', () => {
  if(selectedAgency) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedAgency.lat},${selectedAgency.lng}`, '_blank');
  }
  modal.style.display = 'none';
});

// Close modal on outside click
window.addEventListener('click', e => { if(e.target === modal) modal.style.display = 'none'; });
