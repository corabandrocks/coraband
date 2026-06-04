# CORA Band Website

Rock band website for Cora from Chicago's northwest suburbs.

## Features

- **Dual Theme System**: Toggle between two distinct visual themes
  - **Dark Theme** (Default): Clean, brutal black & red aesthetic
  - **Grunge Theme**: Street art-inspired olive green & gold with textured effects
- Responsive mobile navigation
- Scroll spy navigation highlighting
- Smooth scroll animations
- Upcoming shows section
- Bandcamp music embeds (placeholders ready)
- Band member bios
- Social media links
- Email contact

## Theme Toggle

Click the floating button in the bottom right corner to switch between themes. Your preference is saved automatically in browser localStorage.

### Dark Theme
- Background: Pure black (#0a0a0a, #000000)
- Accent: Blood red (#cc0000)
- Style: Clean, high-contrast, brutal

### Grunge Theme  
- Background: Dark gray (#1a1a1a, #2a2a2a)
- Accent: Gold/yellow (#E8A835) with olive green (#6B7F54)
- Style: Textured, street art, grunge aesthetic
- Enhanced: Offset shadows, thicker borders, aggressive styling

## Setup for GitHub Pages

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Set source to main branch
4. Configure custom domain: cora.band
5. Enable HTTPS after DNS propagates

### DNS Configuration

Add these A records to your domain:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## Customization

### Update Show Information
Edit show dates/venues in [index.html](index.html) under the `#shows` section.

### Add Bandcamp Embeds
Replace the `.embed-placeholder` divs with actual Bandcamp iframe code:
```html
<iframe style="border: 0; width: 100%; height: 120px;" 
  src="https://bandcamp.com/EmbeddedPlayer/album=ALBUM_ID/size=large/bgcol=0a0a0a/linkcol=E8A835/transparent=true/" 
  seamless>
</iframe>
```

### Update Band Member Info
Edit member names, roles, and bios in the `#band` section.
Add member photos to `/images/` folder.

### Social Links
Update social media URLs in the footer `#contact` section.

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling with CSS variables for themes
- `script.js` - Navigation, theme toggle, scroll effects
- `CNAME` - Custom domain configuration
- `.nojekyll` - Bypass Jekyll processing
- `images/` - Band member photos and assets

## Local Development

Simply open `index.html` in a web browser to preview locally.

---

© 2026 CORA. All rights reserved.
