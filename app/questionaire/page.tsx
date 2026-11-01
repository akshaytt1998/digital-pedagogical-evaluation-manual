import { Suspense } from 'react';
import Questionnaire from '../components/questionaire';

export default function QuestionnairePage() {
  return (
    <div className="p-4">
      <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
        <Questionnaire />
      </Suspense>
    </div>
  );
}
