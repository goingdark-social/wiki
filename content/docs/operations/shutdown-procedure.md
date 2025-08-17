---
title: Shutdown Procedure
weight: 40
toc: true
reading_time: false
pager: true
---

The team doesn't plan to shut down, but things might change. The goal is to avoid a single point of failure.

If the service ever shuts down:

### Communication timeline

- Three months: initial announcement.
- One month: reminder.
- Three weeks: instructions reposted.
- Two weeks: final warning.
- Final week: reminders every day.

### Member steps

- Export data.
- Migrate account.
- Set email forwarding.

### Technical plan

1. Close new registrations upon announcement.
2. Enter read-only mode.
3. Run `tootctl self-destruct`.
4. Wait for federated deletes.
5. Decommission hosting.
