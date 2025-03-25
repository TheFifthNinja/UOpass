/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    tailwindcss: {
      theme: {
        extend: {
          colors: {
            'deep-blue': '#000044',
            'vibrant-orange': '#ee8a07',
            'sunny-yellow': '#ffde46'
          }
        }
      }
    },
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
