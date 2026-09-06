export default function manifest() {
  return {
    name: 'Sampanna Tech',
    short_name: 'Sampanna Tech',
    description: 'Technology That Helps Your Business Grow.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#1B6FF5',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}