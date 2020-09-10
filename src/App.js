import React from 'react';

import { Button, Container, Grid, Header, Paragraph } from './components';
import DESCRIPTION from './constants/DESCRIPTION';

const App = () => {
  const [scenario, setScenario] = React.useState('');
  const [running, setRunning] = React.useState(false);

  const handleClick = (id) => {
    setRunning(true);
    setScenario(id);
    if (scenario === id && running) {
      setRunning(false);
    }
  };

  return (
    <Container>
      <Header>
        <Paragraph>{DESCRIPTION}</Paragraph>
        <Button.Container>
          <Button key='connected' onClick={() => handleClick('connected')} active={scenario === 'connected'}>
            connected
          </Button>
          <Button key='disconnected' onClick={() => handleClick('disconnected')} active={scenario === 'disconnected'}>
            disconnected
          </Button>
          <Button key='random' onClick={() => handleClick('random')} active={scenario === 'random'}>
            random
          </Button>
        </Button.Container>
      </Header>
      <Grid scenario={scenario} running={running} />
    </Container>
  );
};

export default App;
