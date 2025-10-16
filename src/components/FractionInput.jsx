import { Form, InputGroup } from 'react-bootstrap';

const FractionInput = ({ 
  label, 
  value, 
  onChange, 
  onKeyPress,
  placeholder = "e.g., 1 1/2 or 3/4", 
  disabled = false 
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          size="lg"
          disabled={disabled}
        />
        <InputGroup.Text>"</InputGroup.Text>
      </InputGroup>
      <Form.Text className="text-muted">
        Enter as: whole number, fraction, or mixed number
      </Form.Text>
    </Form.Group>
  );
};

export default FractionInput;