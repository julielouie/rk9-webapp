let basename = '';
// let basename = '';

if (!process.env.PUBLIC_URL || process.env.PUBLIC_URL === '/') basename = '';
else basename = process.env.PUBLIC_URL;

export default basename;
