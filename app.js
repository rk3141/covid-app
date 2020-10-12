var output = document.getElementById("output")
document.getElementById("coun").focus();

function dofetch(country) {
        try {
            fetch(`https://covid19-api.org/api/status/${country}`)
            .then((resp) => { resp.json().then( (x) => {
                        if (x['error']) {
                            output.innerHTML = "Oh No! Country not found<br>Try Blanking the inputs for getting valid inputs. PROTIP: You also get an ordered list"
                            return;
                        }
                        
                        console.log(x)
                        
                        if (x == '' || x[0]) {
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
                        try {
                            document.getElementById('foot').style1.opacity = '1';
                        }
                         catch {}
                        
                        fetch(`https://restcountries.eu/rest/v2/alpha/${country}`).then(
                            res => {
                                res.json().then(
                                    r => {
                                        country = r['name']
                                        
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
                                        drawg(country,r["alpha2Code"]);
                                    }
                                )
                            }
                        )

                        
                    }
                )
            })
        }
        catch {
            output.innerHTML = "Oh No! Country not found<br>Try Blanking the inputs for getting valid inputs. <b>PROTIP<b>: You also get an ordered list"
        }
}

function main() {
         country = document.getElementById('coun').value
        
        console.log(country)
            
            if (country.length != 2 && country.length != 0 ) {
                fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`).then(
                    res => {
                        res.json().then (
                            r => {
                                if (r[status]) {
                                    output.innerHTML = "Oh No! Country not found!"
                                    return
                                }
                                try {
                                    var code = r[0]["alpha2Code"];
                                }
                                catch {
                                    var code = false;
                                }
                                if (!code) {
                                    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(
                                        response => [
                                            response.json().then(
                                                json => {
                                                    try {
                                                        code = json[0]["alpha2Code"];
                                                    }
                                                    catch {
                                                        output.innerHTML = "Oh No! Country not found!"
                                                        return;
                                                    }

                                                    dofetch(code)
                                                }
                                            )
                                        ]
                                    )
                                    return;
                                }
                                dofetch(code)
                            }
                        )
                    }
                )
                return;
            }
            

        
            dofetch(country)
}

async function drawg(name,code) {
    var ctx = document.getElementById('chart').getContext('2d');

    if (window.innerWidth < 600) {
        return
    }
    var resp = await fetch(`https://covid19-api.org/api/timeline/${code}`)
    resp.text().then(
        d => {
            document.getElementById('foot').style.opacity = '0';
            var labels = [];
            var data = []
            var p = JSON.parse(d)
            for (let item of p) {
                labels.push(item["last_update"])
                data.push(item["cases"])
            }
            scrollBy(0,100);
            
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',
                // The data for our dataset
                data: {
                    labels: labels,
                    datasets: [{
                        label: name,
                        backgroundColor: "rgb(255,220,0)",
                        borderColor:     "rgb(255,220,0)",
                        data: data.reverse()
                    }]
                },
                // Configuration options go here
                options: {
                    labels: {
                        display: false,
                    }
                }
            });
        }
    )
    
}