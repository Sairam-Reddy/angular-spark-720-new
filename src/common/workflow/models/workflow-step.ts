import { User } from "./user";

export interface WorkflowStep {
  acceptStep: string;
  completionCriteria: string;
  id: string;
  name: string;
  needsClaim: boolean;
  recipients: Array<User>;
  rejectStep: string;
  status: string;
  stepDefination: string;
  completedDate: Date;
  completedBy: User;
  targetDate: Date;
}
