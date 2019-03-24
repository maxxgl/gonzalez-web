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

setInterval(populate, 1000)