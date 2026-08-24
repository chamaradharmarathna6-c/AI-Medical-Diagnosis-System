from __future__ import annotations

from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Datasets"
OUT = ROOT / "Database" / "seed"


def sql_text(value: object) -> str:
    return "N'" + str(value).replace("'", "''") + "'"


def write_seed(
    filename: str, table: str, frame: pd.DataFrame, source_columns: list[str], sql_columns: list[str]
) -> None:
    statements = ["USE AI_Medical_Diagnosis;", "GO"]
    column_list = ", ".join(f"[{column}]" for column in sql_columns)
    for row in frame[source_columns].itertuples(index=False, name=None):
        values = ", ".join(sql_text(value) for value in row)
        statements.append(f"INSERT INTO dbo.{table} ({column_list}) VALUES ({values});")
    statements.append("GO")
    (OUT / filename).write_text("\n".join(statements) + "\n", encoding="utf-8")


def main() -> None:
    write_seed(
        "doctors.sql",
        "Doctors",
        pd.read_excel(SOURCE / "Doctors.xlsx"),
        ["Doctor_ID", "Doctor_Name", "Specializes", "disease", "Location"],
        ["DoctorId", "DoctorName", "Specializes", "Disease", "Location"],
    )
    write_seed(
        "symptoms.sql", "Symptoms", pd.read_excel(SOURCE / "symptoms.xlsx"),
        ["Disease", "Symptoms"], ["Disease", "Symptom"]
    )
    recommendations = pd.read_excel(SOURCE / "Health recommendation.xlsx")
    write_seed(
        "recommendations.sql",
        "Recommendations",
        recommendations,
        [
            "Disease", "Risk_Level", "Age_Group", "Diet_Recommendation", "Foods_To_Include",
            "Foods_To_Limit", "Exercise_Recommendation", "Water_Recommendation (Liters)",
            "Lifestyle_Recommendation", "Monitoring", "Recommendation",
        ],
        [
            "Disease", "RiskLevel", "AgeGroup", "DietRecommendation", "FoodsToInclude",
            "FoodsToLimit", "ExerciseRecommendation", "WaterRecommendation",
            "LifestyleRecommendation", "Monitoring", "Recommendation",
        ],
    )


if __name__ == "__main__":
    main()
