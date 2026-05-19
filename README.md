# CutSmart Download Page

Public-facing download page for Hero Steels Limited.

## Setup

1. Create a **public** repo: `Goelrah/cutsmart-download`
2. Push this folder's contents to it
3. Enable GitHub Pages (Settings → Pages → Source: main branch, / root)
4. Upload release binaries to that repo's Releases (tag: v1.0.0)
5. Update the `RELEASE_BASE` URL in `index.html` if needed

## Result

Hero Steels accesses: `https://goelrah.github.io/cutsmart-download`

They see a branded download page with all platform options.
No source code visible. No GitHub UI. Just download buttons.

## To update download links

Edit the `links` object at the bottom of `index.html` with the actual
GitHub Release asset URLs after uploading the binaries.
