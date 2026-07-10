## What changed in this pass

**Cleaner UI (same tabs, less visual clutter)**
- The Demon List toolbar's creator/verifier filters, req% range, publish-date range,
  and tag chips now live behind a collapsible "▸ Filters" button instead of always
  being on screen — the list tab shows 3 rows of controls by default instead of 6+.
- The active-filter count shows on the toggle button so it's still obvious when
  filters are applied even while collapsed.

**New QOL features**
- **Saved filter presets** — inside the Filters panel, save your current
  search/sort/tag/creator/etc. combo with a name and re-apply it in one click.
- **Player progress tracker** — player profile modal now shows how many points
  you need to pass the player ranked directly above you, and how many points to
  your next 100pt milestone.
- **Bulk admin actions** — the Submit Play queue (mod view) now has checkboxes on
  pending submissions, a "select all pending" box, and Approve/Reject-selected
  buttons to clear a backlog in one action instead of one row at a time.
- **Mobile bottom nav bar** — on narrow screens, a fixed bottom tab bar
  (Home / List / Submit / Ranks / More) replaces the old corner hamburger as the
  primary way to navigate, following standard mobile app conventions. "More" opens
  the full sidebar for everything else.
- **Shareable profile cards** — player profile modal has "Copy Link" (a deep link
  that reopens that profile via `#player-<id>`) and "Share Card" (generates and
  downloads a PNG stat card with rank, points, and completions).
- **Inline video preview** — submissions in the mod queue now have a
  "▶ Preview inline" link next to "Watch submission ↗" that expands an embedded
  player right in the row (YouTube/Streamable), so mods don't have to leave the
  tab to review.

No changes to data storage, auth, or the Vercel deployment setup — see the main
README for deploy instructions.
