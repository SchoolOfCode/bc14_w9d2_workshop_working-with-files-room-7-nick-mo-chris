import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

const fileName = 'quotes.json';
const quotes = [];

export async function addQuote(quoteText) {
	// generate random quote with unique id
	const quote = { id: uuidv4(), quoteText: quoteText };
    const read = await fs.readFile(fileName, 'utf-8')
	const data = JSON.parse(read);

	const newQuotes = [...data, quote];

	const quotesJSON = JSON.stringify(newQuotes);

	// write quotes data
	await fs.writeFile(fileName, quotesJSON, 'utf-8');
	console.log(quotesJSON);
	return quote;
}
await addQuote('Five four three two one');
// await addQuote('Testing 1');
// await addQuote('Testing 2');
// await addQuote('Testing 3');
// addQuote('TEST2');

export async function getQuotes() {
	// read all quotes
	return JSON.parse(await fs.readFile(fileName, 'utf-8'));
}

export async function getRandomQuote() {
    const data = await fs.readFile(fileName, 'utf-8')
    const allQuotes = JSON.parse(data)
    let randomQuote = Math.floor(Math.random()*allQuotes.length)
    console.log(randomQuote)
    return allQuotes[randomQuote] 
}
console.log(await getRandomQuote())

export async function editQuote(id, quoteText) {}

export async function deleteQuote(id) {}
