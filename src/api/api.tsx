const Api = {

  getGenset: () => fetch('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=28')
    .then(res => res.json())
    .then(data => {
      // Sets data as a json object
      const json = {
        "genset1": 
          {
            "AvailablePowerPMS": data[0],
            "GeneratorPowerTotal": data[1],
            "Speed": data[2],
            "TotalFuelLevel": data[3],
            "Volt": data[4],
            "TimeActive": data[5],
            "Hz": data[6]
          },
        
        "genset2":
          {
            "AvailablePowerPMS": data[7],
            "GeneratorPowerTotal": data[8],
            "Speed": data[9],
            "TotalFuelLevel": data[10],
            "Volt": data[11],
            "TimeActive": data[12],
            "Hz": data[13]
          },

        "genset3":
          {
            "AvailablePowerPMS": data[14],
            "GeneratorPowerTotal": data[15],
            "Speed": data[16],
            "TotalFuelLevel": data[17],
            "Volt": data[18],
            "TimeActive": data[19],
            "Hz": data[20]
          },
       
        "genset4":
          {
            "AvailablePowerPMS": data[21],
            "GeneratorPowerTotal": data[22],
            "Speed": data[23],
            "TotalFuelLevel": data[24],
            "Volt": data[25],
            "TimeActive": data[26],
            "Hz": data[27]
          }

      }

      return {
        genset1: json.genset1, 
        genset2: json.genset2, 
        genset3: json.genset3, 
        genset4: json.genset4
      }
    }),

  
}

export default Api;