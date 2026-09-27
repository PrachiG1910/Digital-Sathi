import { Router, Request, Response } from 'express';
import { stagesData, practiceTasks, safetyQuizQuestions } from '../../frontend/data/curriculum';
import { stagesMarathi, practiceTasksMarathi } from '../../frontend/data/curriculumMarathi';
import { stagesEnglish, practiceTasksEnglish } from '../../frontend/data/curriculumEnglish';

export const curriculumRouter = Router();

// GET /api/curriculum?lang=hi|mr|en
curriculumRouter.get('/', (req: Request, res: Response) => {
  const lang = (req.query.lang as string || 'hi').toLowerCase();

  let stages = stagesData;
  if (lang === 'mr') {
    stages = stagesMarathi;
  } else if (lang === 'en') {
    stages = stagesEnglish;
  }

  res.status(200).json({
    success: true,
    language: lang,
    totalStages: stages.length,
    stages,
  });
});

// GET /api/curriculum/safety-quiz?lang=hi|mr|en
curriculumRouter.get('/safety-quiz', (req: Request, res: Response) => {
  const lang = (req.query.lang as string || 'hi').toLowerCase();

  res.status(200).json({
    success: true,
    language: lang,
    totalQuestions: safetyQuizQuestions.length,
    questions: safetyQuizQuestions,
  });
});

// GET /api/curriculum/practice-tasks?lang=hi|mr|en
curriculumRouter.get('/practice-tasks', (req: Request, res: Response) => {
  const lang = (req.query.lang as string || 'hi').toLowerCase();

  let tasks = practiceTasks;
  if (lang === 'mr') {
    tasks = practiceTasksMarathi;
  } else if (lang === 'en') {
    tasks = practiceTasksEnglish;
  }

  res.status(200).json({
    success: true,
    language: lang,
    totalTasks: tasks.length,
    tasks,
  });
});
