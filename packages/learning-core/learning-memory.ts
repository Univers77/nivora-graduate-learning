export type LearningMemoryEvent = { conceptId: string; action: string; timestamp: string; score?: number };
export const appendLearningMemory = (events: LearningMemoryEvent[], event: LearningMemoryEvent) => [...events, event];
