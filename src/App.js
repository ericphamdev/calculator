import { useState } from 'react';
import ButtonNumber from './ButtonNumber';
import ButtonOperator from './ButtonOperator';

function App() {
  const [isFirstNumber, setFirstNumber] = useState(true);
  const [isDone, setDone] = useState(false);
  const [state, setState] = useState({});

  /**
   * Handle click on number buttons including the period.
   * For every number click, update the state numbers {num1, num2}
   */
  function handleNumber(e) {
    // Get calculation status to false
    setDone(false);
    // Get the number from the button 'number' attribute
    const number = e.target.getAttribute('number');

    // Check if the number is first or second between operator.
    if (isFirstNumber) {
      setState((prevState) => ({
        ...prevState,
        num1: prevState.num1 ? prevState.num1 + number : number,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        num2: prevState.num2 ? prevState.num2 + number : number,
      }));
    }
  }

  /**
   * Clear all the states of previous calculation.
   */
  function handleClear() {
    setState((prevState) => ({
      ...prevState,
      num1: '',
      num2: '',
      operator: '',
      result: '',
    }));
    setFirstNumber(true);
    setDone(false);
  }

  /**
   * Handle click on operators
   * modulus, division, multiplication, subtraction, addition
   */
  function handleOperator(e) {
    // Get the clicked operator
    const operator = e.target.getAttribute('operator');

    // Add to state.operator
    setState((prevState) => ({
      ...prevState,
      operator: operator,
    }));

    // switch to take second number from user.
    setFirstNumber(false);
  }

  /**
   * Perform calculation when user click on the equal sign.
   */
  function handleCalculation() {
    let result;
    // Check for operator and perform calculation
    switch (state.operator.toLowerCase()) {
      case 'x':
        result = Number(state.num1) * Number(state.num2);
        break;
      case '+':
        result = Number(state.num1) + Number(state.num2);
        break;
      case '-':
        result = Number(state.num1) - Number(state.num2);
        break;
      case '/':
        result = Number(state.num1) / Number(state.num2);
        break;
      case '%':
        result = Number(state.num1) % Number(state.num2);
        break;
      default:
        console.log('Operator not found.');
    }

    // Reset the states
    setState((prevState) => ({
      ...prevState,
      num1: '',
      num2: '',
      operator: '',
      result: result,
    }));

    // Switch first number to true to perform next calculation
    setFirstNumber(true);

    // Set calculation to done.
    setDone(true);
  }

  /**
   * Handle plus and minus operator.
   * If current number is positive, change to negative
   */
  function handlePlusMinusSign() {
    if (isFirstNumber) {
      setState((prevState) => ({
        ...prevState,
        num1: prevState.num1 ? '-' + prevState.num1 : '-',
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        num2: prevState.num2 ? '-' + prevState.num1 : '-',
      }));
    }
  }

  return (
    <div className="relative h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-screen grid grid-cols-4 gap-2 py-8">
          <div className="col-span-4 bg-slate-300 px-2 rounded h-full lg:min-h-[250px] py-8 break-all text-4xl text-gray-700">
            {isDone ? (
              <p>{state.result}</p>
            ) : (
              <p className="">
                {state.num1}{' '}
                <span className="text-lg text-gray-500">{state.operator}</span>{' '}
                {state.num2}
              </p>
            )}
          </div>
          <ButtonOperator operator="C" handleOperator={handleClear} />
          <ButtonOperator operator="+/-" handleOperator={handlePlusMinusSign} />
          <ButtonOperator operator="%" handleOperator={handleOperator} />
          <ButtonOperator operator="/" handleOperator={handleOperator} />

          <ButtonNumber number={7} handleNumber={handleNumber} />
          <ButtonNumber number={8} handleNumber={handleNumber} />
          <ButtonNumber number={9} handleNumber={handleNumber} />
          <ButtonOperator operator="X" handleOperator={handleOperator} />

          <ButtonNumber number={4} handleNumber={handleNumber} />
          <ButtonNumber number={5} handleNumber={handleNumber} />
          <ButtonNumber number={6} handleNumber={handleNumber} />
          <ButtonOperator operator="-" handleOperator={handleOperator} />

          <ButtonNumber number={1} handleNumber={handleNumber} />
          <ButtonNumber number={2} handleNumber={handleNumber} />
          <ButtonNumber number={3} handleNumber={handleNumber} />
          <ButtonOperator operator="+" handleOperator={handleOperator} />

          <ButtonNumber number={0} handleNumber={handleNumber} />
          <ButtonNumber number={'.'} handleNumber={handleNumber} />

          <div className="col-span-2 flex w-full">
            <ButtonOperator operator="=" handleOperator={handleCalculation} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
