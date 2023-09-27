interface formDataType {
  [key: string]: FormDataEntryValue;
}

/**
 * Create form data from form (element) and its contents
 */
export const createFormData = (formElement: HTMLFormElement) => {
  const responseBody: formDataType = {};
  const formData = new FormData(formElement);

  formData.forEach(
    (value, property: string) => (responseBody[property] = value)
  );

  return responseBody;
};

/**
 * Create JSON from FormData
 */
export const formDataToObj = (formData: FormData) => {
  const formDataObj = {} as formDataType;
  for (const [key, value] of formData.entries()) {
    formDataObj[key] = value;
  }

  return formDataObj;
};
