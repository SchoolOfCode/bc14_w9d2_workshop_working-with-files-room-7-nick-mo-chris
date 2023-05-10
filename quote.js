import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
const fileName = 'quotes.json';
// Function to add a new quote to the JSON file
export async function addQuote(quoteText) {
	// Reading the quotes from the JSON file
	const data = await fs.readFile(fileName, 'utf-8');
	const quotes = JSON.parse(data);
	// Creating a new quote object with a unique ID
	const quote = { id: uuidv4(), quoteText };
	// Adding the new quote to the quotes array
	quotes.push(quote);
	// Overwriting the quotes JSON file with the updated quotes array
	await fs.writeFile(fileName, JSON.stringify(quotes));
	// Returning the new quote that was added
	return quote;
}
// Function to get all quotes from the JSON file
export async function getQuotes() {
	// Reading the quotes from the JSON file
	const data = await fs.readFile(fileName, 'utf-8');
	// Parsing the data as JSON and returning it
	return JSON.parse(data);
}
// Function to get a random quote from the JSON file
export async function getRandomQuote() {
	// Reading the quotes from the JSON file
	const data = await fs.readFile(fileName, 'utf-8');
	const quotes = JSON.parse(data);
	// Generating a random index to get a random quote object
	const randomIndex = Math.floor(Math.random() * quotes.length);
	// Returning the random quote object from the quotes array
	return quotes[randomIndex];
}
// Function to modify a quote in the JSON file by ID
export async function editQuote(id, quoteText) {
	// Reading the quotes from the JSON file
	const data = await fs.readFile(fileName, 'utf-8');
	const quotes = JSON.parse(data);
	// Finding the index of the quote to be modified
	const index = quotes.findIndex(quote => quote.id === id);
	// If the quote exists, modify its text and save to the JSON file
	if (index >= 0) {
		quotes[index].quoteText = quoteText;
		await fs.writeFile(fileName, JSON.stringify(quotes));
		// Returning the modified quote object
		return quotes[index];
	}
	// If the quote does not exist, return null
	return null;
}
// Function to delete a quote from the JSON file by ID
export async function deleteQuote(id) {
	// Reading the quotes from the JSON file
	const data = await fs.readFile(fileName, 'utf-8');
	const quotes = JSON.parse(data);
	// Finding the index of the quote to be deleted
	const index = quotes.findIndex(quote => quote.id === id);
	// If the quote exists, splice it from the quotes array and save to the JSON file
	if (index >= 0) {
		const quote = quotes.splice(index, 1)[0];
		await fs.writeFile(fileName, JSON.stringify(quotes));
		// Returning the deleted quote object
		return quote;
	}
	// If the quote does not exist, return null
	return null;
}
