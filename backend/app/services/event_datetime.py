from datetime import date, datetime, time, timezone


SUPPORTED_DATE_FORMATS = (
    "%d.%m.%Y",
    "%Y-%m-%d",
)

SUPPORTED_TIME_FORMATS = (
    "%H:%M",
    "%H:%M:%S",
)


def parse_event_date(value: str) -> date:
    raw_value = value.strip()

    for date_format in SUPPORTED_DATE_FORMATS:
        try:
            return datetime.strptime(raw_value, date_format).date()
        except ValueError:
            continue

    raise ValueError("Invalid date format. Use DD.MM.YYYY or YYYY-MM-DD.")


def parse_event_time(value: str) -> time:
    raw_value = value.strip()

    for time_format in SUPPORTED_TIME_FORMATS:
        try:
            return datetime.strptime(raw_value, time_format).time()
        except ValueError:
            continue

    raise ValueError("Invalid time format. Use HH:MM or HH:MM:SS.")


def combine_event_datetime(*, date_value: str, time_value: str | None = None) -> datetime:
    parsed_date = parse_event_date(date_value)
    parsed_time = parse_event_time(time_value) if time_value and time_value.strip() else time(0, 0)
    return datetime.combine(parsed_date, parsed_time, tzinfo=timezone.utc)
