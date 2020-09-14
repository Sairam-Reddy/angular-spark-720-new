import { StepAction } from "./step-actions";
import { StepType } from "./step-type";

export interface StepDefination {
  actions: Array<StepAction>;
  name: string;
  description: string;
  stepType: StepType;
  customFunction: string;
}