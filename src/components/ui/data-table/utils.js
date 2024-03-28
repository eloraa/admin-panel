/**
 * Sanitizes the input object by converting all non-object, non-array values to strings, and recursively sanitizing any nested objects or arrays.
 *
 * @param {any} input - the input object to be sanitized
 * @return {object} the sanitized object
 */
export function sanitizeObject(input) {
  if (Array.isArray(input)) {
    return input.map(item => sanitizeObject(item));
  } else if (typeof input === 'object' && input !== null) {
    const sanitizedObj = {};

    for (const [key, value] of Object.entries(input)) {
      if (value === null) {
        sanitizedObj[key] = null;
      } else if (Array.isArray(value)) {
        sanitizedObj[key] = sanitizeObject(value);
      } else if (typeof value === 'object') {
        sanitizedObj[key] = sanitizeObject(value);
      } else {
        sanitizedObj[key] = String(value);
      }
    }

    return sanitizedObj;
  } else {
    return input;
  }
}
