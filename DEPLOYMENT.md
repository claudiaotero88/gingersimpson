# 🚀 Deployment Guide - Ginger Simpson Portfolio

## Step-by-Step: Push to GitHub Pages

### Step 1: Initialize Git Repository (in PowerShell)

```powershell
cd "C:\Users\cotero\Desktop\Ginger Portfolio Site"

# Initialize Git
git init

# Install Git LFS (for large video files)
git lfs install

# Track large video files with LFS
git lfs track "*.mov"
git lfs track "*.mp4"
git lfs track "assets/videos/*"

# Stage all files
git add .

# Commit
git commit -m "Initial commit: Ginger Simpson portfolio website"
```

### Step 2: Connect to GitHub

```powershell
# Add remote repository
git remote add origin https://github.com/claudiaotero88/gingersimpson.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub (this will take a while due to large video files)
git push -u origin main
```

**Note**: The push will take 5-10 minutes due to the 1.38 GB of video files.

### Step 3: Enable GitHub Pages

1. Go to: https://github.com/claudiaotero88/gingersimpson
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under **Source**:
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Click **Save**
5. Wait 1-2 minutes
6. Your site will be live at: **https://claudiaotero88.github.io/gingersimpson/**

### Step 4: Verify Site Works

Visit https://claudiaotero88.github.io/gingersimpson/ and test:
- ✅ All pages load (Home, Gallery, Media, Resume)
- ✅ Navigation works
- ✅ Images display
- ✅ Videos play
- ✅ Lightbox works in gallery
- ✅ Resume PDF opens

---

## 🌐 Connecting Your Squarespace Domain

### Option 1: Full Custom Domain (Recommended)

**In Squarespace DNS Settings**, add these DNS records:

| Type  | Host | Value                     | TTL  |
|-------|------|---------------------------|------|
| A     | @    | 185.199.108.153          | 3600 |
| A     | @    | 185.199.109.153          | 3600 |
| A     | @    | 185.199.110.153          | 3600 |
| A     | @    | 185.199.111.153          | 3600 |
| CNAME | www  | claudiaotero88.github.io | 3600 |

**In GitHub (Settings > Pages)**:
1. Under "Custom domain", enter: `yourdomain.com`
2. Check "Enforce HTTPS" (wait 24 hours for SSL certificate)
3. Click Save

**Then update URLs in your website** (after domain is live):

Replace all instances of `https://claudiaotero88.github.io/gingersimpson/` with `https://yourdomain.com/` in:
- index.html (head section)
- gallery.html (head section)
- media.html (head section)
- resume.html (head section)
- sitemap.xml
- robots.txt

### Option 2: Simple Redirect

In Squarespace domain settings:
- Set up a redirect from your domain to `https://claudiaotero88.github.io/gingersimpson/`
- This is simpler but the URL will show the GitHub Pages address

---

## 📝 Future Updates

When you want to update the website:

```powershell
cd "C:\Users\cotero\Desktop\Ginger Portfolio Site"

# Make your changes to HTML/CSS/images...

# Stage changes
git add .

# Commit with a message
git commit -m "Updated gallery photos"

# Push to GitHub
git push

# Site updates automatically in 1-2 minutes
```

---

## ⚠️ Important Notes

### Git LFS Bandwidth Limits
- **GitHub Free**: 1 GB storage, 1 GB/month bandwidth
- Large video files count against this quota
- If you exceed bandwidth, GitHub will throttle downloads
- **Solution**: Consider hosting videos on YouTube/Vimeo if bandwidth becomes an issue

### Video File Sizes
Your current videos total **1.38 GB**:
- amanda-wingfield-glass-menagerie.mov: 479 MB
- All That Jazz.mp4: 278 MB
- kcactf-semifinal.mov: 221 MB
- Take Me or Leave Me.mp4: 143 MB
- These Shining Lives.mp4: 112 MB
- fight-song.mp4: 11 MB

These will work with Git LFS, but if bandwidth becomes an issue later, consider:
1. Compressing videos further
2. Uploading to YouTube/Vimeo as unlisted videos
3. Using a CDN service

---

## 🔧 Troubleshooting

### "Push rejected - file too large"
Run: `git lfs migrate import --include="*.mov,*.mp4"`

### Site not updating after push
- Clear browser cache (Ctrl+Shift+R)
- Wait 2-3 minutes for GitHub Pages to rebuild
- Check GitHub Actions tab for build status

### Videos won't play
- Check browser console for errors (F12)
- Verify video files uploaded successfully to repo
- Some browsers may struggle with .mov files (use .mp4 when possible)

---

## 📧 Need Help?
If you encounter issues during deployment, check:
1. GitHub repository settings
2. Git LFS is tracking files: `git lfs ls-files`
3. GitHub Pages build status in Actions tab
