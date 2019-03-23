  # BMI-calculator

  The Result monad is an attractive alternative to exceptions or other styles
  of error handling.
  
  The reasons:
  1. Type-safety. It is literally impossible to forget to handle the error case.
  2. Composability. Through flatMap you can easily compose your error handling,
  such that all error handling can be chained to a single expression.
  3. Monads. Also monads are generalizable. That means that you may write a function 
  that does some work on a monad without knowing what type of monad it is actually dealing with.  
  
  In TypeScript it is more common to use undefined as a result value. The problem however 
  with undefined is that it does  not actually tell you what the error is. So often you end 
  up with code like this:
  
  ```
  const config = parseConfig(configJson);
  if (!config) {
    log.error("Could not parse config json.");
    return undefined;
  }
  cont bmi = calcBMI(87, 185, config);
  if (!bmi) console.log("Could not calculate BMI.");
  else console.log("Your BMI is "+ bmi +".");
  ```
  
  You can see that the above code requires more code and is less informative. There could
  be many different reasons the json does not parse or your BMI could not be calculated,
  but with this type of error handling you will not find out.
