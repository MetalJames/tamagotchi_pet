window.onload = function () {

class Tamagotchi{
    constructor(petLocation, mySubmitName){
        this.petLocation = petLocation;
        this.mySubmitName = mySubmitName;
        this.initialFood = 60;
        this.metabolismRate = 1000;

            //* I fetch data directly from data.json without dataSource
            fetch('data.json')
            .then(response => response.json())
            .then(data => {
                this.foodForMyPetList = data.petFood;
                this.moodOfMyPetList = data.petMood;
                this.petCompliment = data.compliments;
                startGame.addEventListener("click", () => {
                    let mustHave = document.getElementById('putNameHere');
                    let errorName = document.getElementById('myPhrases');
                    if (mustHave.innerText == ""){
                        errorName.innerText = "ENTER YOUR PET NAME.";
                        errorName.style.color = "red";
                    } else {
                        this.hatch(mySubmitName);
                        errorName.innerText = "";
                    }
                });
            })
            .catch(err => console.log(err));
    }

    resetFood(){
        this.food=this.initialFood;
    }
    hatch(){
        this.resetFood();
        this.startMetabolism();
    }
    die(){
        clearInterval(this.metabolism);
        console.log("I am dead");
        let myCountToDeath = document.querySelector("#countToDeath");
        myCountToDeath.innerText = `I am dead`;
        littleJimmy.deadRtn();
    }
    //* metabolism function, I left it at 1 because if its 0 pet is already dead
    startMetabolism(){
        this.metabolism = setInterval(()=>{
            this.food -=1;
            console.log(`${this.food} until I starve`);
            let myCountToDeath = document.querySelector("#countToDeath");
            myCountToDeath.innerText = `${this.food} until I starve`;
            if(this.food<=1){
                this.die();
            }
        },this.metabolismRate);
    }

    ifPetDead (){
        clearInterval(this.metabolism);
        littleJimmy.startMetabolism(this.metabolismRate = 1000);
        gsap.to(myDeadLeftOne,{
            opacity: 0
        });
        gsap.to(myDeadLeftTwo, {
            opacity: 0
        });
        gsap.to(myDeadRightOne, {
            opacity: 0
        });
        gsap.to(myDeadRightTwo, {
            opacity: 0
        });

        gsap.to([myMousePath],{
            attr: {
                d:originalMousePath
            }
        });
        gsap.to([myLeftEye],{
            attr: {
                d:originalLeftEye
            },
            opacity: 1
        });
        gsap.to([myRightEye],{
            attr: {
                d:originalRightEye
            },
            opacity: 1
        });

        gsap.to([myLeftEyeBrow],{
            attr: {
                d:originalRightEyeBrow
            }
        });
        
        gsap.to([myRightEyeBrow],{
            attr: {
                d:originalLeftEyeBrow
            }
        });

        gsap.to(myLeftEyeBall, {
            cx: "243.14",
            cy: "574.59",
            rx: "45.15",
            ry: "63.02",
            fill: "#00a651",
            opacity: 1
        });
        gsap.to(myRightEyeBall, {
            cx: "429.85",
            cy: "573.83",
            rx: "45.15",
            ry: "63.02",
            fill: "#00a651",
            opacity: 1
        });

    }

    //*speeding pets metabolism function
    drinkCoffee(){
        clearInterval(this.metabolism);
        let coffee = document.getElementById('myPhrases');
        coffee.innerText ="I'm feeling energetic, I need to do something!!!"
        coffee.style.color = "#d62828";
        this.metabolismRate = 500;
        this.startMetabolism();
    }

    //*slowing pets metabolism function
    drinkWhiskey(){
        clearInterval(this.metabolism);
        let warmMilk = document.getElementById('myPhrases');
        warmMilk.innerText ="Warm milk taste good, but now, I feel like I want to go to bed :)"
        warmMilk.style.color = "#08b106";
        this.metabolismRate = 1500;
        this.startMetabolism();
    }

    //* give food to the pet and chance of poisening function
    poiseningChance (){
        let getRandomFood = this.foodForMyPetList[Math.floor(Math.random() * this.foodForMyPetList.length)];
        console.log(getRandomFood);
        console.log(getRandomFood.foodName)
        console.log(getRandomFood.foodPoints)
        if(getRandomFood.chanceOfFoodPoisoning>=Math.random()){
            this.food -=getRandomFood.foodPoints;
            littleJimmy.sadRtn();
            // return `Im poisened`,
            console.log(`Im poisened, I got -${getRandomFood.foodPoints} of my food points.`);
            let myFoodPoints = document.querySelector("#myPhrases");
            myFoodPoints.innerText = `Im poisened, I got -${getRandomFood.foodPoints} of my food points.`;
            myFoodPoints.style.color = "#d62828";
        }
        else{
            this.food +=getRandomFood.foodPoints;
            littleJimmy.happyRtn();
            // return ` Im feeling good`,
            console.log(`Im feeling good +${getRandomFood.foodPoints} to my food points.`);
            let myFoodPoints = document.querySelector("#myPhrases");
            myFoodPoints.innerText = `Im feeling good, I got +${getRandomFood.foodPoints} to my food points.`;
            myFoodPoints.style.color = "#08b106";
        }
    }

    //*different mood of the pet functions
    angryMood (){
        let getRandomMood = this.moodOfMyPetList[Math.floor(Math.random() * this.moodOfMyPetList.length)];
        if(getRandomMood.choiceMood=="Angry"){
            // console.log(`${sayingMood}`);
            let myAngryMood = document.querySelector("#myPhrases");
            myAngryMood.innerText = `${getRandomMood.sayingMood}`;
            myAngryMood.style.color = "#d62828";
            }
            else{
                this.angryMood();
            }
        }

    sadMood (){
        let getRandomMood = this.moodOfMyPetList[Math.floor(Math.random() * this.moodOfMyPetList.length)];
        if(getRandomMood.choiceMood=="Sad"){
            // console.log(`${sayingMood}`);
            let mySadMood = document.querySelector("#myPhrases");
            mySadMood.innerText = `${getRandomMood.sayingMood}`;
            mySadMood.style.color = "#6b637b";
            }
            else{
                this.sadMood();
            }
        }

    happyMood (){
        let getRandomMood = this.moodOfMyPetList[Math.floor(Math.random() * this.moodOfMyPetList.length)];
        if(getRandomMood.choiceMood=="Happy"){
            // console.log(`${sayingMood}`);
            let myHappyMood = document.querySelector("#myPhrases");
            myHappyMood.innerText = `${getRandomMood.sayingMood}`;
            myHappyMood.style.color = "#ff006d";
            }
            else{
                this.happyMood();
            }
        }

    jokeyMood (){
        let getRandomMood = this.moodOfMyPetList[Math.floor(Math.random() * this.moodOfMyPetList.length)];
        if(getRandomMood.choiceMood=="Jokey"){
            // console.log(`${sayingMood}`);
            let myJokeyMood = document.querySelector("#myPhrases");
            myJokeyMood.innerText = `${getRandomMood.sayingMood}`;
            myJokeyMood.style.color = "#08b106";
            }
            else{
                this.jokeyMood();
            }
        }

    //*pet gives compliment function
    myRandomCompliment (){
        let getRandomCompliment = this.petCompliment[Math.floor(Math.random() * this.petCompliment.length)];
        let SomePet = document.querySelector("#hiddenNameOfThePet").value;
        if(SomePet==""){
            let myCompliment = document.querySelector("#myPhrases");
            myCompliment.innerText = getRandomCompliment;
            myCompliment.style.color = "#08b106";
        } else {
            let SomePet = document.querySelector("#hiddenNameOfThePet").value;
            let myCompliment = document.querySelector("#myPhrases");
            myCompliment.innerText = `${getRandomCompliment.replace("friend", SomePet)}`;
            myCompliment.style.color = "#08b106";
        }
    }

    //*give name to the pet function
    giveTheName() {
        let mySomePet = document.querySelector("#nameOfThePet").value;
        let myNewPetName = document.querySelector("#putNameHere");
        let myHiddenName = document.querySelector("#hiddenNameOfThePet");
        myNewPetName.innerText = `Hello :) my name is ${mySomePet}`;
        myHiddenName.value = mySomePet;
    }

    //*pet is talking function
    petTalkingMouse(){
        gsap.fromTo([myMousePath],{
            attr: {
                d:originalMousePath
            }
        }, {
            attr: {
                d:angryMousePath
            },
            onComplete: function talkingMousefull(){
                gsap.fromTo([myMousePath],{
                    attr: {
                        d:angryMousePath
                    }
                }, {
                    attr: {
                        d:originalMousePath
                    },
                    repeat: 4,
                    yoyo: true
                });
            },
        });
    }

    petTalkingALot(){
        gsap.fromTo([myMousePath],{
            load: littleJimmy.petTalkingMouse(),
        }, {
            delay:3,
            zIndex: 1,
            onComplete: function loadReset() {
                littleJimmy.resetRtn()
            }
        });
    }

    //function for start and stop talking buttons
    petStartTalkingMouseBtn(){
        gsap.to([myMousePath],{
            scaleY: 1.2,
            repeat: 5,
            yoyo: true
        });
    }

    petStopTalkingMouseBtn(){
        gsap.to([myMousePath],{
            scaleY: 1,
            duration: 3,
            onComplete: littleJimmy.resetRtn()
        });
    }

    //reset expression function
    resetRtn(){
        // change clip path and the visual face
        gsap.to([myMousePath],{
            attr: {
                d:originalMousePath
            }
        });
        gsap.to([myLeftEyeBrow],{
            attr: {
                d:originalLeftEyeBrow
            }
        });
        gsap.to([myRightEyeBrow],{
            attr: {
                d:originalRightEyeBrow
            }
        });
        gsap.to([myRightMustageOne],{
            attr: {
                d:originalRightMustageOne
            }
        });
        gsap.to([myRightMustageTwo],{
            attr: {
                d:originalRightMustageTwo
            }
        });
        gsap.to([myLeftMustageOne],{
            attr: {
                d:originalLeftMustageOne
            }
        });
        gsap.to([myLeftMustageTwo],{
            attr: {
                d:originalLeftMustageTwo
            }
        });
        gsap.to([myLeftEye],{
            attr: {
                d:originalLeftEye
            }
        });
        gsap.to([myRightEye],{
            attr: {
                d:originalRightEye
            }
        });
        gsap.to(myLeftEyeBall, {
            cx: "243.14",
            cy: "574.59",
            rx: "45.15",
            ry: "63.02",
            fill: "#00a651"
        });
        gsap.to(myRightEyeBall, {
            cx: "429.85",
            cy: "573.83",
            rx: "45.15",
            ry: "63.02",
            fill: "#00a651"
        });
    }

    //happy expression function
    happyRtn(){
        // change clip path and the visual face
        gsap.to([myMousePath],{
            attr: {
                d:happyMousePath
            }
        });
        gsap.to([myLeftEyeBrow],{
            attr: {
                d:happyLeftEyeBrow
            }
        });
        gsap.to([myRightEyeBrow],{
            attr: {
                d:happyRightEyeBrow
            }
        });
        gsap.to([myRightMustageOne],{
            attr: {
                d:happyRightMustageOne
            }
        });
        gsap.to([myRightMustageTwo],{
            attr: {
                d:happyRightMustageTwo
            }
        });
        gsap.to([myLeftMustageOne],{
            attr: {
                d:happyLeftMustageOne
            }
        });
        gsap.to([myLeftMustageTwo],{
            attr: {
                d:happyLeftMustageTwo
            }
        });
        gsap.to([myLeftEye],{
            attr: {
                d:happyLeftEye
            }
        });
        gsap.to([myRightEye],{
            attr: {
                d:happyRightEye
            }
        });
        gsap.to(myLeftEyeBall, {
            cx: "245.14",
            cy: "574.59",
            rx: "45.15",
            ry: "63.02",
            fill: "#00a651"
        });
        gsap.to(myRightEyeBall, {
            cx: "427.85", 
            cy: "573.83",
            rx: "45.15",
            ry: "63.02",
            fill: "#00a651"
        });
    }

    // sad expression function
    sadRtn(){
        // change clip path and the visual face
        gsap.to([myMousePath],{
            attr: {
                d:sadMousePath
            }
        });
        gsap.to([myLeftEyeBrow],{
            attr: {
                d:sadLeftEyeBrow
            }
        });
        gsap.to([myRightEyeBrow],{
            attr: {
                d:sadRightEyeBrow
            }
        });
        gsap.to([myRightMustageOne],{
            attr: {
                d:sadRightMustageOne
            }
        });
        gsap.to([myRightMustageTwo],{
            attr: {
                d:sadRightMustageTwo
            }
        });
        gsap.to([myLeftMustageOne],{
            attr: {
                d:sadLeftMustageOne
            }
        });
        gsap.to([myLeftMustageTwo],{
            attr: {
                d:sadLeftMustageTwo
            }
        });
        gsap.to([myLeftEye],{
            attr: {
                d:sadLeftEye
            }
        });
        gsap.to([myRightEye],{
            attr: {
                d:sadRightEye
            }
        });
        gsap.to(myLeftEyeBall, {
            cx: "248.13",
            cy: "587.19",
            rx: "45.15",
            ry: "63.02",
            fill: "#1ba2b1"
        });
        gsap.to(myRightEyeBall, {
            cx: "417.2",
            cy: "587.74",
            rx: "45.15",
            ry: "63.02",
            fill: "#1ba2b1"
        });
    }

    //angry expression function
    angryRtn(){
        // change clip path and the visual face
        gsap.to([myMousePath],{
            attr: {
                d:angryMousePath
            }
        });
        gsap.to([myLeftEyeBrow],{
            attr: {
                d:angryLeftEyeBrow
            }
        });
        gsap.to([myRightEyeBrow],{
            attr: {
                d:angryRightEyeBrow
            }
        });
        gsap.to([myRightMustageOne],{
            attr: {
                d:angryRightMustageOne
            }
        });
        gsap.to([myRightMustageTwo],{
            attr: {
                d:angryRightMustageTwo
            }
        });
        gsap.to([myLeftMustageOne],{
            attr: {
                d:angryLeftMustageOne
            }
        });
        gsap.to([myLeftMustageTwo],{
            attr: {
                d:angryLeftMustageTwo
            }
        });
        gsap.to([myLeftEye],{
            attr: {
                d:angryLeftEye
            }
        });
        gsap.to([myRightEye],{
            attr: {
                d:angryRightEye
            }
        });
        gsap.to(myLeftEyeBall,{
            cx: "272.99",
            cy: "610.53",
            rx: "45.15",
            ry: "43.45",
            fill: "#ff0000"
        });
        gsap.to(myRightEyeBall,{
            cx: "413.34",
            cy: "609.73",
            rx: "45.15",
            ry: "43.06",
            fill: "#ff0000"
        })
    }

    //*pet is dead
    deadRtn(){
        // littleJimmy.resetRtn();
        gsap.to([myMousePath],{
            attr: {
                d:deadMousePath
            }
        });
        gsap.to([myLeftEye],{
                opacity: 0

        });
        gsap.to([myRightEye],{
                opacity: 0

        });
        gsap.to(myLeftEyeBall, {
            cx: "243.14",
            cy: "574.59",
            rx: "45.15",
            ry: "63.02",
            fill: "#00a651",
            opacity: 0
        });
        gsap.to(myRightEyeBall, {
            cx: "429.85",
            cy: "573.83",
            rx: "45.15",
            ry: "63.02",
            fill: "#00a651",
            opacity: 0
        });
        gsap.to(myDeadLeftOne,{
            opacity: 1
        });
        gsap.to(myDeadLeftTwo, {
            opacity: 1
        });
        gsap.to(myDeadRightOne, {
            opacity: 1
        });
        gsap.to(myDeadRightTwo, {
            opacity: 1
        });
        
    }
}

let startGame = document.querySelector("#startBtn");

let resetGame = document.querySelector("#resetBtn");
resetGame.addEventListener("click", resetMyGame);

function resetMyGame() {
    // let noNameYet = document.querySelector("#putNameHere");
    let noComplimentYet = document.querySelector("#myPhrases");
    let noFoodPointsYet = document.querySelector("#myPhrases");
    let noMoodYet = document.querySelector("#myPhrases");
    littleJimmy.resetFood();
    littleJimmy.ifPetDead();
    // noNameYet.innerText = "";
    noComplimentYet.innerText = "";
    noFoodPointsYet.innerText = "";
    noMoodYet.innerText = "";
}

let myGameActions = document.querySelector("#gameActions");

let mySubmitName = document.querySelector("#submitBtn");
mySubmitName.addEventListener("click", thisIsNewName);

function thisIsNewName() {
    littleJimmy.giveTheName();
    let clearNameField = document.querySelector("#nameOfThePet");
    clearNameField.value = "";
}

//*mood of the pet

function randomAngry() {
    littleJimmy.angryMood();
    littleJimmy.angryRtn();
    littleJimmy.petTalkingALot();
}

function randomHappy() {
    littleJimmy.happyMood();
    littleJimmy.happyRtn();
    littleJimmy.petTalkingALot();
}

function randomSad() {
    littleJimmy.sadMood();
    littleJimmy.sadRtn();
    littleJimmy.petTalkingALot();
}

function randomJokey() {
    littleJimmy.jokeyMood();
    littleJimmy.happyRtn();
    littleJimmy.petTalkingALot();
}

function startTalkingPet() {
    littleJimmy.petStartTalkingMouseBtn();
}

function stopTalkingPet() {
    littleJimmy.petStopTalkingMouseBtn();
}

function randomFoodBtn() {
    littleJimmy.poiseningChance();
    littleJimmy.petTalkingALot();
}

function complimentBtn() {
    littleJimmy.myRandomCompliment()
    littleJimmy.happyRtn();
    littleJimmy.petTalkingALot();
}

//*lets create our pet
let littleJimmy = new Tamagotchi(document.querySelector("#obj"), "data.json", mySubmitName.value);
myGameActions.value = "";

    let myObj = document.getElementById('obj').contentDocument;

    //reference the clip path
    let myMousePath = myObj.getElementById('mouse');
    let myLeftEyeBrow = myObj.getElementById('leftEyeBrow');
    let myRightEyeBrow = myObj.getElementById('rightEyeBrow');
    let myRightMustageOne = myObj.getElementById('rightMustageOne');
    let myRightMustageTwo = myObj.getElementById('rightMustageTwo');
    let myLeftMustageOne = myObj.getElementById('leftMustageOne');
    let myLeftMustageTwo = myObj.getElementById('leftMustageTwo');
    let myLeftEye = myObj.getElementById('leftEyeTwo');
    let myRightEye = myObj.getElementById('rightEyeTwo');
    let myLeftEyeBall = myObj.getElementById('leftEye');
    let myRightEyeBall = myObj.getElementById('rightEye');
    let myDeadLeftOne = myObj.getElementById('leftOne');
    let myDeadLeftTwo = myObj.getElementById('leftTwo');
    let myDeadRightOne = myObj.getElementById('rightOne');
    let myDeadRightTwo = myObj.getElementById('rightTwo');
        gsap.set(myDeadLeftOne, {
            opacity: 0
        })
        gsap.set(myDeadLeftTwo, {
            opacity: 0
        })
        gsap.set(myDeadRightOne, {
            opacity: 0
        })
        gsap.set(myDeadRightTwo, {
            opacity: 0
        })

    //reference the visual mouth
    //store the original path also call neutral
    let originalMousePath = "M544.38,794.46c2.87,1.09-.39,6.82-7,11.3-17.81,12.16-19.47,19.42-31.52,23.66-13.53,4.75-.66,3.26-26.07,4.88-8.14.66-29.94-4.21-45.57-25.45,0,0-16.55-8.62-11.09-14.39,4.15-4.37,13,12.59,24.56,12.65,16.85,2,30.16-1.45,35.66-12.46s.61-27.5,5.82-26.2-2.61,19.49,3.86,26.58,17.11,11.16,17.11,11.16C541.63,809.54,538.08,792.07,544.38,794.46Z";
    let originalLeftEyeBrow = "M351.52,453.92c14.36-37.86,30.34-59.62,51.6-28.78";
    let originalRightEyeBrow = "M607.55,442c33.77-34.58,50.28-8.66,61.53,35.72";
    let originalRightMustageOne = "M642.29,787.35c34.94,16.37,62,34.08,84.35,52.6";
    let originalRightMustageTwo = "M651.22,758.58c35.68,5.62,70.61,28.94,105.19,60.53";
    let originalLeftMustageOne = "M355.49,784.38c-33.51,21.09-61.73,48.07-83.36,82.36";
    let originalLeftMustageTwo = "M353.5,754.61c-49.95,24.52-95.14,51-135.95,79.39";
    let originalLeftEye = "M463.66,703c9-74,5.29-138.3-15.88-189.54-11.87-20.27-29-30-49.62-32.75-20.77,7.46-37,30.83-51.6,59.54-16.78,47-21.94,106.89-21.83,172.68Z";
    let originalRightEye = "M528.91,700.39l134.22,16.94c2.91-78.59-3.35-176.19-20.84-200.89-13-25.86-26.07-36.28-51.61-39.7-29.15.12-44.88,25.95-56.56,59.54C518.48,594.84,526.3,644.36,528.91,700.39Z";


    //new path for the mouth and ect happy
    let happyMousePath = "M560.64,762.2c2.88,1.09-16.65,42-23.21,46.52-17.81,12.16-19.47,19.43-31.52,23.66-13.53,4.75-.66,3.26-26.07,4.89-8.14.65-29.94-4.22-45.57-25.46,0,0-44.6-43-39.13-48.75,4.14-4.37,41.07,47,52.6,47,16.85,2,30.16-1.45,35.66-12.45s.61-27.51,5.82-26.21-2.61,19.49,3.86,26.58,17.11,11.16,17.11,11.16C541.63,812.51,554.34,759.81,560.64,762.2Z";
    let happyLeftEyeBrow = "M305.75,553.78c20.37-55.25,90.33-30.85,142.68-62.54";
    let happyRightEyeBrow = "M538.49,487.66c40.39,33.88,113.37,7.82,142,65.16";
    let happyRightMustageOne = "M626,780.7c40.55-15.85,66.15-34.48,83-54.63";
    let happyRightMustageTwo = "M621.35,751c35.07-11.71,63.79-42.39,90.64-80.71";
    let happyLeftMustageOne = "M363.61,781.33c-27.25-3.86-53.78-25.56-81.85-48.67";
    let happyLeftMustageTwo = "M373.89,750.12c-45.47-15.71-63.16-25.8-96.1-62.36";
    let happyLeftEye = "M463.66,700.39c9-54.62,5.29-102.16-15.88-140-11.87-15-29-22.15-49.62-24.19-20.77,5.51-37,22.78-51.6,44-16.78,34.69-17.14,55.25-17,103.85Z";
    let happyRightEye = "M532,702.68l125.1-23.45c6.52-56-14.4-100.24-24.76-117.29-18.31-14.48-22.15-23.45-42.41-23.21-29.15.08-44.88,17.83-56.57,40.91C514.26,617.73,521,664.05,532,702.68Z";


    //new path for the mouth and ect sad
    let sadMousePath = "M544.57,840.39c2.87,1.09-16.47-6.95-21.68-15.21-6.6-10.45-6.08-8.25-17.81-7.38-14.3,1.06-12-2.63-39.5.77-10.89-3.81-11.32,5.31-15.67,9.22,0,0-26.69,22.27-21.23,16.51,4.15-4.38,15.84-38.72,27.37-38.67,16.85,2,24.28-.63,29.78-11.63s.61-27.51,5.83-26.2-2.62,19.49,3.85,26.58,17.12,11.16,17.12,11.16C544.07,808.89,538.27,838,544.57,840.39Z";
    let sadLeftEyeBrow = "M407.89,468.68c-15.23,37.52-67.42,86.18-93.93,86.83";
    let sadRightEyeBrow = "M653.21,539.84c-77-31.58-71.92-56.2-80.24-81.55";
    let sadRightMustageOne = "M642.29,787.35c34.94,16.37,44.76,53.47,29.12,85.4";
    let sadRightMustageTwo = "M651.22,758.58c35.68,5.62,74.92,55.53,61.24,114.17";
    let sadLeftMustageOne = "M355.49,784.38c-33.51,21.09-33.33,59-16.39,102";
    let sadLeftMustageTwo = "M353.5,754.61c-49.95,24.52-71.74,88.82-55.45,143.55";
    let sadLeftEye = "M459,694.87c9-64.86,7.43-104.24-13.74-149.17-11.87-17.78-29-26.3-49.62-28.72-20.77,6.54-36.95,27-51.6,52.22-16.77,41.19-21.94,93.73-21.83,151.42Z";
    let sadRightEye = "M526.76,696.81l130.86,22.82c-9.92-68.64-17.56-141.17-27.91-162.9-16.38-25.86-23.46-36.49-41.55-43-29.15.1-44.89,22.72-56.57,52.13C512.51,614.38,515.74,647.58,526.76,696.81Z"; 
    

    //new path for the mouth and ect angry
    let angryMousePath = "M543.7,799.12c2.87,1.09-.39,6.81-7,11.29-17.81,12.17-8.44,24.73-22.59,14.77-11.73-8.25-24.17-4.71-51.69-1.3-17.38,18.24-13.25,10.86-28.88-10.38,0,0-16.55-8.62-11.09-14.38,4.15-4.37,13,12.59,24.56,12.65,16.85,2,30.16-1.46,35.66-12.46s.61-27.51,5.82-26.2-2.61,19.49,3.86,26.57,17.11,11.17,17.11,11.17C541,814.2,537.4,796.73,543.7,799.12Z";
    let angryLeftEyeBrow = "M493,576.43c-49.38-4.71-61.55-86.6-104-98";
    let angryRightEyeBrow = "M602.39,478.87c-43.1,16-49.73,93.54-97.56,97.64";
    let angryRightMustageOne = "M622.88,792.62c42.67-8.45,79.82-10,113.71-7.57";
    let angryRightMustageTwo = "M619.4,766.4c28.89-21.68,70-30.5,116.7-33.31";
    let angryLeftMustageOne = "M380.19,801.43c-38.93-7.25-78-6.57-117.12,4";
    let angryLeftMustageTwo = "M377.56,764c-54.14-12.88-105.87-21.19-155.39-25.31";
    let angryLeftEye = "M485.06,702.68c-3.26-55.38-9.05-98.9-30.22-136.75-11.87-15-29-22.15-49.62-24.19-20.77,5.51-37,22.78-51.6,44-16.77,34.69-10.95,72.13-10.84,120.73Z";
    let angryRightEye = "M522.2,702.68l134.55-1c6.51-56-12.65-120.94-23-138-18.31-14.49-22.15-23.46-42.41-23.21-29.15.08-44.88,17.83-56.57,40.91C524.8,623.19,520.24,664.89,522.2,702.68Z";

    //new path for the mouth and ect dead
    let deadMousePath = "M544.38,794.46c2.87,1.09-.39,6.82-7,11.3-17.81,12.16-12.54,1.59-25.22,3.13-7.17.87-2,.33-27.37,2-5-9.11-28.15-1.66-50.57-2,0,0-16.55-8.62-11.09-14.39,4.15-4.37,13,12.59,24.56,12.65,16.85,2,30.16-1.45,35.66-12.46s.61-27.5,5.82-26.2-2.61,19.49,3.86,26.58,17.11,11.16,17.11,11.16C541.63,809.54,538.08,792.07,544.38,794.46Z";

    // reference the svg
    let myB0 = document.getElementById('btn0').contentDocument;
    let myB1 = document.getElementById('btn1').contentDocument;
    let myB2 = document.getElementById('btn2').contentDocument;
    let myB3 = document.getElementById('btn3').contentDocument;
    let myHappyBtn = document.getElementById('happyBtn').contentDocument;
    let mySadBtn = document.getElementById('sadBtn').contentDocument;
    let myAngryBtn = document.getElementById('angryBtn').contentDocument;
    let myJokeyBtn = document.getElementById('jokeyBtn').contentDocument;
    let myCoffee = document.getElementById('speedingMetabolismBtn').contentDocument;
    let myWarmMilk = document.getElementById('slowingMetabolismBtn').contentDocument;
    let myRandomFoodBtn = document.getElementById('randomFoodBtn').contentDocument;
    let myComplimentBtn = document.getElementById('complimentBtn').contentDocument;
    let myStartTalkingBtn = document.getElementById('startTalkingBtn').contentDocument;
    let myStopTalkingBtn = document.getElementById('stopTalkingBtn').contentDocument;

    // reference specific layer within a button
    let b0 = myB0.getElementById('neutral');
    let b1 = myB1.getElementById('happy');
    let b2 = myB2.getElementById('sad');
    let b3 = myB3.getElementById('angry');
    let bHappy = myHappyBtn.getElementById('happyOne');
    let bSad = mySadBtn.getElementById('sadOne');
    let bAngry = myAngryBtn.getElementById('angryOne');
    let bJokey = myJokeyBtn.getElementById('jokeyOne');
    let bCoffee = myCoffee.getElementById('coffee');
    let bWarmMilk = myWarmMilk.getElementById('warmMilk');
    let bFeed = myRandomFoodBtn.getElementById('feed');
    let bCompliment = myComplimentBtn.getElementById('compliment');
    let bStart = myStartTalkingBtn.getElementById('start');
    let bStop = myStopTalkingBtn.getElementById('stop');

    // array to store the above
    let buttonsArray = [b0, b1, b2, b3];
    let buttonsOneArray = [bHappy, bSad, bAngry, bJokey];
    let buttonsTwoArray = [bCoffee, bWarmMilk];
    let buttonsThreeArray = [bFeed, bCompliment, bStart, bStop];

    // reveal specific layer for each button
    gsap.set(buttonsArray, {
        autoAlpha: 1
    });

    gsap.set(buttonsOneArray, {
        autoAlpha: 1
    });

    gsap.set(buttonsTwoArray, {
        autoAlpha: 1
    });

    gsap.set(buttonsThreeArray, {
        autoAlpha: 1
    });

    // reference the buttons using bStyle for hovering
    let hoverButtons = document.getElementsByClassName('bStyle');
    gsap.utils.toArray(hoverButtons).forEach((btn) => {
        // hovering effect
        let hovering = gsap.to(btn, {
            transformOrigin: "center center",
            scale: 1.2,
            paused: true
        });
        // attach mouse enter
        btn.addEventListener('mouseenter', ()=>{
            hovering.play();
        });
        // attach mouse leave
        btn.addEventListener('mouseleave', ()=>{
            hovering.reverse();
        });
    });

        // buttons for the faces set up
        myB0.addEventListener('click', ()=>{
            littleJimmy.resetRtn();
        });
    
        myB1.addEventListener('click', ()=>{
            littleJimmy.happyRtn();
        });
    
        myB2.addEventListener('click', ()=>{
            littleJimmy.sadRtn();
        });
    
        myB3.addEventListener('click', ()=>{
            littleJimmy.angryRtn();
        });

        myJokeyBtn.addEventListener('click', ()=>{
                randomJokey();
        });

        mySadBtn.addEventListener('click', ()=>{
                randomSad();
        });

        myHappyBtn.addEventListener('click', ()=>{
                randomHappy();
        });

        myAngryBtn.addEventListener('click', ()=>{
                randomAngry();
        });
    
        myRandomFoodBtn.addEventListener('click', ()=>{
            randomFoodBtn();
        });

        myComplimentBtn.addEventListener('click', ()=>{
            complimentBtn();
        });

        myStartTalkingBtn.addEventListener('click', ()=>{
            startTalkingPet();
        });

        myStopTalkingBtn.addEventListener('click', ()=>{
            stopTalkingPet();
        });

        myCoffee.addEventListener('click', ()=>{
            littleJimmy.drinkCoffee();
        });

        myWarmMilk.addEventListener('click', ()=>{
            littleJimmy.drinkWhiskey();
        });
}