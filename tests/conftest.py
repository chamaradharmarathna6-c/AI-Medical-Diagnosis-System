import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

os.environ["ALLOW_IN_MEMORY_STORE"] = "true"
os.environ["DATABASE_URL"] = ""
os.environ["JWT_SECRET_KEY"] = "test-only-secret-not-for-deployment"

if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
