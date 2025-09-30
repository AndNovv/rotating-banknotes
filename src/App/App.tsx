import RotatingBanknotes from '../components/RotatingBanknotes/RotatingBanknotes';

function App() {
  return (
    <>
      <RotatingBanknotes
        banknotesCount={40}
        radius={200}
        speed={1.5}
        amplitude={0.15}
        banknoteWidth={200}
        banknoteHeight={140}
        banknoteDepth={5}
      />
    </>
  );
}

export default App;
