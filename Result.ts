export type Result<T> = ResultSuccess<T> | ResultFail<T>;

interface ResultBase<T> {
  flatMap<G>(fn: (val: T) => Result<G>): Result<G>;
}

class ResultSuccess<T> implements ResultBase<T> {
  val: T;
  isSuccess: true = true;

  constructor(val: T){
    this.val = val;
  }

  flatMap<G>(fn: (val: T) => Result<G>): Result<G> {
    return fn(this.getResult());
  }

  getResult(): T {
    return this.val;
  }
}

class ResultFail<T> implements ResultBase<T> {
  err: string;
  isSuccess: false = false;

  constructor(err: string){
    this.err = err;
  }

  flatMap<G>(fn: (val: T) => Result<G>): Result<G> {
    return fail<G>(this.err);
  }

  getFailureMsg(): string {
    return this.err;
  }
}


export function fail<T>(failureMsg: string): Result<T> {
  return new ResultFail<T>(failureMsg);
}

export function success<T>(value: T): Result<T> {
  return new ResultSuccess(value);
}

export function printResult<R>(result: Result<R>): string {
  const out = (result.isSuccess === true)
    ? `Your BMI: ${result.getResult()}`
    : result.getFailureMsg();
  console.log(out);
  
  return out.toString();
}
