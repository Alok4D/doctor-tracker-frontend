/**
 * Converts a plain payload object (with optional File fields) into FormData
 * for multipart/form-data submissions to Express + Multer endpoints.
 */
export function toFormData(payload: Record<string, any>): FormData {
  if (payload instanceof FormData) {
    return payload;
  }

  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}

