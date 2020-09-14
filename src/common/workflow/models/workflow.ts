import { ObjectType } from "./object-type";
import { WorkflowStep } from "./workflow-step";

export interface Workflow {
  name: string;
  objecttype: ObjectType;
  createdBy: string;
  description: string;
  steps: Array<WorkflowStep>;
}
