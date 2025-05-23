# Streamlit App
import streamlit as st

st.title("Relatório Automatizado de Terras Agrícolas")

uploaded_file = st.file_uploader("Faça upload do arquivo KML")
codigo = st.text_input("Ou insira o código da matrícula (INCRA, CAR...)")
ano = st.selectbox("Selecione o ano da análise", list(range(2015, 2024)))

if st.button("Gerar Relatório"):
    st.success("Relatório gerado com sucesso! (simulação)")
    st.download_button("Baixar PDF", data=open("relatorio_terra.pdf", "rb").read(), file_name="relatorio.pdf")