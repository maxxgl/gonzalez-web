async function populate() {
  const url = "https://gonzalez-staging.herokuapp.com/speed"

  const response = await fetch(url)
  const data = await response.json()

  const user = document.getElementById('user')
  const speed = document.getElementById('speed')
  const time = document.getElementById('time')
  user.innerHTML = data.userId
  speed.innerHTML = data.speed
  time.innerHTML = data.unit.$date
}

function success(pos) {
  console.log(pos)
  const el = document.getElementById('positions')
  const node = document.createElement("div")
  node.innerHTML = `
    <div class="flex position">
      <div>
        <div>Latitude: ${pos.coords.latitude}</div>
        <div>Longitude: ${pos.coords.longitude}</div>
        <div>Speed: ${pos.coords.speed}</div>
      </div>
      <div>
        <div>Accuracy: ${pos.coords.accuracy}</div>
        <div>Timestamp: ${pos.timestamp}</div>
        <div>Heading: ${pos.heading}</div>
      </div>
    </div>
  `
  el.prepend(node)
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.watchPosition(success, error)
