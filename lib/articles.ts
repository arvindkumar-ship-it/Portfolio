export interface Article {
  title: string;
  url: string;
  summary?: string;
  date?: string;
  readTime?: string;
}

export const mediumProfile: string | null = "https://medium.com/@arvindkumar.acad";
export const articles: Article[] = [
  {
    title: "AIAA: rule-based safety gating and an untrained LSTM",
    url: "https://medium.com/@arvindkumar.acad/student-built-aiaa-agent-uses-rule-based-safety-gating-while-its-lstm-predictor-remains-untrained-091a7239992b",
  },
];
