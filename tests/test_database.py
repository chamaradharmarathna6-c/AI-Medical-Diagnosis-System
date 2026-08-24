from pathlib import Path


def test_sql_server_scripts_and_real_seed_scripts_exist() -> None:
    root = Path("Database")
    schema = (root / "schema" / "02_create_tables.sql").read_text(encoding="utf-8")
    assert "CREATE TABLE dbo.Users" in schema
    assert "Role NVARCHAR(20) NOT NULL CONSTRAINT DF_Users_Role DEFAULT N'Patient'" in schema
    assert "CK_Users_Role CHECK (Role IN (N'Patient', N'Doctor', N'Admin'))" in schema
    assert "ReviewerUserId INT NULL FOREIGN KEY REFERENCES dbo.Users(UserId)" in schema
    assert (root / "migrations" / "001_add_doctor_review_reviewer.sql").is_file()
    assert (root / "migrations" / "002_add_users_role.sql").is_file()
    assert "INSERT INTO dbo.Doctors" in (root / "seed" / "doctors.sql").read_text(encoding="utf-8")
