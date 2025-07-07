import re
from difflib import get_close_matches

# Normalización
def normalize_text(text):
    text = text.strip().lower()
    text = re.sub(r'\s+', ' ', text)
    return text

# Corrección ortográfica básica
def correct_spelling(word, dictionary):
    matches = get_close_matches(word, dictionary, n=1, cutoff=0.8)
    return matches[0] if matches else word

# Corrección numérica simple
def correct_numeric(value, min_val, max_val):
    if value < min_val:
        return min_val
    elif value > max_val:
        return max_val
    return value

# Simulación con datos
dictionary = ['seguridad', 'datos', 'protección', 'sistema', 'corrección']
sample_text = "Proteccion de dats y segurdad"
sample_number = -5

normalized = normalize_text(sample_text)
corrected_words = [correct_spelling(w, dictionary) for w in normalized.split()]
corrected_text = ' '.join(corrected_words)
corrected_number = correct_numeric(sample_number, 0, 100)

print("Texto corregido:", corrected_text)
print("Número corregido:", corrected_number)
