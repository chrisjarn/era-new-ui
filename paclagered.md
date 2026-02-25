2. Package Detail Page (/packages/{slug}) — Redesigned
2.1 Hero Section — Single Layout
Drop the 5-variant hero system. Use one consistent layout across all packages.
Two-column layout (based on current "Default" variant):

Left side (~55%): Breadcrumb (Home → Packages → Package Name), package name as h1, short description, venue badge ("at Mercure Perth" or "at Cucina on Hay"), "Ideal For" tags as chips, two CTA buttons: "Enquire Now" (primary) + "Download PDF" (secondary, only if PDF exists). If a sale/promo is active, show the promo badge here.
Right side (~45%): Hero image, full height of the section. If a video preview exists, play it looping (muted) in place of the static image.

Mobile: Stack — image on top (full width, ~40vh), content below.
The hero should NOT include pricing tier tabs. Move those to the dedicated pricing section below. The hero's job is: name, vibe, venue, and a way to enquire.
2.2 Page Layout Structure
The detail page has three distinct layout zones:
Zone 1: Hero — Full Width
The two-column hero (content left, image right) spans the full page width. No sidebar. This is the entry point — package name, description, venue, CTAs. Described in 2.1 above.
Zone 2: Main Content + Sidebar — Two Columns
After the hero, the page splits into two columns on desktop:

Left column (~65%) — Sections A, B, C, and D stack vertically here. This is where someone reads about and evaluates the package.
Right column (~35%) — The sticky sidebar. It begins at the top of this zone and sticks as the user scrolls through A, B, C, and D. This keeps the price and "Enquire Now" button visible at all times while someone is reading the package details. The sidebar unsticks / detaches before hitting Section E.

Vertical spacing between sections within the left column: ~60–80px. Enough breathing room that each section feels distinct, but not so much that the page feels padded.
Zone 3: Full Width Again
Sections E and F break out of the two-column layout and go full width. These are cross-sell and conversion sections — they need the space, and the visual break from the two-column zone signals "you've finished reading about the package, here's what to do next."
On mobile: Everything stacks into a single column: Hero → A → B → C → D → E → F. No sidebar. The sticky footer bar (price + "Reserve Now") replaces the sidebar's function, appearing once the user scrolls past the hero.

2.3 Typography Hierarchy
The page should feel editorial and warm, not corporate. Heading sizes step down clearly so someone scanning the page can distinguish page title → section landmarks → sub-labels without thinking about it. The h1 should clearly dominate — if h2s compete with it, the page feels like it has multiple titles.
Desktop sizes:
ElementTagSizeWeightNotesPackage name (hero)h148–56pxBoldDisplay font. The single largest text on the page. Not uppercase — mixed case reads better at this size for longer package names like "Accomm + Event Bundle".Section headingsh228–32pxSemi-bold or bold"About", "What's Included", "Pricing", "The Venue", "Related Events", "Book [Package Name]". Consistent size across all sections. These are landmarks someone scans when scrolling — they should be visible but not compete with the h1.Sub-labels within sectionsh320–22pxSemi-boldInclusion titles in the What's Included grid (e.g. "Premium Beverages", "Canapes Selection"), tier label in pricing section (e.g. "2 Hour Package"), venue name in Section D. Secondary labels within a section.Body textp16–18pxRegularThe about description, tier details, venue description. 18px is preferable for the longer editorial passages in Section A — it reads more comfortably than 16px for multi-paragraph text.Small metadataspan14pxRegular or medium"Ideal For" chip text, sidebar detail labels ("Group Size", "Booking Notice"), breadcrumb, "From" prefix on price, fine print and notes.Price display (sidebar + pricing section)—36–40pxBoldNot a heading tag — it's a styled number. Large and prominent so it's readable at a glance in the sidebar and in Section C.Sidebar heading labels—13–14pxMedium, uppercase or small-capsThe labels above sidebar details: "VENUE", "GROUP SIZE", "VALID UNTIL". Small, muted, structured — these are metadata labels, not content.
Mobile sizes — scale down proportionally:
ElementMobile Sizeh1 (package name)32–36pxh2 (section headings)24–26pxh3 (sub-labels)18–20pxBody text16px (don't go smaller)Small metadata13–14pxPrice display32–36px
Line heights: Body text at 1.5–1.6 for readability. Headings at 1.1–1.2 (tighter, since they're short). Small metadata at 1.4.
Colour: Headings in the primary dark text colour (near-black, not pure #000). Body text slightly softer if desired (dark grey). Metadata labels in a muted grey. Price in the primary dark or accent colour — it should pop but not clash. Avoid coloured headings unless it's the accent on a specific element like the venue badge.

2.4 Section Details (Top to Bottom)
Section A: "About This Package"

h2: "About" or "About This Package"
Long description from pageDescription (fallback to description). Body text at 18px.
Written as prose, not bullet points. Should read like an editorial description — what the atmosphere is like, what guests can expect, why it's special.
"Ideal For" tags displayed below the text as small chips (14px text, pill-shaped background).
This section sits in the left column with the sidebar visible to the right. No background colour — default page background.


Section B: "What's Included"

h2: "What's Included"
Visual grid showing what the package includes. Each item has:

Icon (from CMS) — roughly 40–48px, muted colour or the site accent
h3: Item title (e.g. "Canapes Selection", "Premium Beverages", "Dedicated Host")
Body text: brief description (1–2 lines, 16px)


Layout within the left column: 2-column grid. Each item is a compact card or clean icon+text block with consistent spacing. Should feel generous — show what the guest is getting. Single column on mobile.
Optional: subtle background colour (very light grey or warm off-white) or a subtle top border to visually separate from Section A.


Section C: Pricing & Tiers

h2: "Pricing" or "Choose Your Experience"
Tier selector tabs (if multiple tiers): animated pill buttons. The tab labels (e.g. "1 Hour", "2 Hours", "3 Hours") at 14–16px. Active tab gets accent colour fill, inactive tabs are outlined or muted.
Below the active tab:

Price — 36–40px bold. "From $72 per person" or "$95 per guest". The "From" prefix and "per person" unit in smaller text (14px) next to or below the price number.
Inclusions for this tier: canapes, beverages, additional inclusions listed as body text or a clean structured list. Each inclusion category could use an h3 label (e.g. "Beverages", "Canapes") at 20px with the details as body text below.
Minimum group size, notes, fine print — in the small metadata style (14px, muted).
"Enquire About This Package" CTA button — full width of the left column, primary style.


Tier content transitions smoothly when switching tabs (fade or slide).
If only one tier: No tabs. Just the pricing block directly.
If no price / "Contact for pricing": Show inclusions, swap CTA text to "Request a Quote."
This section sits in the left column. Consider a subtle background card or border to frame the pricing content — it should feel like a contained "pricing panel" within the page.


Section D: "The Venue"

h2: "The Venue" or the venue name itself as the h2
Venue image — wide within the left column, roughly 16:9 or 3:2 aspect. Shows the actual space set up for an event.
h3: Venue name (if not used as h2)
Body text: brief description of the space, what it's like, capacity info, layout options.
Location detail: address, proximity to transport or landmarks. Small metadata style.
This is the last section in the two-column zone. After this, the sidebar detaches.


Section E: "Related Events"
This section breaks out to full width. No sidebar.

Subtle background colour (light grey, warm off-white, or muted brand tone) to visually separate it from the two-column content above.
h2: "Upcoming Events" or "Perfect For These Events" — centered.
3–4 event cards in a horizontal row (or scrollable carousel on mobile). Standard event card size — not full-detail, just enough to identify the event and click through.
"View All Events →" link below, centered.
If no events are linked to this package (reverse query from relatedPackages returns empty), this entire section is hidden. No empty state.
Vertical padding: ~80–100px top and bottom to give it room as a distinct full-width band.


Section F: Bottom CTA
Full width. No sidebar.

Background colour: darker than Section E — either the site's dark brand colour or a warm dark grey. White or light text on dark background. This should feel like a strong closing statement.
h2: "Book [Package Name]" — centered, 28–32px, white/light text.
Subline: body text, centered, 16–18px. Custom CTA text from CMS, or "Get in touch with our events team to discuss your requirements."
Two buttons centered: "Enquire Now" (primary, filled) + "Download PDF" (secondary, outlined). Buttons sit side by side on desktop, stacked on mobile.
Below the buttons: phone number and email for the events team in small metadata style. Some people booking corporate functions prefer to call — give them the option.
Vertical padding: ~80–100px top and bottom.


2.5 Sidebar (Desktop Only)
The sidebar lives in the right column of Zone 2, alongside Sections A through D. It sticks to the viewport as the user scrolls, then detaches before reaching Section E.
Width: ~300–350px.
Contents (top to bottom):

Price — 36–40px bold. "From $72 pp" using lowest tier price. The "From" in small text (14px) above or inline. If multiple tiers exist, this shows the lowest — the user gets the full breakdown in Section C.
"Enquire Now" button — full width of the sidebar, primary style, prominent. Opens the booking drawer pre-filled with this package.
"Download PDF" button — full width, secondary/outline style. Only renders if a PDF is attached. Sits below the enquire button with ~12px gap.
Divider — a subtle horizontal line or spacing break.
Details grid — a stack of label + value pairs:

Venue: "Mercure Perth" (or whichever) — could be a link to the venue section on page or to a venue page
Group Size: "Minimum 25 guests"
Duration: "1–3 hours"
Valid Until: formatted date (if set, otherwise omit)
Booking Notice: "48 hours advance notice required"
Availability: "Subject to venue availability"
Labels at 13–14px uppercase muted grey. Values at 15–16px normal weight.


"← All Packages" link — at the bottom of the sidebar, small text (14px), links back to /packages.

Sticky behaviour: The sidebar should use position: sticky with a top offset (~24px from the top of the viewport, or below the site header). It sticks through Sections A–D. When the bottom of the sidebar would overlap Section E, it stops sticking (either by calculating the container boundary or by ending the sidebar's parent container before Section E).
Mobile: No sidebar. The sticky footer bar handles conversion — it animates in from the bottom once the user scrolls past the hero, showing the price and a "Reserve Now" button. This bar stays visible through the entire page until the user reaches Section F.
2.6 Enquiry Drawer Behaviour
Keep the current approach — all enquiry/reserve buttons open a Zustand-managed drawer pre-filled with:

Package name
Selected tier (if user has selected one)
Venue

Drawer fields:

Name, Email, Phone
Preferred date
Number of guests
Notes / special requirements
Package and tier (pre-filled, visible but not editable)

This is a lead capture form, not a booking engine. Events team follows up. Fewer fields = more submissions.

3. PackagesBlock (Embedded Component)
The existing PackagesBlock that embeds on homepage and other pages should use the updated simplified cards from Section 1.4.
Keep two display modes:

Carousel (default) — horizontal scrolling cards. Good for homepage.
Grid — responsive grid. Good for dedicated sections.

Drop the "Pricing Table" mode. It reinforces the SaaS look. If there's a specific business need for side-by-side tier comparison, the detail page pricing section handles it better. If it absolutely must stay, restyle away from the SaaS aesthetic — softer colours, venue imagery, hospitality branding.

4. Visual Direction
Tone

Warm and inviting — dark backgrounds with warm lighting in imagery, not clinical whites
Premium but accessible — Mercure is mid-scale, not luxury. Should feel like great value, not intimidating
Venue-forward — images of actual spaces, food, drinks, real people enjoying themselves
Clear and scannable — someone comparing packages should quickly understand what each offers and for whom

Colour

Drop the 4-colour tier accent system from cards. Use a single site accent for CTAs and interactive elements.
Use venue-specific colours sparingly for venue badges (distinguish Mercure from Cucina from Beccaria at a glance)
Let photography do the colour work — good venue photography with warm lighting creates more visual appeal than coloured card accents
Tier colours CAN remain in the detail page pricing section to distinguish tiers, but shouldn't dominate the card presentation

Photography
The image on every card and detail page is the single most important conversion element. Images should show:

Venue space set up for an event (not empty rooms)
Food and drinks being served or presented
People enjoying themselves (even if staged)
Atmosphere — lighting, table settings, bar setups

If current images are generic or low quality, flag to Mercure as a priority investment.
Card Hover
Replace the current "background goes black, text goes white" hover with a subtle shadow lift + slight image zoom. The black-background treatment hides the photography, which is the main thing selling a hospitality experience.

5. SEO & Metadata
/packages list page

Title: "Hospitality Packages | Mercure Perth, Cucina on Hay & Beccaria Bar"
Description: Mention package types (corporate, social, sporting) and venue names
Schema: Product or Offer schema for each package

/packages/{slug} detail pages

Title: "{Package Name} | Perth Stay & Play"
Description: Package description + venue + "from $XX pp" pricing
Schema: Offer schema with pricing, location, availability

Indexable filters
If type filter uses URL params (/packages?type=sporting), either canonical back to /packages or set up as indexable filtered pages with unique titles.

6. Current Package Inventory
For Claude Code's reference, these are the four packages currently live and how they map to the new card structure:
PackageTarget BuyerVenuePriceKey DifferentiatorTeam UpSporting groups, teams travelling for eventsMercure PerthFrom $95/guestAccommodation + breakfast + dining discount + poolAccomm + Event BundleLarge corporate/social events needing rooms + function spaceMercure PerthContact UsMulti-day, function spaces + breakout areasSundownerAfter-work corporate social, networking, team milestonesMercure Perth (bar spaces)From $79 pp (tiered: 1hr/2hr/3hr)Canapes + beverages, the only tiered packageDay DelegateMeeting planners, corporate conferencesMercure PerthFrom $72 ppFull-day catering + AV, the most traditional conference product
Note: All four packages are currently at Mercure Perth. When Cucina on Hay and Beccaria Bar packages are added, the venue badge and filter become more important. Build the venue distinction now so it's ready.

7. CMS Changes
Simplification

Remove heroStyle field — no longer needed with single hero layout
Review detailSections array (visibility/order/background per section). If every package uses the same section order, remove it and hardcode the layout. Only keep if editors genuinely need to reorder sections per package.

Content guidance for editors

Every package MUST have a good image (not a placeholder)
Every package SHOULD have at least one pricing tier with a real price
Every package SHOULD have "Ideal For" tags set
Every package SHOULD have a venue/location set
Featured/primary packages limited to 1–2 at a time