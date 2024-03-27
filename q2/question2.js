const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const WINDOW_SIZE = 10;
let storedNumbers = [];

const fetchNumbers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/numbers');
        if (response.status === 200) {
            return response.data.numbers || [];
        }
    } catch (error) {
        console.error(`Error fetching numbers: ${error.message}`);
        return [];
    }
}

const filterNumbers = (numbers, numberType) => {
    if (numberType === 'p') {
        return numbers.filter(num => isPrime(num));
    } else if (numberType === 'f') {
        return numbers.filter(num => isFibonacci(num));
    } else if (numberType === 'e') {
        return numbers.filter(num => num % 2 === 0);
    } else if (numberType === 'r') {
        return numbers;
    }
}

const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const isFibonacci = (num) => {
    const root5 = Math.sqrt(5);
    const phi = (1 + root5) / 2;
    const a = phi * num;
    return num === 0 || Math.abs(Math.round(a) - a) < 1.0 / num;
}

const calculateAverage = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return numbers.length > 0 ? sum / numbers.length : 0;
}

app.get('/numbers/:numberid', async (req, res) => {
    const numberId = req.params.numberid;

    const fetchedNumbers = await fetchNumbers();
    const filteredNumbers = filterNumbers(fetchedNumbers, numberId);

    storedNumbers = [...new Set([...storedNumbers, ...filteredNumbers])].slice(-WINDOW_SIZE);
    const before = [...storedNumbers];
    const average = calculateAverage(storedNumbers);

    const response = {
        before,
        after: storedNumbers,
        average
    };

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
