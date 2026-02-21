# Thymer Search Query Language

Reference for writing search queries in Thymer — used in the Search panel, live query blocks, saved/pinned searches, and collection filters.

---

## Basics

Type words to search. Adjacent terms are combined with AND automatically.

```text
meeting notes
```

Finds items containing both "meeting" and "notes".

Use quotes for exact phrases:

```text
"release notes"
```

### Boolean operators

- `AND` (or `&&`) — both sides must match
- `OR` (or `||`) — either side must match
- `NOT` (or `!`) — negate the next term

```text
@task AND @overdue
@important OR @starred
NOT @done
```

Adjacent terms without an explicit operator are joined with AND:

```text
@task @overdue
```

…is the same as `@task AND @overdue`.

### Parentheses

Use parentheses to control grouping:

```text
@due and (@today or @overdue)
(@task and @overdue) or ("release notes" and @mention)
```

Unclosed parentheses are automatically closed at the end of the query, so results stay stable while you type.

---

## Hashtags

### Exact match

```text
#ideas
```

Matches items tagged `#ideas`.

### Prefix match

End a hashtag with `/` or `-` to match all tags under that prefix:

```text
#project/
```

Matches `#project/alpha`, `#project/beta`, `#project/alpha/ideas`, etc.

---

## `@` filters (standalone)

A standalone `@` filter is a keyword that acts as a condition on its own — no operator or value needed.

### Task status

| Filter | Matches |
|---|---|
| `@task` | Any task |
| `@todo` | Incomplete tasks (not done) |
| `@done` | Completed tasks |
| `@due` | Tasks with a due date that aren't done |
| `@overdue` | Tasks whose due date is in the past |
| `@assigned` | Tasks assigned to someone (has a mention) |
| `@unassigned` | Tasks not assigned to anyone |
| `@scheduled` | Tasks on someone's journal |

### Task flags

| Filter | Matches |
|---|---|
| `@inprogress` (or `@wip`) | In progress |
| `@waiting` | Waiting |
| `@billing` | Billable |
| `@important` | Important |
| `@discuss` | Discuss |
| `@alert` | Alert |
| `@starred` | Starred |

### Item types

| Filter | Matches |
|---|---|
| `@document` (or `@page`, `@record`) | Pages / documents |
| `@heading` | Headings |
| `@text` | Text blocks |
| `@quote` | Block quotes |
| `@list` | List items |
| `@image` | Images |
| `@file` | File attachments |

### Users and mentions

| Filter | Matches |
|---|---|
| `@me` | Items that mention you |
| `@mention` | Items that mention anyone |
| `@alice` | Items that mention user "alice" |

User names are fuzzy-matched — `@John` will find a user named "John" or "john".

### Dates and times

If the text after `@` can be parsed as a date or time, it becomes a date filter. Items match when any of their dates fall within the range.

**Relative dates:**

```text
@today
@tomorrow
@yesterday
```

Abbreviations work: `@tod`, `@tom`, `@yes`.

**Weekdays** (next occurrence):

```text
@monday
@tue
@wed
```

**With modifiers:**

```text
@"next monday"
@"last friday"
@"-tuesday"
```

`-` before a weekday means "last" (most recent past occurrence).

**Month and day:**

```text
@jan1st
@"aug 13"
@march
```

A bare month name matches the whole month.

**Relative durations:**

```text
@"5 days"
@"2 weeks"
@"in 1 year"
@"5 days ago"
```

**Named ranges:**

```text
@thisweek
@nextweek
@lastweek
@thismonth
@thisyear
```

**Week numbers:**

```text
@"week 10"
@"week 1 of 2025"
```

**Explicit ranges:**

```text
@"monday to friday"
@"1pm to 3pm"
```

**Dates with times:**

```text
@"tomorrow 3pm"
@"3pm wed"
```

**Time of day keywords:**

`noon`, `midnight`, `morning` (6am–12pm), `afternoon` (12–5pm), `evening` (5–10pm), `night` (10pm–4am)

**ISO format:**

```text
@2025-01-01
@"2025-01-01 15:00"
```

### Collections

If the text after `@` matches a collection name, it filters to items in that collection. Quote names that contain spaces:

```text
@"Road Map"
@"Internal Wiki"
```

### How `@something` is resolved

When `@something` isn't a recognized keyword (like `@overdue` or `@task`), Thymer tries to interpret it in this order:

1. **Date/time** — e.g. `@tomorrow`, `@"next week"`
2. **User** — e.g. `@alice`, `@John`
3. **Collection** — e.g. `@"Road Map"`

If none match, it's an error.

---

## `@` filters with operators (key/value)

You can use comparison operators to filter on specific fields:

```text
@key operator value
```

### Operators

| Operator | Meaning |
|---|---|
| `=` | Equals (or "contains" for text fields) |
| `!=` | Not equal |
| `<`, `<=`, `>`, `>=` | Comparison (numbers, dates) |

### Built-in keys

These filter on item metadata:

| Key | Type | Example |
|---|---|---|
| `@created_at` | date | `@created_at >= "yesterday"` |
| `@modified_at` | date | `@modified_at > "last week"` |
| `@created_by` | user | `@created_by = "alice"` |
| `@modified_by` | user | `@modified_by = "jd"` |
| `@text` | text | `@text = "encryption"` |
| `@type` | text | `@type = "task"` |
| `@date` | date | `@date = "today"` |
| `@due` | date | `@due <= @today` |
| `@time` | time | `@time = "3pm"` |
| `@mention` | user | `@mention = "alice"` |
| `@scheduled` | user | `@scheduled = @me` |
| `@hashtag` | text | `@hashtag = "ideas"` |
| `@link` | text | `@link = "github"` |
| `@collection` | text | `@collection = "Road Map"` |
| `@guid` | text | `@guid = "16T73YHZDJMYSW32RZSCC5T4P9"` |
| `@pguid` | text | Parent document GUID |
| `@rguid` | text | Record GUID |
| `@backref` | GUID | `@backref = "SOMEGUID"` |
| `@linkto` | GUID | `@linkto = currentpage` |

Alternative spellings are accepted: `@createdat`, `@modifiedat`, `@createdby`, `@modifiedby`.

The `@linkto` key also supports `currentpage` and `currentcollection` as special values.

### Collection property filters

Filter on custom fields defined in a collection using `@Collection.Field`:

```text
@Project.status = "In progress"
@Project.owner = "John"
@Project.points >= 3
@Project.tag = "frontend"
```

Quote names that contain spaces:

```text
@"Internal Wiki"."Last Reboot" >= "2026-01-01"
```

**Empty/unset checks** — compare to an empty string with `=` or `!=`:

```text
@Project.owner = ""
@Project.owner != ""
```

#### How operators behave per field type

| Field type | Allowed operators | Behavior |
|---|---|---|
| Choice | `=`, `!=` | Matches choice label (case-insensitive) |
| User | `=`, `!=` | Matches user name/handle (fuzzy) |
| Record link | all | Uses record link matching |
| Hashtag | `=`, `!=` | Exact match; `#prefix/` does prefix match |
| Datetime | all | Compares as date ranges |
| Number | all | Numeric comparison |
| Text, URL | all | `=` is "contains" match |
| File, Image | all | `=` is "contains" match (on filename) |

All text matching is case-insensitive.

---

## The Journal and scheduling

Each user has a **Journal** — a calendar for planning work day by day. Drag a task onto a journal page to "schedule" it.

`@due` and `@scheduled` are different things:

- **`@due`** — the task has a deadline (a date set on the task itself)
- **`@scheduled`** — the task appears on someone's journal (planned for a day)

A task can be due without being scheduled, scheduled without being due, or both.

```text
@scheduled = @me                           Tasks on your journal
@scheduled = @alice                        Tasks on alice's journal
@todo and not @scheduled                   Incomplete tasks not yet planned
@todo and (@me or @scheduled = @me)        Your tasks (mentioned or on your journal)
```

---

## Example queries

```text
@due and @tomorrow
```

Tasks due tomorrow.

```text
@due and (@today or @important or @overdue)
```

Tasks that are due today, flagged important, or overdue.

```text
@Project.status = "In progress" AND @overdue AND @John
```

Overdue tasks assigned to John in projects that are in progress.

```text
#ideas @todo
```

Incomplete tasks tagged `#ideas`.

```text
#project/ @task @overdue
```

Overdue tasks tagged with anything under `#project/…`.

```text
@overdue @unassigned
```

Overdue tasks not assigned to anyone.

```text
@modified_at >= "yesterday" @page
```

Pages modified since yesterday.

```text
@task @thisweek
```

Tasks with dates this week.

```text
(#upnext or @important) and not @done
```

Flagged items that aren't completed.

```text
@link = "github"
```

Items containing a link with "github" in it.

---