import React, { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/api/data")
            .then(res => res.json())
            .then(values => setData(values))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Fetched Data:</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
