import { Button, Card } from 'react-bootstrap';

const QuickFractions = ({ onSelect, title = "Quick Fractions" }) => {
  const commonFractions = [
    '1/16', '1/8', '3/16', '1/4',
    '5/16', '3/8', '7/16', '1/2',
    '9/16', '5/8', '11/16', '3/4',
    '13/16', '7/8', '15/16', '1'
  ];

  return (
    <Card className="mb-3">
      <Card.Header className="py-2">
        <small className="text-muted">{title}</small>
      </Card.Header>
      <Card.Body className="py-2">
        <div className="d-flex flex-wrap gap-1">
          {commonFractions.map((fraction) => (
            <Button
              key={fraction}
              variant="outline-primary"
              size="sm"
              onClick={() => onSelect(fraction)}
              style={{ minWidth: '50px' }}
            >
              {fraction}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuickFractions;