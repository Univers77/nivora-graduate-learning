import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/shared/AppShell";
import { ClimateLab, ModuleOneLesson, ModuleOneOverview, OscarLearningHome } from "./components/dashboard/OscarLearningHome";
import { LandingPage, LearningMemoryPage, LearningVaultPage, SkillTreePage, StudyDocsPage } from "./pages";

const CourseOverviewPage = lazy(() => import("./components/course/CourseKnowledge").then(module => ({ default: module.CourseOverviewPage })));
const UnitDetailPage = lazy(() => import("./components/course/CourseKnowledge").then(module => ({ default: module.UnitDetailPage })));
const GlossaryPage = lazy(() => import("./components/course/CourseKnowledge").then(module => ({ default: module.GlossaryPage })));
const PracticeBankPage = lazy(() => import("./components/course/CourseKnowledge").then(module => ({ default: module.PracticeBankPage })));

const loading = <div className="panel mx-auto max-w-3xl p-8 text-center"><p className="eyebrow">Preparando contenido</p><p className="mt-3 text-white/50">Organizando tu siguiente experiencia de aprendizaje...</p></div>;

export default function App() {
  return (
    <Suspense fallback={loading}><Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<OscarLearningHome />} />
        <Route path="/course" element={<CourseOverviewPage />} />
        <Route path="/course/:unitId" element={<UnitDetailPage />} />
        <Route path="/module-1" element={<ModuleOneOverview />} />
        <Route path="/module-1/lesson" element={<ModuleOneLesson />} />
        <Route path="/module-1/climate-lab" element={<ClimateLab />} />
        <Route path="/learning-vault" element={<LearningVaultPage />} />
        <Route path="/skill-tree" element={<SkillTreePage />} />
        <Route path="/learning-memory" element={<LearningMemoryPage />} />
        <Route path="/study-docs" element={<StudyDocsPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/practice" element={<PracticeBankPage />} />
      </Route>
      <Route path="/about" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></Suspense>
  );
}
