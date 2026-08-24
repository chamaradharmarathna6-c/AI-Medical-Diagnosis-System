# Privacy-aware design

This academic prototype minimizes collected data to registration information and submitted assessment inputs. Passwords are hashed with Passlib's salted PBKDF2-SHA256; plaintext passwords are not stored. Authentication uses signed JWT tokens. Secrets and database connection strings are environment variables, with only placeholders in `.env.example`. The frontend has no database credentials.

Inputs and passwords are not logged by application code. SQL Server scripts include relational constraints and timestamps. Configured production persistence uses SQLAlchemy/pyodbc with `DATABASE_URL`; the in-memory repository can only be explicitly enabled for isolated tests. This project is not HIPAA or GDPR certified and must not be presented as a certified clinical system.
