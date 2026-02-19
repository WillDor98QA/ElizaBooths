# ElizaBooths Website

A modern, responsive website for ElizaBooths - Premium Photo Booth Experiences.

## Features

- ✅ YouTube video hero section with autoplay
- ✅ Modern, clean design
- ✅ Fully responsive
- ✅ Smooth scroll animations
- ✅ Image gallery with error handling
- ✅ Contact section with social links
- ✅ Production-ready for hosting

## Setup Instructions

### 1. Add Your YouTube Video

1. Open `script.js`
2. Find the `CONFIG` object at the top
3. Add your YouTube video ID to `youtubeVideoId`

**How to get YouTube Video ID:**
- If your URL is: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Your video ID is: `dQw4w9WgXcQ`
- Just copy the part after `v=`

**Example:**
```javascript
const CONFIG = {
  youtubeVideoId: 'dQw4w9WgXcQ', // Your video ID here
  galleryImages: []
};
```

**Note:** You can also paste the full YouTube URL - the script will automatically extract the ID.

### 2. Add Gallery Images

1. Open `script.js`
2. Find the `galleryImages` array in the `CONFIG` object
3. Add your image URLs (full URLs or relative paths)

**Example:**
```javascript
galleryImages: [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  './images/photo1.jpg',
  './images/photo2.jpg'
]
```

**Tips:**
- Use full URLs (https://...) for images hosted elsewhere
- Use relative paths (./images/photo.jpg) for local images
- Images will automatically handle errors if URLs are broken

### 3. Hosting

The website is ready to host! Just upload all files to your hosting provider.

**Files to upload:**
- `index.html`
- `styles.css`
- `script.js`
- Any image files you're using locally

**Recommended hosting:**
- Netlify (drag & drop)
- Vercel
- GitHub Pages
- Any standard web hosting

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --primary-color: #FCBE00;    /* Gold/Yellow */
  --secondary-color: #000000;  /* Black */
  --text-color: #333333;       /* Dark gray */
}
```

### Content
All content is in `index.html` - edit directly to change text, sections, etc.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Notes

- YouTube autoplay works best when video is muted (automatically handled)
- Some browsers may block autoplay - video will still load and play on interaction
- Gallery images have error handling - broken images won't break the site
