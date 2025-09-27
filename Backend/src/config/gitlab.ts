const gitlab = {
  host: process.env.GIT_HOST || 'https://gitlab.com',
  token: process.env.GIT_TOKEN || '',
};

export default gitlab;
