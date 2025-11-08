/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {JudgeCase} from "./JudgeCase";
import type {JudgeConfig} from "./JudgeConfig";

export type QuestionAddRequest = {
  answer?: string;
  content?: string;
  judgeCase?: Array<JudgeCase>;
  judgeConfig?: JudgeConfig;
  tag?: Array<string>;
  title?: string;
};
