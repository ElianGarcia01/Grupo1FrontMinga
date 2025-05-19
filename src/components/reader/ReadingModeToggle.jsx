import { Button, ButtonGroup } from '@mui/material';

const ReadingModeToggle = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center mb-6">
      <ButtonGroup variant="contained" aria-label="Reading mode">
        <Button
          onClick={() => setMode('horizontal')}
          color={mode === 'horizontal' ? 'primary' : 'inherit'}
        >
          Horizontal
        </Button>
        <Button
          onClick={() => setMode('vertical')}
          color={mode === 'vertical' ? 'primary' : 'inherit'}
        >
          Vertical
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ReadingModeToggle;