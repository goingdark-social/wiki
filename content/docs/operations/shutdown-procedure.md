---
title: Shutdown Procedure
weight: 40
toc: true
reading_time: false
pager: true
---

If the service ever shuts down:

### Communication timeline

- Two months: initial announcement.
- One month: reminder.
- Three weeks: instructions reposted.
- Two weeks: final warning.
- Final week: reminders every day.

### Member steps

- Export data.
- Migrate account.
- Set email forwarding.

### Technical plan

1. Close new registrations.
2. Enter read-only mode.
3. Run `tootctl self-destruct`.
4. Wait for federated deletes.
5. Decommission hosting.
6. Serve a static tombstone page.

