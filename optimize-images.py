#!/usr/bin/env python3
"""
Laksar Properties — image optimization pipeline (Pillow).

Converts master JPGs in assets-src/ into web-optimized WebP derivatives
inside public/images/. Masters are never overwritten (spec: keep masters
separate from web assets).

Usage:  python3 scripts/optimize-images.py
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets-src")
OUT = os.path.join(ROOT, "public", "images")

# (source file, output relative path, max width, quality)
JOBS = [
    ("hero-poster.jpg",          "hero-poster.webp",                    1920, 80),
    ("cat-plots.jpg",            "categories/residential-plots.webp",   1200, 80),
    ("cat-land.jpg",             "categories/agricultural-land.webp",   1200, 80),
    ("cat-houses.jpg",           "categories/houses.webp",              1200, 80),
    ("cat-commercial.jpg",       "categories/commercial.webp",          1200, 80),
    ("prop-plot-nh334.jpg",      "properties/plot-nh334.webp",          1400, 80),
    ("prop-plot-colony.jpg",     "properties/plot-colony.webp",         1400, 80),
    ("prop-land-khanpur.jpg",    "properties/land-khanpur.webp",        1400, 80),
    ("prop-house-3bhk.jpg",      "properties/house-3bhk.webp",          1400, 80),
    ("prop-house-kothi.jpg",     "properties/house-kothi.webp",         1400, 80),
    # commercial listing reuses the market-road master (same scene type)
    ("cat-commercial.jpg",       "properties/commercial-market.webp",   1400, 80),
    # about page: alternate crop of the market-road master
    ("cat-commercial.jpg",       "about/about-local.webp",              1400, 80),
    ("cat-houses.jpg",           "about/about-houses.webp",             1400, 80),
    # page hero banners (reuse category masters with wide crop)
    ("cat-land.jpg",             "banners/land-banner.webp",            1920, 78),
    ("cat-houses.jpg",           "banners/buy-banner.webp",             1920, 78),
    ("cat-plots.jpg",            "banners/sell-banner.webp",            1920, 78),
    ("cat-commercial.jpg",       "banners/contact-banner.webp",         1920, 78),
]


def convert(src_name: str, out_rel: str, max_w: int, quality: int) -> None:
    src_path = os.path.join(SRC, src_name)
    out_path = os.path.join(OUT, out_rel)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with Image.open(src_path) as im:
        im = im.convert("RGB")
        if im.width > max_w:
            h = round(im.height * max_w / im.width)
            im = im.resize((max_w, h), Image.LANCZOS)
        im.save(out_path, "WEBP", quality=quality, method=6)
    print(f"  {out_rel:44s} {im.width}x{im.height}  {os.path.getsize(out_path)//1024} KB")


def make_og() -> None:
    """Open Graph 1200x630 center crop from the hero master (JPEG for OG safety)."""
    src_path = os.path.join(SRC, "hero-poster.jpg")
    out_path = os.path.join(OUT, "og-image.jpg")
    with Image.open(src_path) as im:
        im = im.convert("RGB")
        target = (1200, 630)
        scale = max(target[0] / im.width, target[1] / im.height)
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
        left = (im.width - target[0]) // 2
        top = (im.height - target[1]) // 2
        im.crop((left, top, left + target[0], top + target[1])).save(out_path, "JPEG", quality=85)
    print(f"  og-image.jpg                                 1200x630  {os.path.getsize(out_path)//1024} KB")


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    print("Optimizing images:")
    for job in JOBS:
        convert(*job)
    make_og()
    print("Done.")


if __name__ == "__main__":
    main()
