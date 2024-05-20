//fix that the first letter is not added to the dict
//KPM goes to NaN

var letterInfo = {};
var word = '';
var time1 = null;
var time2 = null;
var firstLetter = true;
var firstRow = true;
var lastTenStrokes = [];
var AvgKPM = 0;
var marginTopValue = 50; // this is the start and current margin top value
var marginLimit  = 0; // so the text creeps up untill it has reached a top margin of 0, so it's all up
var marginTopValueJumpValue = 60; //how much it jumps when you've reached the end of the line
var smallLettersBool = localStorage.getItem('smallLetters');
var capitalsBool = localStorage.getItem('capitals');
var punctuationBool = localStorage.getItem('punctuation');
var numbersBool = localStorage.getItem('numbers');
var symbolsBool = localStorage.getItem('symbols');
var customText = localStorage.getItem('customText');
var extraSymbolsBool = localStorage.getItem('extrasymbols');
var change = localStorage.getItem('change');
var typedLetter = '';
var change = false;
var probabilityList = [];

smallLetterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
capitalsList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
punctuationList = ['!', '.', '/', ':', ';', '?'];
numbersList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
symbolsList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+'];
extraSymbolsList = ['[', ']', '{', '}', ';', ':', "'", '"', ',', '.', '<', '>', '/', '?', '\\', '|'];

letterSet = [];
if (smallLettersBool === true) {letterSet = letterSet.concat(smallLetterList);}
if (capitalsBool === true) {letterSet = letterSet.concat(capitalsList);}
if (punctuationBool === true) {letterSet = letterSet.concat(punctuationList);}
if (numbersBool === true) {letterSet = letterSet.concat(numbersList);}
if (symbolsBool === true) {letterSet = letterSet.concat(symbolsList);}
if (extraSymbolsBool === true) {letterSet = letterSet.concat(extraSymbolsList);}

document.addEventListener('DOMContentLoaded', function() {
    // Check if the settings have been updated

    var change = localStorage.getItem('change');
    if (change === 'true')
    {
        console.log("change is: " + change);
        change = 'false';
        localStorage.setItem('change', 'false');
        // location.reload();
        console.log("change is: " + change)
    }

});


wordMaker();



var cellDictionary = [];
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('letterTable').style.marginTop = `${marginTopValue}px`;

    for (var k = 0; k < word.length; k++) {
        var cell = { id: k + 1, letter: word[k], color: 'black', bgColor: 'white'};
        cellDictionary.push(cell);
    }


    for (var i = 0; i < word.length; i++)
    {
        var letter = cellDictionary[i].letter;
        var color = cellDictionary[i].color;
        var backgroundColor = cellDictionary[i].bgColor;
        document.getElementById(`${i + 1}`).textContent = letter;
        document.getElementById(`${i + 1}`).style.color = color;
        document.getElementById(`${i + 1}`).style.backgroundColor = backgroundColor;
    }
    if (firstRow)
        {
            for (var l = 0; l < 30; l++)
            {
                document.getElementById(`${l + 1}`).style.color = 'white';
            }
        }




    var tracker = 30;
    document.addEventListener('keydown', function(event) {


        console.log(letterInfo)
        customText = localStorage.getItem('customText');
        console.log("this is the customtext" + customText)
        // Ignore events triggered by the Shift key





        document.getElementById('letterTable').style.marginTop = `${marginTopValue}px`;

        // check time
        time1 = Date.now();
        if (time1 != 'null' && time2 != 'null' && !(event.shiftKey))
        {
            var elapsedTime = time1 - time2;
        }
        time2 = time1;
        KPM = Math.floor(60000/elapsedTime);
        lastTenStrokes.push(elapsedTime);
        if (lastTenStrokes.length > 10) {
            lastTenStrokes.shift(); // Remove the oldest keystroke
        }
        var sum = 0;
        if (lastTenStrokes.length > 0)
        {
            for (var q = 0; q < lastTenStrokes.length; q++)
            {
                sum += lastTenStrokes[q];
            }
        }
        var avgsum = sum / lastTenStrokes.length;
        AvgKPM = Math.floor(60000 / avgsum);


        if (event.shiftKey && event.key.length === 1)
        {
            // Handle the scenario when only the Shift key is pressed
            typedLetter = event.key;
            console.log("this is the key pressed from within the key.lenggth=1" + typedLetter);
        }
        else if (event.shiftKey) { return; }
        else
        {
            (typedLetter = event.key);
        }

        //scroll screen
        if (marginTopValue > marginLimit)
            {
                marginTopValue -= 4;
            }
        //check letters and update backgroundcolor


        if (typedLetter === "Backspace")
        {
            ///backspace logic
            cellDictionary[tracker-1].bgColor = 'white';
            tracker -= 1;
        }
        else
        {
            if (cellDictionary[tracker].letter === typedLetter)
            {
                cellDictionary[tracker].bgColor = 'lightgreen';

                //update lettertimes (after a letter has been typed)
                if (firstLetter === false)
                {
                    if (letterInfo.hasOwnProperty(typedLetter))
                    {
                        // If the letter already exists, update its values
                        letterInfo[typedLetter].frequency += 1;

                        var newAvg = ((letterInfo[typedLetter].averageTime * letterInfo[typedLetter].frequency + elapsedTime) / (letterInfo[typedLetter].frequency + 1));
                        newAvg = Math.floor(newAvg);
                        if (isNumber(newAvg))
                        {
                            letterInfo[typedLetter].averageTime = newAvg;
                        }
                    } else
                    {
                        // If the letter does not exist, create a new key-value pair
                        letterInfo[typedLetter] = { frequency: 1, averageTime: elapsedTime };
                    }

                }
            tracker++;
            firstLetter = false;
            }
            else
            {
                cellDictionary[tracker].bgColor = 'red';
                tracker++;
            }



        }

        if (tracker > 59)
        {


            firstRow = false;
            // moveLines(); this was the movelines functions, but I put it back in here
                //empty letterset
                letterset = [];
                //update letterset
                if (smallLettersBool === 'true') {letterSet = customConcat(letterSet, smallLetterList)};
                if (capitalsBool === 'true') {letterSet = customConcat(letterSet,capitalsList);}
                if (punctuationBool === 'true') {letterSet = customConcat(letterSet,punctuationList);}
                if (numbersBool === 'true') {letterSet = customConcat(letterSet,numbersList);}
                if (symbolsBool === 'true') {letterSet = customConcat(letterSet,symbolsList);}
                if (extraSymbolsBool === 'true') {letterSet = customConcat(letterSet,extraSymbolsList);}
                console.log("this is your letterset from within Helpers: " + letterSet);
                console.log("this is your letterinfo printer from moveLines for item 1" + letterInfo)

                if (letterInfo && Object.keys(letterInfo).length > 0) {
                    // Calculate the average elapsed time for all letters in letterInfo
                    var sumAvg = 0;
                    for (var key of Object.keys(letterInfo)) {
                        sumAvg += letterInfo[key].averageTime;
                    }
                var averageElapsedTime = sumAvg / Object.keys(letterInfo).length;

                // Create the probability list based on the criteria
                var probabilityList = '';

                for (var letter of letterSet) {
                    if (letterInfo[letter] && letterInfo[letter].frequency > 1) {
                        // If the letter has been typed more than once, use its average time
                        for (var j = 0; j < letterInfo[letter].averageTime; j++) {
                            probabilityList += letter;
                        }
                    } else {
                        // If the letter has been typed once or less, use the average time of all characters
                        for (var j = 0; j < averageElapsedTime; j++) {
                            probabilityList += letter;
                        }
                    }
                }

                    console.log("probabilitylist = ");
                    console.log(probabilityList);
                }
                // calculate the average time of all the letters in the letterinfo list





                for (var l = 0; l < 30; l++)
                {
                    // Add 30 new letters to the end of the word
                    if (probabilityList.length > 100)
                    {
                        nextLetter = getRandomItem(probabilityList);
                        word += nextLetter;
                        console.log("letter taken from probabilitylist")
                    }
                    else
                    {
                        nextLetter = getRandomItem(letterSet);
                        word+= nextLetter;
                        console.log("letter taken from letterSet")
                    }

                }
                cellDictionary[2].color = 'cellDictionary[32].color';
                if (word.length > 90)
                {
                    word = word.substring(word.length - 90); // Take the last 90 characters
                }//now the characters have moved, we have a new word

                for (var p = 0; p < 30; p++)
                    {
                        cellDictionary[p].bgColor = cellDictionary[p+30].bgColor;
                    }
                for (var p = 30; p < 60; p++)
                    {
                        cellDictionary[p].bgColor = 'white';
                    }









            tracker = 30;

            marginTopValue = marginTopValueJumpValue; // Set the desired margin-top value here
            document.getElementById('letterTable').style.marginTop = `${marginTopValue}px`;
        }


        for (var m = 0; m < 90; m++)
        {//letters of new word into dict
            cellDictionary[m].letter = word[m]
        }

        for (var n = 0; n < word.length; n++)
        {//update the info on the screen after a letter is typed
            document.getElementById(`${n + 1}`).textContent = cellDictionary[n].letter;
            document.getElementById(`${n + 1}`).style.color = cellDictionary[n].color;
            document.getElementById(`${n + 1}`).style.backgroundColor = cellDictionary[n].bgColor;
        }
        var accuracy = 0;
        var mistakes = 0
        var success = 0
        for (var r = 0; r < cellDictionary.length; r++)
        {
            if (cellDictionary[r].bgColor === 'red')
            {
                mistakes += 1;
            }
            if (cellDictionary[r].bgColor === 'lightgreen')
            {
                success += 1;
            }
        }
        if (success + mistakes !== 0) {
            accuracy = (success - mistakes) / (success + mistakes);
            accuracy = accuracy * 100;
            accuracy = Math.round(accuracy);
            if (isNumber(accuracy)) {
                document.getElementById('accuracy').textContent = ("Accuracy:" + accuracy + "%");
            }
        }
        firstRowWhite();
        document.getElementById('KPM').textContent = ("Last KPM:" + KPM);
        document.getElementById('AvgKPM').textContent = ("Avg10 KPM:" + AvgKPM);
        var WPM = AvgKPM / 5;
        document.getElementById('WPM').textContent = ("WPM:" + WPM);
    });
});

