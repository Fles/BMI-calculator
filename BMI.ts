import {Result, success, fail, printResult} from "./Result";

enum WeightUnit {
  KGS, POUNDS
}

enum HeightUnit {
  METERS, INCHES
}

interface Config {
  weightUnit: WeightUnit;
  heightUnit: HeightUnit;
}


function getString(o: any): Result<string> {
  if (typeof o === "string") return success(o);
  else return fail(`${o} is not a string!`);
}

function parseWeight(weight: any): Result<WeightUnit> {
  return getString(weight).flatMap(w => {
    if (w == "kgs") return success(WeightUnit.KGS);
    else if (w == "pounds") return success(WeightUnit.POUNDS);
    else return fail(`${w} is not a valid weight unit.`);
  });
}

function parseHeight(height: any): Result<HeightUnit> {
  return getString(height).flatMap(h => {
    if (h == "meters") return success(HeightUnit.METERS);
    else if (h == "inches") return success(HeightUnit.INCHES);
    else return fail(`${h} is not a valid height unit.`);
  });
}


export function parseConfig(json: any): Result<Config> {
  return parseWeight(json["weightUnit"]).flatMap(weight =>
    parseHeight(json["heightUnit"]).flatMap(height =>
      success({
        weightUnit: weight,
        heightUnit: height
      })
    )
  )
}

export function calcBMI(weight: number, height: number, config: Config): Result<string|number> {
  if (weight < 0) return fail("Weight can not be less than zero.");
  if (height < 0) return fail("Height can not be less than zero.");

  if (config.heightUnit === HeightUnit.INCHES) height /= 39.3700787;
  if (config.weightUnit === WeightUnit.POUNDS) weight /= 2.20462;

  return success(weight/Math.pow(height,2));
}
