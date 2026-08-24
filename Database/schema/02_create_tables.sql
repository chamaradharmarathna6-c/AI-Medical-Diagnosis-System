USE AI_Medical_Diagnosis;
GO
CREATE TABLE dbo.Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(254) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) NOT NULL CONSTRAINT DF_Users_Role DEFAULT N'Patient',
    CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Users_CreatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_Users_Role CHECK (Role IN (N'Patient', N'Doctor', N'Admin'))
);
CREATE TABLE dbo.Predictions (
    PredictionId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.Users(UserId),
    Disease NVARCHAR(50) NOT NULL,
    PredictedLabel NVARCHAR(100) NOT NULL,
    Probability DECIMAL(8,6) NULL,
    RiskLevel NVARCHAR(20) NOT NULL,
    ReviewStatus NVARCHAR(20) NOT NULL CONSTRAINT DF_Predictions_ReviewStatus DEFAULT N'Pending',
    CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Predictions_CreatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_Predictions_ReviewStatus CHECK (ReviewStatus IN (N'Pending', N'Reviewed', N'Approved', N'Rejected'))
);
CREATE TABLE dbo.PredictionDetails (
    PredictionDetailId INT IDENTITY(1,1) PRIMARY KEY,
    PredictionId INT NOT NULL FOREIGN KEY REFERENCES dbo.Predictions(PredictionId),
    InputJson NVARCHAR(MAX) NOT NULL,
    ExplanationJson NVARCHAR(MAX) NULL
);
CREATE TABLE dbo.Doctors (
    DoctorId NVARCHAR(20) PRIMARY KEY,
    DoctorName NVARCHAR(200) NOT NULL,
    Specializes NVARCHAR(200) NOT NULL,
    Disease NVARCHAR(100) NOT NULL,
    Location NVARCHAR(100) NOT NULL
);
CREATE TABLE dbo.Recommendations (
    RecommendationId INT IDENTITY(1,1) PRIMARY KEY,
    Disease NVARCHAR(100) NOT NULL,
    RiskLevel NVARCHAR(30) NOT NULL,
    AgeGroup NVARCHAR(30) NOT NULL,
    DietRecommendation NVARCHAR(MAX) NOT NULL,
    FoodsToInclude NVARCHAR(MAX) NOT NULL,
    FoodsToLimit NVARCHAR(MAX) NOT NULL,
    ExerciseRecommendation NVARCHAR(MAX) NOT NULL,
    WaterRecommendation NVARCHAR(100) NOT NULL,
    LifestyleRecommendation NVARCHAR(MAX) NOT NULL,
    Monitoring NVARCHAR(MAX) NOT NULL,
    Recommendation NVARCHAR(MAX) NOT NULL
);
CREATE TABLE dbo.Symptoms (
    SymptomId INT IDENTITY(1,1) PRIMARY KEY,
    Disease NVARCHAR(100) NOT NULL,
    Symptom NVARCHAR(300) NOT NULL
);
CREATE TABLE dbo.DoctorReviews (
    DoctorReviewId INT IDENTITY(1,1) PRIMARY KEY,
    PredictionId INT NOT NULL FOREIGN KEY REFERENCES dbo.Predictions(PredictionId),
    DoctorId NVARCHAR(20) NULL FOREIGN KEY REFERENCES dbo.Doctors(DoctorId),
    ReviewerUserId INT NULL FOREIGN KEY REFERENCES dbo.Users(UserId),
    Status NVARCHAR(20) NOT NULL,
    Notes NVARCHAR(2000) NOT NULL,
    ReviewedAt DATETIME2 NOT NULL CONSTRAINT DF_DoctorReviews_ReviewedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_DoctorReviews_Status CHECK (Status IN (N'Reviewed', N'Approved', N'Rejected'))
);
CREATE TABLE dbo.PredictionHistory (
    HistoryId INT IDENTITY(1,1) PRIMARY KEY,
    PredictionId INT NOT NULL FOREIGN KEY REFERENCES dbo.Predictions(PredictionId),
    Status NVARCHAR(20) NOT NULL,
    ChangedAt DATETIME2 NOT NULL CONSTRAINT DF_PredictionHistory_ChangedAt DEFAULT SYSUTCDATETIME()
);
GO
