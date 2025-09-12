export interface OptionParams {
  id: string;
  text: string;
  votes: number;
}

export interface PollParams {
  id: string;
  text: string;
  options: OptionParams[];
  createdAt: string;
}

export class PollDto {
  constructor(params: PollParams) {
    Object.assign(this, params);
  }
}
