import {printResult} from "./Result";
import {calcBMI, parseConfig} from "./BMI";

const configJson = {
  weightUnit: "kgs",
  heightUnit: "meters"
};

const result = printResult(
  parseConfig(configJson).flatMap(config => calcBMI(87, 185, config))
);

document.getElementById('app').innerHTML += result;
