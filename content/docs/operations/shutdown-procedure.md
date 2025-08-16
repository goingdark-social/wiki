---
title: Shutdown Procedure
weight: 40
toc: true
reading_time: false
pager: true
---

While we dont plan to shutdown we want to be transparent that things might change. Therefore we are looking to ensure that we are not the single point of failure. 

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
