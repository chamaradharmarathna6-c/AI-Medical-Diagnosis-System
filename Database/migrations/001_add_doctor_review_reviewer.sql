USE AI_Medical_Diagnosis;
GO
IF COL_LENGTH(N'dbo.DoctorReviews', N'ReviewerUserId') IS NULL
BEGIN
    ALTER TABLE dbo.DoctorReviews ADD ReviewerUserId INT NULL;
    ALTER TABLE dbo.DoctorReviews
        ADD CONSTRAINT FK_DoctorReviews_ReviewerUserId
        FOREIGN KEY (ReviewerUserId) REFERENCES dbo.Users(UserId);
END;
GO
