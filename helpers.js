function wordMaker()
{
    if (smallLettersBool === 'true') {letterSet = customConcat(letterSet, smallLetterList)};
    if (capitalsBool === 'true') {letterSet = customConcat(letterSet,capitalsList);}
    if (punctuationBool === 'true') {letterSet = customConcat(letterSet,punctuationList);}
    if (numbersBool === 'true') {letterSet = customConcat(letterSet,numbersList);}
    if (symbolsBool === 'true') {letterSet = customConcat(letterSet,symbolsList);}
    if (extraSymbolsBool === 'true') {letterSet = customConcat(letterSet,extraSymbolsList);}
    if (customText && customText.length !== 0) {letterSet = customConcat(letterSet, customText);}
    console.log("this is your letterset from helpers.js: " + letterSet);
    //check if letterset is not empty
    if (letterSet.length === 0)//so if it is empty at the start, fill it with small letters
    {
        console.log("letterSet was empty so we put the small letters in")
        letterSet = letterSet.concat(smallLetterList);
    }
    for (var l = 0; l < 90; l++)
    {
        nextLetter = getRandomItem(letterSet);
        word += nextLetter;
    }
    if (word.length > 90)
    {
        word = word.substring(word.length - 90); // Take the last 90 characters
    }
}

function customConcat(arr1, arr2) {
    // Create a new array to store the concatenated elements
    var concatenatedArray = [];

    // Copy elements from the first array (arr1) to the concatenatedArray
    for (var i = 0; i < arr1.length; i++) {
        concatenatedArray.push(arr1[i]);
    }

    // Copy elements from the second array (arr2) to the concatenatedArray
    for (var j = 0; j < arr2.length; j++) {
        concatenatedArray.push(arr2[j]);
    }

    // Return the concatenatedArray
    return concatenatedArray;
}

function firstRowWhite()
{
    if (firstRow)
    {
        for (let i = 0; i < 31; i++) {
            let element = document.getElementById(i.toString()); // Get the element with the specified ID
            if (element) {
                element.style.color = 'white'; // Set the font color to white
            }
        }
    }
    else
    {
    for (let i = 0; i < 31; i++)
        {
            let element = document.getElementById(i.toString()); // Get the element with the specified ID
            if (element)
            {
                element.style.color = 'black'; // Set the font color to white
            }
        }
    }
}

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}


function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function updateLetterInfo(){
if (tracker > 0) {
    // Check if the typed letter exists in the dictionary
    if (letterInfo.hasOwnProperty(typedLetter)) {
        // If the letter already exists, update its values
        letterInfo[typedLetter].frequency += 1;
        letterInfo[typedLetter].averageTime = (letterInfo[typedLetter].averageTime + elapsedTime) / 2; // Update average time
    } else {
        // If the letter does not exist and it's not the first letter, create a new key-value pair
        letterInfo[typedLetter] = { frequency: 1, averageTime: elapsedTime };
    }
}

}



