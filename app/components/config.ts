// config.ts
export const isDevelopment = process.env.NODE_ENV === 'development';
console.log(process.env.NODE_ENV)

export const mockTelegramData = {
  query_id: 'AAGjGFYvAwAAAKMYVi8sWTYy',
  user: {
    id: 77777777777,
    first_name: 'Test',
    last_name: '',
    username: 'TestTest',
    language_code: 'en',
    is_premium: true,
    added_to_attachment_menu: true,
    allows_write_to_pm: true,
    photo_url: 'https://t.me/i/userpic/320/qEIFW3a1VHc6BfkQpyUOIzJxxSnqwL2rhiLlr2bA5UYocx8rTO5yesUB3MGqJyYE.svg'
  },
  auth_date: 1731447097,
  hash: '0a0bfa7be9b4727e5367a67cbedf09c5c326d4bf9627161b48e6ca02b24a1438'
};

export function objectToQueryString(obj: Record<string, any>): string {
  const parts: string[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        parts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(obj[key]))}`
        );
      } else {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(obj[key]))}`);
      }
    }
  }
  return parts.join('&');
}
