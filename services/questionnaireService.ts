import { USE_BACKEND } from '../utils/config';
import type { QuestionSection, SubmissionPayload, User } from '../utils/types';

const SUBMISSIONS_KEY = 'mooc_submissions';
const USERS_KEY = 'mooc_users';

// Seeded mock users for initial local state
const MOCK_USERS: User[] = [
  {
    id: '1',
    role: 'Learner',
    score: 42,
    submittedAt: new Date('2024-01-15').toISOString(),
    answers: {},
  },
  {
    id: '2',
    role: 'Teacher',
    score: 78,
    submittedAt: new Date('2024-02-10').toISOString(),
    answers: {},
  },
];

export async function getQuestions(): Promise<QuestionSection[]> {
  if (!USE_BACKEND) {
    const { default: data } = await import('../app/api/questions/data.js');
    return data as QuestionSection[];
  }
  const res = await fetch('/api/questions');
  if (!res.ok) throw new Error('Failed to fetch questions');
  const json = await res.json();
  return json.questions as QuestionSection[];
}

export async function saveAnswers(payload: SubmissionPayload): Promise<void> {
  if (!USE_BACKEND) {
    const submissions: SubmissionPayload[] = JSON.parse(
      localStorage.getItem(SUBMISSIONS_KEY) ?? '[]'
    );
    submissions.push(payload);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));

    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) ?? 'null') ?? [...MOCK_USERS];
    const newUser: User = {
      id: String(Date.now()),
      role: payload.role,
      score: payload.score,
      submittedAt: new Date().toISOString(),
      answers: payload.answers,
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return;
  }

  const res = await fetch('/api/saveAnswers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to save answers');
}

export async function getUsers(): Promise<User[]> {
  if (!USE_BACKEND) {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored) as User[];
    // Seed initial mock users on first access
    localStorage.setItem(USERS_KEY, JSON.stringify(MOCK_USERS));
    return MOCK_USERS;
  }

  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json() as Promise<User[]>;
}
