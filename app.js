var output = document.getElementById("output")
function main() {
        country = document.getElementById('coun').value
        fetch(`https://covid19-api.org/api/status/${country}`)
        .then((resp) => {
            resp.json()
                .then( (x) => {
                        if (x['error']) {
                            output.innerHTML = "Oh No! Country not found"
                            return;
                        }

                        console.log(x)
                        if (x[0]) {
                            output.innerHTML += "Try These: <br><ol>"
                            let m = 0;
                            for (let country of x) {
                                m++;
                                pad = " "
                                if (m < 10) {
                                    pad = "  "
                                }
                                output.innerHTML += `<li>${m}.${pad}${country['country']}</li>`
                            }
                            output.innerHTML += "</ol>"
                            return
                        }
                        

                        output.innerText = ""
                        reports = x['cases']
                        recover = x['recovered']
                        deaths = x['deaths']
                        active = reports-(recover+deaths)
                        lastUp = x['last_update']
                        actPane = document.createElement("div")
                        actPane.textContent = `Active in ${country}: ${active}`
                        
                        recPane = document.createElement("div")
                        recPane.textContent = `Recovered in ${country}: ${recover}`
                        dPane = document.createElement("div")
                        dPane.textContent = `Deaths in ${country}: ${deaths}`

                        luPane = document.createElement("div")
                        luPane.classList.add("data")
                        luPane.textContent = `Last Updated on ${lastUp}`

                        output.appendChild(actPane)
                        output.appendChild(recPane)
                        output.appendChild(dPane)
                        output.appendChild(luPane)
                    }
                )
        })
    
}
