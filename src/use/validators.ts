export const useValidators = () => {
  const required = (value: any) => !!value;
  const minLength = (num: number) => (value: string) => value.length >= num;
  const email = (value: string) =>
    value.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const exist = (values: string[]) => (value: string) =>
    !values.includes(value);
  const url = (value: string) =>
    value.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/
    );
  return {
    required,
    minLength,
    email,
    exist,
    url,
  };
};
