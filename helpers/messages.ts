const supportMessage = (type: string) => {
  return `We only support ${type}`;
};

export const DICTIONARY = {
  EMAIL: "Invalid email address",
  REQUIRED: "This field is required",
  MIN_LENGTH: "The minimum character length was not met",
  REPEAT_PASSWORD: "Your passwords do no match",
  BASIC_ERROR: "Something went wrong",
  SUPPORTS: supportMessage,
};
