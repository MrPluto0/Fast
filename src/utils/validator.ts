export const AccountValidator = (content: string) =>
  /[0-9a-zA-Z_]{5,15}/.test(content);

export const NumValidator = (content: string) => /[0-9]*\.[0-9]*/.test(content);
