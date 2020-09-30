    import React, {useState} from 'react'
    import './App.css'
    import Slider from 'react-rangeslider'
    import 'react-rangeslider/lib/index.css'


     const App = () =>  {
      let [height, setHeight] = useState("")
      let [weight, setWeight] = useState("")
      let [heightErr, setHeightErr] = useState("")
      let [weightErr, setWeightErr] = useState("")
      let [bmiValue, setBmiValue] = useState("")
      let [bmiText, setBmiText] = useState("")
      let [chonkVisibility, setChonkVisibility] = useState("invisibleChonk")
      let [text, setText] = useState("")
      let [resultChonk, setResultChonk] = useState("visibleChonk")
      let AllChonkImg = {
        slimChonk: ["./images/slim/1.jpg", "./images/slim/2.jpg", "./images/slim/3.jpg", "./images/slim/4.jpg"],
          normalChonk: ["./images/normal/1.jpg", "./images/normal/2.jpg", "./images/normal/3.jpg", "./images/normal/4.jpg", "./images/normal/5.jpg"],
          fatChonk: ["./images/fat/1.jpg", "./images/fat/2.jpg", "./images/fat/3.jpg", "./images/fat/4.jpg"],
          tooFatChonk: ["./images/2fat/1.jpg", "./images/2fat/2.jpg", "./images/2fat/3.jpg", "./images/2fat/4.jpg", "./images/2fat/5.jpg", "./images/2fat/6.jpg"]
      }

      const minHeight = 95
      const maxHeight = 220
      const minWeight = 10
      const maxWeight = 300
      const slimThre = 18.5
      const normalThre = 24.9
      const fatThre = 29.9

      const handleHeightChange = event => { //spinner
        setHeight(event.target.value)
      }

      const handleWeightChange = event => { //spinner
        setWeight(event.target.value)
      }

      const handleHeightSliderChange = value => { //range
        setHeight(value)
      }

      const handleWeightSliderChange = value => { //range
        setWeight(value)
      }
      

      //limiting input to numbers
      const handleKeyPress = (source, event) => {
        let allowedChars = ".0123456789"
        let currentChar = event.key
        let found = false
        for (let i = 0;  i < allowedChars.length; i++) {
          if (currentChar === allowedChars[i]) {
            found = true
          }
        }
        if(found === false) {
          event.preventDefault()
          return
        }

      //limiting number input in height/weight
      let currentValue = ""   
            if (source === 'height') {
              currentValue = parseInt(height + currentChar)
              if (currentValue > maxHeight) {
                event.preventDefault()
              } 
            } else {
              currentValue = parseInt(weight + currentChar)
              if (currentValue > maxWeight) {
                event.preventDefault()
              }
            }

            if(currentValue === 0) {
                event.preventDefault()
            }
      }


      //classifying the results w/images, calculating BMI
      const classifyResult = result => {
        if (result < slimThre) {
              return "slim"
        }
        if (result <= normalThre) {
          return "normal"
        }
        if (result <= fatThre) {
          return "fat"
        }
        return "tooFat"
      }

      //height, weight validation and min/max manual input nrs 
      const validate = () => {
        setHeightErr("")
        setWeightErr("")

        let heightErrStr = ""
        let weightErrStr = ""

        //error messageges for H/W
        if(!height) {
          heightErrStr = "Please, enter height"
        } else if(height < minHeight) {
          heightErrStr = "Greater than 95, please"
        } else if(height > maxHeight) {
          heightErrStr = "Less than 220, please"
        }
          
        if(!weight) {
          weightErrStr = "Please, enter weight"
        } else if(weight < minWeight) {
           weightErrStr = "Greater than 10, please"
        } else if(weight > maxWeight) {
           weightErrStr = "Less than 300, please"
        }
      
       if(heightErrStr || weightErrStr) { 
          setHeightErr(heightErrStr)
          setWeightErr(weightErrStr)
          return false 
        }
        return true 
      }

      //calc BMI
      const calcBmi = event => {
        if(!validate()) {
          return 
        }

        let bmi = (weight / (height/100 * height/100)).toFixed(1)
        let chonks = null
        let resultString = ""


        switch (classifyResult(bmi)) {
          case "slim": {
            chonks = AllChonkImg.slimChonk
            resultString = "You're pretty slonky, have a KitKat!"
            break
          }
          case "normal": {
            chonks = AllChonkImg.normalChonk
            resultString = "You're okay...for now."
            break
          }
          case "fat": {
            chonks = AllChonkImg.fatChonk
            resultString = "You're getting kind of fat..."
            break
          }
          case "tooFat": {
            chonks = AllChonkImg.tooFatChonk
            resultString = "You're quite the chonker, there!"
            break
          }
          default:{}
        }

        //getting random images & avoiding duplicates
        let randNum = Math.floor(Math.random() * chonks.length)
        let randChonk = chonks[randNum]


        if(resultChonk === randChonk) {
            calcBmi(event)
            return
        }

        setResultChonk(randChonk)
        setChonkVisibility("visibleChonk")  
        setBmiText(resultString)
        setBmiValue(bmi) 
        setText("invisibleChonk")
      }


      //clear button
      const clear = event => {
        event.preventDefault()
        setHeight("")
        setWeight("")
        setBmiValue("")
        setChonkVisibility("invisibleChonk")
        setHeightErr("") 
        setWeightErr("")
        setText("visibleChonk")
      }

      return ( 
        <div id="container"> 
          <div id="title">
            <h1>Calculate Your Body Mass Index</h1>
          </div>
            <form>
              <div className="unit">
                <p>Height (95cm-220cm)</p>
              </div>
                <input 
                  type="number" 
                  name="height" 
                  step="1" 
                  placeholder="cm"
                  min={minHeight} 
                  max={maxHeight} 
                  value={height}
                  onChange={handleHeightChange}
                  onKeyPress={handleKeyPress.bind(this, 'height')}
                />
               
                <div className="error">{heightErr}</div>
               

               <div className="slider">
                <Slider 
                    min={minHeight} 
                    max={maxHeight} 
                    step={1} 
                    value={height} 
                    onChange={handleHeightSliderChange}
                /> 
               </div>

                <br />
              
                <div className="unit">
                  <p>Weight (10kg-300kg)</p>
                </div>
                  <input 
                    type="number" 
                    name="weight" 
                    step="0.5" 
                    placeholder="kg" 
                    min={minWeight} 
                    max={maxWeight} 
                    value={weight} 
                    onChange={handleWeightChange}
                    onKeyPress={handleKeyPress.bind(this, 'weight')}
                 />

                 <div className="error">{weightErr}</div>

                <div className="slider">
                 <Slider
                    min={minWeight} 
                    max={maxWeight} 
                    step={0.5} 
                    value={weight} 
                    onChange={handleWeightSliderChange}
                  />
                 </div>
               
                <br />
        
                <div id="buttons-container">
                  <button 
                    className="button" 
                    onClick={event => {
                      event.preventDefault()
                      calcBmi()
                    }}
                    >Calculate
                  </button>
                  
                <br />

                  <button 
                    className="button" 
                    onClick={clear}
                    >Clear
                  </button>
                </div>

                <br />

            </form>

            <div className={chonkVisibility}>
              <div id="image">
                <img src={resultChonk} alt="pictures of cats" />
              </div>
              <div id="result-top-text">
                <p>Your current BMI: {bmiValue} </p>
              </div>
              <div id="bmi-text">{bmiText}</div>
            </div>

              <div className={text}>
                <div id="text">
                  Body mass index, abbreviated BMI, is a key index for relating weight to height. 
                  <br />
                  <br />
                  BMI is a person's weight in kilograms (kg) divided by his or her height in meters squared.
                  The National Institutes of Health (NIH) now defines normal weight, overweight, and obesity according to 
                  BMI rather than the traditional height/weight charts.
                  <ul>
                    <li>Overweight is a BMI of 25–29.9</li>
                    <li>Obesity is a BMI of 30 or more</li>
                  </ul>
                  A very muscular person might have a high BMI without health risks.
                </div>
              </div>
        </div> //container
      ) 
    }

   
export default App




     
