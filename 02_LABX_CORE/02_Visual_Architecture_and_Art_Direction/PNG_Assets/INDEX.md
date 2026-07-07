# LabX PNG Asset Library

428 unique images extracted from the LabX Con Master Deck 2026 (149 slides), all converted to PNG and sorted by function. File names carry their source: `s13` means the image first appears on slide 13, `master` means it lives on the slide master or layout (these are the recurring brand marks).

| Folder | Contents | Notes |
|---|---|---|
| `01_Logos_and_Recurring_Marks/` | 21 files | LabX and BUBU.COM wordmarks plus marks reused across 15+ slides. Most are white-on-transparent; view against a dark background. |
| `02_Symbols_and_Icons/` | 9 files | Small UI symbols, badges, and decorative icons under 20 KB. |
| `03_Moodboard_Earthbound/` | 14 files | Sustainability universe references (slides 12-13, 66, 68, 97, 136-138). |
| `04_Moodboard_NextVerse/` | 5 files | Technology universe references (slides 14-15, 70-71, 96, 140-141). |
| `05_Moodboard_Chromanize/` | 15 files | Colorful universe references (slides 16-17, 61, 64, 98, 142-143). |
| `06_Moodboard_TheRoots/` | 8 files | Legacy universe references (slides 18-19, 62, 69, 144-145). |
| `07_Moodboard_Lucidia/` | 10 files | Fantasy universe references (slides 20-21, 63, 65, 67, 119). |
| `08_Moodboard_MixMaterials/` | 4 files | Candidate sixth universe, industrial (slides 146-147). |
| `09_Brand_and_Collaborator_Logos/` | 114 files | Logos and profile images of the brand pool, design houses, artists, and F&B collaborators (wishlist slides 39-44, 49-54). |
| `10_Media_Logos/` | 49 files | Media wishlist logos: lifestyle, community, news (slides 45-46, 55-56, 110). |
| `11_Venue_and_Layout/` | 6 files | PIM 3 venue photos and layout references (slide 9). |
| `12_Journey_and_Experience/` | 15 files | Visitor journey and participatory-culture visuals (slides 8, 99, 104). |
| `13_Gallery_and_People/` | 18 files | LabX Gallery artworks, board of advisors, and people shots (slides 27, 78, 121, 139). |
| `14_Misc_Assets/` | 140 files, local-only | Uncategorized slide backgrounds and decor. Gitignored to keep the repo lean; the originals stay in the local pptx and on this machine. |

Extraction rules used: byte-level dedupe (md5), category by slide-to-theme mapping, JPG/GIF converted to PNG via sips. Some small pure-white shapes from slide decor are included in the moodboard folders; delete on sight if they get in the way.

Source of truth: `../../01_Brand_DNA_and_Master_Decks/LABX_MasterDeck_LabXCon2026_Refine.pptx` (local-only, 217 MB).
Generated: 2026-07-07. Cleanup 2026-07-07: 33 blank PNGs (pure white or fully transparent, slide-decor leftovers) detected via pixel scan and removed.
