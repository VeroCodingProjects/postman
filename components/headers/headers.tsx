import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const HeadersValidation = () => {
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');

  const addHeader = () => {
    const newHeader = { key: headerKey, value: headerValue };
    setHeaders([...headers, newHeader]);
    setHeaderKey('');
    setHeaderValue('');
  };

  const validateHeaders = async () => {
    try {
      const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=Hypoallergenic&product_type=eyeshadow', { params: headers });
      if (response.data.success) {
        console.log('Validation successful');
      } else {
        console.log('Validation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderKey(event.target.value);
  };

  const handleValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderValue(event.target.value);
  };


  return (
    <div>
      <h1>List of Headers</h1>
      <TextField
        type="text"
        placeholder="Header Key"
        value={headerKey}
        onChange={handleKeyInputChange}
      />
      <TextField
        type="text"
        placeholder="Header Value"
        value={headerValue}
        onChange={handleValueInputChange}
      />
      <Button onClick={function() {addHeader(); validateHeaders()}}>Validate Headers</Button>
      <ul>
        {headers.map((header, index) => (
          <p key={index}>
            {header.key} {'      ->      '}
            {header.value}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default HeadersValidation;
