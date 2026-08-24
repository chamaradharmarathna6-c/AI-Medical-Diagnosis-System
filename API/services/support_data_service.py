from __future__ import annotations

import pandas as pd

from API.config.settings import DATASETS_DIR


def doctors(disease: str | None = None) -> list[dict[str, object]]:
    frame = pd.read_excel(DATASETS_DIR / "Doctors.xlsx")
    if disease:
        frame = frame[frame["disease"].str.casefold() == disease.casefold()]
    return frame.to_dict(orient="records")


def recommendations(disease: str | None = None, risk_level: str | None = None) -> list[dict[str, object]]:
    frame = pd.read_excel(DATASETS_DIR / "Health recommendation.xlsx")
    if disease:
        frame = frame[frame["Disease"].str.casefold() == disease.casefold()]
    if risk_level:
        frame = frame[frame["Risk_Level"].str.casefold() == risk_level.casefold()]
    return frame.to_dict(orient="records")
