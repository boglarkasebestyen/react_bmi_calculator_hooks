## BMI Calculator with React Hooks

### Functional component-based React app to calculate the body mass index of a person 

Body Mass Index (BMI) is a person’s weight in kilograms divided by the square of height in meters. A high BMI can be an indicator of high body fatness. BMI can be used to screen for weight categories that may lead to health problems but it is not diagnostic of the body fatness or health of an individual.

![](https://media.giphy.com/media/GXBoSgBHRlShbc1yR4/giphy.gif)

## How it works
* The entered height should be limited to values between 95cm - 220cm.
* The entered weight should be limited to values between 10kg - 300kg.
* There is no option to change the unit of measure.

### Guideline 
* The user can add the height & weight by either using the slider or simply adding the numbers manually.
* **If the user doesn't fill only one or any of the fields**, the app will not perform the calculation and it will prompt the user to fill out the fields.
* **The possibility to enter a value above the given maximum is disabled**. 
* **The user can enter a value below the given minimum value**, however it will not calculate the BMI and it will prompt the user, through an error message, to change the value.
* **When the fields are filled out correctly**, the app calculates the user's BMI accompanied by an image of a (underweight, normal, overweight, or obese) cat and a message that lets the user know if their BMI is optimal or not.  
* **By clicking Clear**, the calculation is reset.


### Features
* Responsive scaling when the window is resized
* Range slider component source: https://whoisandy.github.io/react-rangeslider/


## Live demo
View a live demo of the project [here via Netlify](https://sb-bmi.netlify.app).

## Additional info

A **class component-based version** of this project can be viewed [here](https://github.com/boglarkasebestyen/react_bmi_calculator_class).

This project was created with Create React App.
Please, see the full create-react-app guide [here](https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/README.md).






