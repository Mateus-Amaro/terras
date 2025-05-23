# Colab Notebook - Geração de Gráficos e PDF
import matplotlib.pyplot as plt
import pandas as pd
from fpdf import FPDF
import os

# Simulação: leitura dos dados exportados (NDVI, área, etc.)
# Exemplo:
df = pd.read_csv("ndvi_summary.csv")

# Geração de gráfico de NDVI
plt.plot(df['date'], df['ndvi'])
plt.title("Evolução NDVI")
plt.xlabel("Data")
plt.ylabel("NDVI")
plt.savefig("ndvi_plot.png")

# Geração do PDF com fpdf
pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", "B", 16)
pdf.cell(200, 10, txt="Relatório Automatizado de Terras", ln=True, align='C')
pdf.image("ndvi_plot.png", x=10, y=30, w=180)
pdf.output("relatorio_terra.pdf")