# Limitations

- The datasets may not represent a target clinical population and model performance is not clinical validation.
- Diabetes contains negative insulin and age values; those are treated as missing.
- The liver header/unit mismatch cannot be resolved safely using the provided file alone.
- Kidney classes are heavily imbalanced; macro metrics in the generated report are important alongside accuracy.
- The bundled API uses an in-memory development repository when no SQL Server repository is configured; restart clears its session users/history. SQL Server schema and actual-data seeds are supplied for deployment.
- Symptom data supports educational context only; overlapping symptoms do not confirm any condition.
