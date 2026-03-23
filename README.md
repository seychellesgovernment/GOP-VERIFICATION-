# Republic of Seychelles - GOP Verification Portal

Simple static verification site for GOP reference numbers.

## Files
- `index.html` - main page
- `styles.css` - site CSS
- `script.js` - logic for data loading and verification
- `gop-data.json` - dataset for GOP references

## GitHub Pages
1. Push this repository to GitHub.
2. In repository settings > Pages, choose `main` branch and `/ (root)` folder.
3. Access `https://<your-user>.github.io/<your-repo>/`

### URL auto-check
- `https://<your-site>?ref=GOP/2026/99991/1`

## Extend the GOP database
- Update `gop-data.json` with new keys and values. The verification script loads this file on each page load.

## Notes
- Works globally via static hosting (GitHub Pages, Netlify, etc.)
- Paths are relative so it works under repository subpaths like `/tree/GOP` if you use `index.html` from root deployment.
