from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any

import joblib

from API.config.settings import MODELS_DIR


@lru_cache(maxsize=4)
def load_model(disease: str) -> dict[str, Any]:
    path = Path(MODELS_DIR) / disease / f"{disease}_pipeline.pkl"
    if not path.is_file():
        raise FileNotFoundError(f"Local {disease} model artifact is missing. Run python -m AI.train_models.")
    return joblib.load(path)
