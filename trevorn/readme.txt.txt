TREVORN Landing Page — Project README / Development Memory

This document is the current project handoff guide for the TREVORN landing page.

Use this file whenever continuing the project in a new or temporary ChatGPT conversation.

For best results, attach this README together with the latest:

index.html

css/style.css

js/script.js

The attached HTML, CSS, and JavaScript are always the source of truth if they differ from this README.

1. Project Status

The TREVORN landing page is currently considered a stable responsive baseline.

Completed major areas:

Desktop layout

Tablet responsiveness

Mobile responsiveness

Hero carousel

Three animated product showcase sections

Contact form

Responsive footer

Sticky scroll-to-top control

Product scroll cue

Full-screen opening loader

Code cleanup / CSS organization pass

Future edits should be incremental and should preserve all existing approved behavior unless a requested change specifically affects it.

2. Project Folder Structure

Recommended project structure:

trevorn/
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── assets/
    └── images/
        ├── RED_Logo01.png
        ├── hero_image_01.jpg
        ├── hero_image_02.jpg
        ├── hero_image_03.jpg
        ├── product_0101.png
        ├── product_0102.png
        ├── product_0201.png
        ├── product_0202.png
        ├── product_0301.png
        ├── product_0302.png
        └── other existing image assets

Keep these internal paths unchanged:

<link rel="stylesheet" href="css/style.css">
<script src="js/script.js"></script>

Do not rename image assets unless explicitly requested.

3. Technology Stack

The site currently uses:

HTML5

CSS3

JavaScript

jQuery

Bootstrap 5

GSAP

ScrollTrigger

These libraries are already part of the approved implementation.

Do not remove, replace, or migrate them during normal revisions unless specifically requested.

4. Brand / Visual Direction

Primary red:

#A00808

General style:

Black / dark backgrounds

Red accent color

White / off-white typography

Performance / fitness aesthetic

Strong contrast

Square and angular UI elements

Red CTA buttons

White internal corner framing

Minimal rounded UI

Motion should feel deliberate and premium

The site should feel bold, performance-driven, modern, and clean.

5. Full-Screen Opening Loader

The site now includes a full-screen loader directly inside the main page.

There is currently NO separate loader.html.

The loader is integrated into:

index.html

css/style.css

js/script.js

Loader Duration

Approximate loader duration:

5000

or about:

5 seconds

Loader Content

The loader currently contains only:

Animated shaker / tumbler icon

TREVORN logo

Red loading progress bar

Removed loader content:

percentage number

LOADING PERFORMANCE text

decorative top-left frame

decorative bottom-right frame

Shaker / Tumbler Icon

The shaker/tumbler icon is CSS-drawn.

No separate shaker image asset is required.

It appears above the TREVORN logo.

Behavior:

continuously shakes while the loader is visible

should stop naturally when the loader is removed

should remain responsive on desktop, tablet, and mobile

Do not replace it with an external image or icon library unless specifically requested.

Loader Exit Behavior

After approximately 5 seconds:

loader receives exit class
→ loader fades/transitions out
→ body loading lock is removed
→ loader element is removed
→ ScrollTrigger.refresh() runs

This refresh is important because GSAP product showcase calculations may otherwise be incorrect after the full-screen loader disappears.

Loader Body State

The page body begins with:

<body class="is-loading">

The loader script removes:

is-loading

when the loader begins exiting.

Preserve this behavior.

Loader Cleanup Rule

If loader content is changed in the future, remove old unused loader CSS selectors instead of stacking new overrides.

Possible old selectors to watch for if they reappear:

.site-loader__frame
.site-loader__status
.site-loader__label
.site-loader__percent

The current preferred loader should only keep selectors actually used by:

loader wrapper

loader inner layout

shaker

shaker parts

logo

track

progress bar

exit state

6. Header & Navigation

The header is sticky and black.

Desktop navigation contains:

HOME
DARK CHOCOLATE
VANILLA WAFER
AVOCADO ICE CREAM
CONTACT US
BUY NOW

Desktop navigation spacing has already been tuned.

Tablet/mobile navigation switches to the responsive mobile layout.

Do not change approved spacing or breakpoint behavior unless specifically requested.

7. Hero Carousel

Current carousel order:

Slide 1 — PERFORMANCE

Kicker:

PERFORMANCE

Heading:

Anytime. Anywhere. Stronger.

Body:

Download the TREVORN App to track your training, measure your improvements, and keep your fitness journey moving forward.

Benefits:

DAILY GOALS
DAILY WORKOUT
TIME SPEND

Icons:

check icon

dumbbell / barbell icon

clock icon

CTA:

DOWNLOAD THE APP

Slide 2 — UNLEASH

Kicker:

UNLEASH

Heading:

Strength Starts Here

Body:

TREVORN combines extra protein and essential amino acids to support your muscles, recovery, strength, and active lifestyle.

CTA:

BUY NOW

Slide 3 — OWN IT

Kicker:

OWN IT

Heading:

Built, Not Given.

Body:

Champions are built through discipline and consistency, and TREVORN is with you throughout every step of the journey.

CTA:

BUY NOW

Keep TREVORN uppercase in user-facing copy.

8. Product Showcase Sections

There are three animated showcase sections:

Dark Chocolate

Vanilla Wafer

Avocado Ice Cream

Each product section includes:

background / gradient

primary product image

secondary / flavor image

product logo

heading

body copy

ORDER NOW CTA

flavor-specific effect

SCROLL TO EXPLORE cue

Shared body copy:

TREVORN PROTEIN PROVIDES 30 G PROTEIN PER SERVING AND IT'S ASPARATAME FREE.

Desktop line behavior may differ from mobile/tablet based on responsive styling.

9. Product Image Naming

Primary product images:

product_0101.png
product_0201.png
product_0301.png

Secondary / flavor images:

product_0102.png
product_0202.png
product_0302.png

These are controlled separately in responsive CSS.

Important:

Do not resize only the parent layer when the goal is to change the visible PNG size.

The actual image element should be adjusted when sizing needs to change.

10. Product GSAP Animation Rules

The product showcases use GSAP + ScrollTrigger.

The animation is scrubbed, meaning scroll position controls the animation.

Primary Product Package

Approved movement:

bottom-right → center
opacity 0 → 1

Rules:

no clipping animation on the primary product

no blur animation on the primary product

product should remain fully visible once revealed

reverse scrolling should naturally reverse the animation

Secondary / Flavor Image

Approved movement:

bottom-left → center

This layer may use:

blur

clipping

opacity

scaling

position transitions

Product Text Reveal

Current hierarchy:

logo
heading
body copy
CTA

Motion:

logo fades/rises in

heading reveals from left to right

body fades upward

CTA fades upward

Do not convert these into unrelated one-time animation systems unless explicitly requested.

11. Product-Specific Effects

Dark Chocolate

Uses melting chocolate effects:

melt blobs

drip shapes

Important layout rule:

The chocolate dip/drip visual must reach behind the black header on:

desktop

tablet

mobile

It should not appear visibly cut off below the header.

Do not move the entire product content behind the header just to fix the drip.

Only the intended chocolate effect should visually extend to the top.

Vanilla Wafer

Uses:

bite shapes

crumb particles

crunch-style motion

Avocado Ice Cream

Uses:

green scoop/orb effects

green trail effect

Current avocado background and particle colors have already been tuned for readability.

Preserve approved contrast unless specifically requested.

12. SCROLL TO EXPLORE Cue

Every product showcase has a scroll indicator near the top.

Current visual:

mouse outline

red animated wheel

text: SCROLL TO EXPLORE

small vertical motion line

Behavior:

visible in the intentionally blank initial state

fades out when product animation starts

reappears naturally when scrolling backward

centered horizontally

centered on desktop, tablet, and mobile

Mobile centering was specifically fixed.

Do not replace left: 50% + translateX(-50%) centering with approximate offsets.

13. Responsive Product Layout

Responsive showcase behavior is intentional.

Desktop

Keep existing desktop composition.

Tablet / Mobile

Current strategy:

main product image is positioned toward the upper area

product text is toward the lower area

primary PNG sizing is independently controlled

secondary PNG sizing is independently controlled

product artwork should not cover the text or CTA

scroll cue remains centered

chocolate drip stays behind the header

product content remains readable

Do not globally scale all image layers to solve one image problem.

Primary and secondary artwork must remain independently adjustable.

14. Contact Section

Current style:

black background

red heading

white text

boxed text inputs

boxed textarea

red CTA

Fields:

Name
Email
Message

CTA:

SUBMIT

Preserve current responsive behavior unless specifically requested.

15. Footer

The footer has a unified black content panel with red framing / footer treatment.

Desktop Order

TREVORN Logo
Contact Us
Our Store

Tablet / Mobile Order

Contact Us
Our Store
TREVORN Logo

The logo must always remain last in stacked responsive layouts.

Current store copy:

Manila, Metro Manila, Philippines

Tablet/mobile spacing:

There is approximately:

30px

additional gap between:

CONTACT US
OUR STORE

Do not restore old footer content that was previously removed.

16. Scroll-to-Top Control

There is a fixed scroll-to-top control in the bottom-right corner.

Current design:

square

red border

partially transparent dark background

red CSS-drawn upward chevron

Behavior:

appears after scrolling down

smooth scrolls to top

responsive on mobile

The arrow placement has already been tuned.

Avoid replacing it with font-based > characters unless specifically requested.

17. Product Showcase Click Behavior

The product showcase sections currently support click-to-scroll-to-top behavior.

Reason:

The full-size PNG canvases can cover the visual CTA interaction area.

Existing behavior:

click anywhere in product showcase
→ smooth scroll to top

Preserve this unless explicitly requested to change.

18. CTA Design System

Buttons across:

header

hero carousel

product showcase

contact form

use a unified visual language.

Current style:

solid red fill

white text

no traditional external border

white mirrored / opposite corner L-shape detail

hover glow / scan behavior

Do not create separate button styles unless requested.

19. CSS Organization Rules

The CSS has already gone through an organization pass.

Keep future CSS grouped into logical sections and breakpoint groups.

Preferred overall order:

1. Variables / global
2. Loader
3. Header
4. Hero
5. Product showcase core
6. Product effects
7. Product copy / CTA
8. Contact
9. Footer
10. Scroll-to-top
11. Responsive breakpoint groups
12. Reduced motion

Responsive rules should be grouped under their respective viewport queries where practical.

Preferred breakpoint organization:

max-width: 1199.98px
min-width: 992px
max-width: 991.98px
max-width: 767.98px
576px–991.98px
max-width: 575.98px
prefers-reduced-motion

Avoid repeatedly appending overrides like:

.selector { ... }

/* many lines later */
.selector { ... }

/* even later */
.selector { ... }

Instead, update the authoritative selector in the correct section or breakpoint.

20. JavaScript Organization Rules

Keep JS grouped by behavior:

1. Shared DOM references
2. Loader
3. Mobile navigation
4. Smooth links
5. Active navigation
6. Hero progress
7. GSAP product core
8. Chocolate animation
9. Vanilla animation
10. Avocado animation
11. Product initialization
12. Scroll-to-top
13. Scroll handlers
14. Resize handlers

Avoid:

duplicate event listeners

duplicate product initialization

duplicate ScrollTrigger timelines

old percentage loader logic

unused variables

revision-history comments

separate mobile/desktop logic when one responsive function is enough

Important loader JS rule:

There is no longer a loader percentage counter.

Do not re-add:

siteLoaderPercent
updateLoaderPercent()
requestAnimationFrame percentage logic

unless explicitly requested.

21. Code Cleanup Rules

HTML

Remove only:

unused elements

dead classes

obsolete attributes

duplicate markup

outdated loader markup

revision-history comments

Do not remove visually empty effect elements without confirming CSS/JS use.

CSS

Remove:

dead selectors

obsolete overrides

repeated declarations

old loader percent/text/frame styles

revision comments

unused experimental effects

Before removing a selector, verify HTML and JS dependencies.

JavaScript

Remove:

unused variables

dead functions

duplicate listeners

duplicate initialization

old loader percentage code

unnecessary comments

Do not change approved animation behavior merely to shorten code.

22. Workflow for Future Changes

For every new revision:

Attach the latest:

README

HTML

CSS

JS

Read the README first.

Inspect the attached current code.

Treat attached code as source of truth.

Identify exactly which file(s) are affected.

Make the smallest safe change.

Preserve unrelated approved behavior.

Check desktop impact.

Check tablet impact.

Check mobile impact.

Do not append unnecessary duplicate CSS overrides.

Modify existing JS behavior rather than adding competing duplicate handlers.

Return complete revised affected files unless only a snippet is requested.

Clearly state which local files should be replaced.

23. Responsive Testing Checklist

Recommended test widths:

1920px
1440px
1024px
768px
430px
390px
375px

Check:

header

navigation spacing

mobile navigation

loader centering

shaker size

shaker animation

loader logo size

loader progress bar

hero text wrapping

hero benefit icons

product image sizing

product image overlap

flavor image placement

chocolate drip top extension

scroll cue centering

product text readability

CTA clickability

contact layout

footer stack order

footer spacing

scroll-to-top positioning

horizontal overflow

ScrollTrigger timing

24. Current Loader Testing Checklist

Whenever changing the loader, verify:

1. Loader fills the entire viewport.
2. Page cannot visually flash before loader.
3. Shaker appears above logo.
4. Shaker visibly shakes.
5. Logo remains centered.
6. Progress bar remains below logo.
7. No percentage number appears.
8. No loading text appears.
9. No corner frame appears.
10. Loader exits after about 5 seconds.
11. Body scrolling is restored.
12. Loader DOM is removed.
13. ScrollTrigger.refresh() executes afterward.
14. Product showcase animation still works correctly.

25. Temporary Chat / New Chat Rule

When continuing this project in another chat:

Do NOT rely on memory alone.

Always attach:

README.md
index.html
style.css
script.js

The README explains the intended project behavior.

The attached code explains the current implementation.

If README and code conflict:

CURRENT ATTACHED CODE WINS

unless the user explicitly says otherwise.

26. Copy-Paste Starter Prompt for a New / Temporary Chat

Copy everything below into a new chat and attach:

README

HTML

CSS

JS

We are continuing development of my TREVORN landing page.

I attached:
- README.md
- index.html
- style.css
- script.js

FIRST:
Read the README completely.

The README contains the approved:
- project folder structure
- loader behavior
- shaker animation rules
- hero carousel content
- product showcase behavior
- GSAP / ScrollTrigger rules
- product image naming
- responsive layout rules
- contact section
- footer order
- scroll-to-top behavior
- CSS organization
- JavaScript organization
- revision workflow

IMPORTANT:
The attached HTML, CSS, and JavaScript are the current source of truth if anything differs from the README.

CURRENT LOADER:
The site has a full-screen loader integrated directly into index.html, style.css, and script.js.

The loader currently contains ONLY:
- a CSS-drawn shaker/tumbler icon above the logo
- the TREVORN logo
- a red loading progress bar

The loader does NOT contain:
- percentage counter
- loading text
- top-left border decoration
- bottom-right border decoration

The shaker must continuously shake while the loader is visible.

The loader stays visible for approximately 5 seconds, then:
- exits/fades out
- removes body loading lock
- removes itself from the DOM
- refreshes ScrollTrigger

DO NOT create a separate loader.html unless I explicitly ask for one.

WORKFLOW RULES:
- Do not rebuild the site from scratch.
- Preserve everything that already works.
- Make the smallest safe change.
- Do not introduce duplicated CSS overrides.
- Put responsive rules in the correct existing breakpoint section.
- Do not add duplicate JavaScript event listeners.
- Do not duplicate GSAP product timelines.
- Preserve product showcase scroll behavior.
- Preserve chocolate drip behavior behind the header.
- Preserve mobile scroll-cue centering.
- Preserve footer responsive order.
- Preserve loader behavior unless my new request specifically changes it.
- If only one file changes, revise only that file.
- If multiple files change, revise only the affected files.
- Return COMPLETE revised affected files unless I explicitly ask for copy-paste snippets.
- Before finalizing, check desktop, tablet, and mobile implications.

MY NEW REQUEST:
[PASTE MY NEW REQUEST HERE]

27. Recommended File Handoff

When starting a fresh chat, attach:

README.md
index.html
css/style.css
js/script.js

If the request involves visuals, screenshots can also be attached.

If the request involves product PNG positioning, also mention the exact asset filename.

Example:

Please adjust product_0202.png on mobile only.

This avoids confusion between:

0201 = primary product image
0202 = secondary / flavor image

28. Current Stable Baseline Principle

From this point forward:

DO NOT REBUILD.
DO NOT RESET.
DO NOT REINTRODUCE OLD CODE.
DO NOT STACK OVERRIDES UNNECESSARILY.

Instead:

INSPECT → MODIFY → TEST → PRESERVE

The goal is to keep the project stable, organized, responsive, and easy to continue across future chats.

TREVORN Maintenance Rule

Preserve what already works. Change only what is requested. Keep loader, responsiveness, animations, and code organization intact unless the user explicitly asks to change them.