var output = document.getElementById("output")
function main() {
        country = document.getElementById('coun').value
        fetch(`https://covid19-api.org/api/status/${country}`)
        .then((resp) => {
            resp.json()
                .then( (x) => {
                        if (x['error']) {
                            output.innerHTML = "Oh No! Country not found<br>Try Blanking the inputs for getting valid inputs. PROTIP: You also get an ordered list"
                            return;
                        }

                        console.log(x)
                        if (x[0]) {
                            output.innerHTML = ""
                            output.innerHTML += "Try These: <br>"
                            document.getElementById('foot').style.opacity = '0';
                            let m = 0;
                            for (let country of x) {
                                m++;
                                var pad = ' '
                                output.innerHTML += `${m}.${pad}${country['country']}<br>`
                            }
                            
                            return
                        }
                        
                        document.getElementById('foot').style.opacity = '1';

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