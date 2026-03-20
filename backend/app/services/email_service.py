import asyncio
import smtplib
from email.message import EmailMessage

from app.core.config import get_settings


def render_verification_email(*, code: str, user_id: str) -> tuple[str, str]:
    subject = "Toi Duman email verification"
    html = f"""
    <html>
      <body style="margin:0;padding:32px;background:#f6f2ea;font-family:Arial,sans-serif;color:#1f2937;">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:18px;padding:32px;border:1px solid #e5ded3;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#9a7b4f;margin-bottom:12px;">
            Toi Duman
          </div>
          <h1 style="margin:0 0 12px 0;font-size:28px;line-height:1.2;color:#111827;">
            Verify your email
          </h1>
          <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#4b5563;">
            Use the confirmation code below to verify the email for user <strong>{user_id}</strong>.
          </p>
          <div style="margin:0 0 24px 0;padding:18px 20px;border-radius:14px;background:#111827;color:#ffffff;font-size:30px;font-weight:700;letter-spacing:0.22em;text-align:center;">
            {code}
          </div>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#6b7280;">
            This code expires soon. If you did not request this change, you can ignore this email.
          </p>
        </div>
      </body>
    </html>
    """
    return subject, html


def render_password_reset_email(*, code: str, user_id: str) -> tuple[str, str]:
    subject = "Toi Duman password reset"
    html = f"""
    <html>
      <body style="margin:0;padding:32px;background:#f6f2ea;font-family:Arial,sans-serif;color:#1f2937;">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:18px;padding:32px;border:1px solid #e5ded3;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#9a7b4f;margin-bottom:12px;">
            Toi Duman
          </div>
          <h1 style="margin:0 0 12px 0;font-size:28px;line-height:1.2;color:#111827;">
            Reset your password
          </h1>
          <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#4b5563;">
            Use the code below to reset the password for user <strong>{user_id}</strong>.
          </p>
          <div style="margin:0 0 24px 0;padding:18px 20px;border-radius:14px;background:#111827;color:#ffffff;font-size:30px;font-weight:700;letter-spacing:0.22em;text-align:center;">
            {code}
          </div>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#6b7280;">
            This code expires soon. If you did not request a password reset, ignore this email.
          </p>
        </div>
      </body>
    </html>
    """
    return subject, html


def _send_html_email(*, recipient: str, subject: str, html: str) -> None:
    settings = get_settings()

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = settings.smtp_from_email
    message["To"] = recipient
    message.set_content("Your email client does not support HTML messages.")
    message.add_alternative(html, subtype="html")

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as smtp:
        if settings.smtp_use_tls:
            smtp.starttls()
        if settings.smtp_user and settings.smtp_password:
            smtp.login(settings.smtp_user, settings.smtp_password)
        smtp.send_message(message)


async def send_html_email(*, recipient: str, subject: str, html: str) -> None:
    await asyncio.to_thread(
        _send_html_email,
        recipient=recipient,
        subject=subject,
        html=html,
    )
