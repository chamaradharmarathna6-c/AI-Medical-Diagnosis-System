from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine

from API.config.settings import DATABASE_URL


def create_sql_server_engine() -> Engine:
    
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL must be configured for the SQL Server runtime.")
    if not DATABASE_URL.lower().startswith("mssql+pyodbc://"):
        raise RuntimeError("DATABASE_URL must use the mssql+pyodbc SQL Server dialect.")
    return create_engine(DATABASE_URL, pool_pre_ping=True, future=True)
