import { useState, useEffect } from 'react';

export const useFormDraft = <T extends Record<string, any>>(
  moduleId: string,
  initialValues: T
) => {
  const storageKey = `murdock_draft_${moduleId}`;

  const [draft, setDraft] = useState<T>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : initialValues;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(draft));
  }, [storageKey, draft]);

  const clearDraft = () => {
    localStorage.removeItem(storageKey);
    setDraft(initialValues);
  };

  return { draft, setDraft, clearDraft };
};
