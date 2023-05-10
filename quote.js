import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

const fileName = 'quotes.json';
const quotes = [];

// Ticket 2b - ADD/SAVE ---------------------------------------------------
export async function addQuote(quoteText) {
	// generate random quote with unique id
	const quote = { id: uuidv4(), quoteText: quoteText };
    const read = await fs.readFile(fileName, 'utf-8')
	const data = JSON.parse(read);
    // Add quote to end of aray
	const newQuotes = [...data, quote];
    // Stringify into JSON
	const quotesJSON = JSON.stringify(newQuotes);
	// write quotes data
	await fs.writeFile(fileName, quotesJSON, 'utf-8');
	return quote;
}
// TEST add
await addQuote('Five four three two one');
// await addQuote('Testing 1');
// await addQuote('Testing 2');
// await addQuote('Testing 3');


// Ticket 2c - GET ALL ----------------------------------------------------
export async function getQuotes() {
	// read and return all quotes
	return JSON.parse(await fs.readFile(fileName, 'utf-8'));
}


// Ticket 2d - RANDOM -----------------------------------------------------
export async function getRandomQuote() {
    // get the data
    const data = await fs.readFile(fileName, 'utf-8')
    // parse the data into a JS array
    const allQuotes = JSON.parse(data)
    // get a random index number and assign it to a variable
    let randomIndex = Math.floor(Math.random()*allQuotes.length)
    // return the random index of the data
    return allQuotes[randomIndex] 
}



// Ticket 2e - EDIT -------------------------------------------------------
export async function editQuote(id, quoteText) {
    // get the data
    const dataJSON = await fs.readFile(fileName, "utf-8")
    // parse the data into a new variable
    const quotes = JSON.parse(dataJSON)
    // create a new variable to return at the end. Either null / new quote
    let quote = null
    // Loop through the variable array
    for (let i = 0 ; i<quotes.length ; i++) {
        if (quotes[i].id === id) {
            // if the data id is equal to the id...
            quote = quotes[i];
            // set a new variable to be the selected quote index
            quotes[i].quoteText = quoteText;
            // replace the quoteText in the index to be the new given quoteText
            break;
        }  
    }
    // write the new quote into the data file   
    await fs.writeFile(fileName, JSON.stringify(quotes))
    // return the quote. Either: null / new quote
    return quote
    } ;


// Ticket 2f - DELETE --------------------------------------------------
export async function deleteQuote(id) {
    // get the data
    const dataJSON = await fs.readFile(fileName, "utf-8")
    // parse the data into a new variable
    const quotes = JSON.parse(dataJSON);
    // set the index to null
    let quoteIndex = null;

    for (let i = 0 ; i<quotes.length ; i++) {
        // if the index.id is equal to the given id...
        if (quotes[i].id === id) {
            // set the index to the array item
            quoteIndex = i;
            break;
            }
        }
    if (quoteIndex !== null) {
        // use splice to remove the quote at the quoteIndex position. Save as a new array 'deletedQuote'
        const deletedQuote = quotes.splice(quoteIndex, 1);
        // update the JSON file using 'writeFile'
        await fs.writeFile(fileName, JSON.stringify(quotes), "utf-8");
        // return the deleted quote array, index 0
        return deletedQuote[0];
        }
    return null;
}

