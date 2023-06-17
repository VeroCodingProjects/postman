import { TextField } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import RequestButton from '../button/RequestButton';

type InputFieldProps = {
  isLoading: boolean;
  data: any[];
  apiLink: string;
  onApiLinkChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fetchData: () => Promise<void>;
};

const InputField: React.FC<InputFieldProps> = ({
  isLoading,
  data,
  apiLink,
  onApiLinkChange,
  fetchData,
}) => {
  return (
    <div>
      <TextField
        className="url"
        value={apiLink}
        onChange={onApiLinkChange}
        placeholder="Enter API link"
        required
      />
      <RequestButton onClick={fetchData} disabled={isLoading} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default InputField;
