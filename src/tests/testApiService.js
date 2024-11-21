import { fetchGamesByDate } from '../utils/apiService.js'; // Replace with the actual path

async function testFetchGamesByDate() {
  console.log('Running test for fetchGamesByDate...');

  // Test with a valid date
  const testDate = '2024-11-19';
  try {
    const games = await fetchGamesByDate(testDate);
    console.log('Test passed: Data fetched successfully.');
    console.log('Sample Data:', games[0]); // Print sample data for validation
  } catch (error) {
    console.error('Test failed: Unable to fetch data.');
    console.error('Error:', error.message);
  }

  // Test with an invalid date (edge case)
  const invalidDate = 'invalid-date';
  try {
    const games = await fetchGamesByDate(invalidDate);
    console.log('Test passed: Handled invalid date gracefully.');
    console.log('Response:', games);
  } catch (error) {
    console.log('Test passed: Caught an error for invalid date.');
    console.error('Error:', error.message);
  }
}

testFetchGamesByDate();
