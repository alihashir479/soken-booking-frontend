type OptionTypes = {
  method?: string;
  body?: FormData | string;
  headers?: Record<string, string>;
};
export const fetchWrapper = (options: OptionTypes) => {
  if (localStorage.auth_token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${JSON.parse(localStorage.auth_token)}`,
    };
  }
  return options;
};
