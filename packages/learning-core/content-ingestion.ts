export function ingestNewMaterial(input: { title: string; body: string; type: string }) {
  const normalized = `${input.title}:${input.type}:${input.body.trim().toLowerCase()}`;
  let hash = 0;
  for (const char of normalized) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return {
    contentFingerprint: `local-${hash.toString(16)}`,
    detectedTopics: input.title.toLowerCase().split(/\W+/).filter(Boolean).slice(0, 4),
    suggestedModule: "pending-review",
    suggestedSubmodule: "pending-review",
    generatedLessons: [],
    generatedQuiz: [],
    generatedStudyDoc: null,
    suggestedBadges: [],
    updateActions: ["review", "classify", "update-content-index"],
  };
}
