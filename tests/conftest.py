import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
os.environ.setdefault("ALLOW_IN_MEMORY_STORE", "true")
os.environ.setdefault("JWT_SECRET_KEY", "test-only-secret-not-for-deployment")
os.environ.pop("DATABASE_URL", None)
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
