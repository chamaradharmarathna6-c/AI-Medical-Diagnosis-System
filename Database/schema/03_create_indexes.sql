USE AI_Medical_Diagnosis;
GO
CREATE INDEX IX_Predictions_UserId_CreatedAt ON dbo.Predictions(UserId, CreatedAt DESC);
CREATE INDEX IX_Predictions_Disease ON dbo.Predictions(Disease);
CREATE INDEX IX_DoctorReviews_PredictionId ON dbo.DoctorReviews(PredictionId);
CREATE INDEX IX_Symptoms_Disease ON dbo.Symptoms(Disease);
CREATE INDEX IX_Recommendations_Disease_Risk ON dbo.Recommendations(Disease, RiskLevel);
GO
