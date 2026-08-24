USE AI_Medical_Diagnosis;
GO
IF COL_LENGTH(N'dbo.Users', N'Role') IS NULL
BEGIN
    ALTER TABLE dbo.Users
        ADD Role NVARCHAR(20) NOT NULL
            CONSTRAINT DF_Users_Role DEFAULT N'Patient' WITH VALUES;
END;
GO
IF NOT EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE parent_object_id = OBJECT_ID(N'dbo.Users')
      AND name = N'CK_Users_Role'
)
BEGIN
    ALTER TABLE dbo.Users
        ADD CONSTRAINT CK_Users_Role
        CHECK (Role IN (N'Patient', N'Doctor', N'Admin'));
END;
GO
