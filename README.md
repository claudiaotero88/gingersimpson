# Ginger Simpson - Portfolio Website

Professional portfolio website for Ginger Simpson, actor, singer, and dancer based in Los Angeles.

## 🌐 Live Site
- **GitHub Pages URL**: https://claudiaotero88.github.io/gingersimpson/
- **Custom Domain**: (to be configured)

## 📁 Project Structure
```
gingersimpson/
├── index.html          # Homepage with hero section and recent work slideshow
├── gallery.html        # Photo gallery with lightbox
├── media.html          # Performance videos and reels
├── resume.html         # Professional resume with PDF viewer
├── robots.txt          # Search engine crawling instructions
├── sitemap.xml         # Site map for SEO
├── .gitignore          # Git ignore file
└── assets/
    ├── css/
    │   └── styles.css  # Main stylesheet
    ├── js/
    │   └── main.js     # JavaScript for navigation, slideshow, lightbox
    ├── images/         # Production photos and headshots
    ├── videos/         # Performance video files
    └── resume/         # PDF resume file
```

## 🚀 Deployment to GitHub Pages

### Initial Setup
1. Initialize Git repository:
   ```bash
   cd "C:\Users\cotero\Desktop\Ginger Portfolio Site"
   git init
   git add .
   git commit -m "Initial commit: Ginger Simpson portfolio website"
   ```

2. Connect to GitHub repository:
   ```bash
   git remote add origin https://github.com/claudiaotero88/gingersimpson.git
   git branch -M main
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Under "Source", select "Deploy from a branch"
   - Select branch: `main` and folder: `/ (root)`
   - Click Save
   - Site will be live at: https://claudiaotero88.github.io/gingersimpson/

### Updating the Site
```bash
git add .
git commit -m "Description of changes"
git push
```
Changes will appear on the live site within 1-2 minutes.

## 🔗 Custom Domain Setup (Squarespace)

### Option 1: Redirect from Squarespace to GitHub Pages
1. In Squarespace domain settings, set up a redirect to:
   `https://claudiaotero88.github.io/gingersimpson/`

### Option 2: Point Domain to GitHub Pages (Recommended)
1. In Squarespace DNS settings, add these records:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   
   Type: A
   Host: @
   Value: 185.199.109.153
   
   Type: A
   Host: @
   Value: 185.199.110.153
   
   Type: A
   Host: @
   Value: 185.199.111.153
   
   Type: CNAME
   Host: www
   Value: claudiaotero88.github.io
   ```

2. In GitHub repository:
   - Go to Settings > Pages
   - Under "Custom domain", enter your domain
   - Check "Enforce HTTPS"

3. Update all URLs in the website:
   - Replace `https://claudiaotero88.github.io/gingersimpson/` with your custom domain
   - Update in: index.html, gallery.html, media.html, resume.html, sitemap.xml, robots.txt

## 📊 SEO Features
- ✅ Semantic HTML5 structure
- ✅ Meta descriptions and keywords
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ JSON-LD structured data (Schema.org Person)
- ✅ Sitemap.xml for search engines
- ✅ Robots.txt allowing all crawlers
- ✅ Responsive images with alt text
- ✅ Canonical URLs
- ✅ Fast loading with optimized assets

## 🎨 Technologies Used
- HTML5, CSS3, JavaScript (vanilla, no frameworks)
- CSS Grid and Flexbox for responsive layouts
- IntersectionObserver API for scroll animations
- HTML5 video for media playback
- Accessible navigation and lightbox
- Mobile-first responsive design

## 📱 Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## 📄 License
© 2026 Ginger Simpson. All rights reserved.

## 📧 Contact
- **Email**: gingersimpsonn@gmail.com
- **Phone**: 424-522-4845
- **Instagram**: [@gingersimpson_](https://www.instagram.com/gingersimpson_/)
- **Backstage**: [gingersimpson](https://www.backstage.com/u/tal/gingersimpson)
