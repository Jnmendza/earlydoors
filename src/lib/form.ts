export const createImagePreview = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.readAsDataURL(file);
  });
};

export const createFormData = (file: File, folder: string): FormData => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  return formData;
};
