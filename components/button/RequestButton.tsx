import { Button } from '@mui/material';

interface RequestButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const RequestButton: React.FC<RequestButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="button"
      variant="contained"
    >
      {disabled ? 'Fetching data...' : 'Fetch Data'}
    </Button>
  );
};

export default RequestButton;
