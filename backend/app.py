# - - - - - - - MEDIA MOVEL - - - - - - -

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "It's Working!"

@app.route('/processar', methods=['POST'])
def processar_dados():
    try:
        dados = request.get_json()
        df = pd.DataFrame(dados)

        # Média Móvel - Sem Nan
        df['ws100'] = df['ws100'].rolling(window=3).mean()
        df = df.dropna(subset=['ws100'])

        # Média Móvel - Com Nan
        # df['ws100'] = df['ws100'].rolling(window=3).mean().fillna(0)

        # Formata os dados como uma lista de arrays
        dados_formatados = [[index + 1, row['ws100']] for index, row in df.iterrows()]

        return jsonify(dados_formatados), 200

    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)


# - - - - - - - HOLT-WINTERS - - - - - - -

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# from statsmodels.tsa.holtwinters import ExponentialSmoothing

# app = Flask(__name__)
# CORS(app)

# @app.route('/processar', methods=['POST'])
# def processar_dados():
#     try:
#         # Obtém os dados enviados no corpo da requisição
#         dados = request.get_json()
#         df = pd.DataFrame(dados)

#         # Verifica se a coluna 'ws100' existe
#         if 'ws100' not in df.columns:
#             return jsonify({"erro": "A coluna 'ws100' não foi encontrada nos dados enviados."}), 400

#         # Aplica o modelo Holt-Winters
#         model = ExponentialSmoothing(df['ws100'], trend='add', seasonal='add', seasonal_periods=12)
#         fit = model.fit()

#         # Previsão para os próximos 12 períodos
#         forecast = fit.forecast(steps=12)

#         # Converte os resultados para JSON
#         resultado = {
#             "dados_originais": df['ws100'].tolist(),
#             "previsao": forecast.tolist()
#         }

#         return jsonify(resultado), 200

#     except Exception as e:
#         return jsonify({"erro": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)


# - - - - - - - WAVELET - - - - - - -
# pip install pywavelets

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import pywt
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# @app.route('/processar', methods=['POST'])
# def processar_dados():
#     try:
#         # Obtém os dados enviados no corpo da requisição
#         dados = request.get_json()
#         df = pd.DataFrame(dados)

#         # Verifica se a coluna 'ws100' existe
#         if 'ws100' not in df.columns:
#             return jsonify({"erro": "A coluna 'ws100' não foi encontrada nos dados enviados."}), 400

#         # Converte a coluna 'ws100' para um array NumPy
#         sinal = df['ws100'].values

#         # Decomposição usando a Wavelet 'db4' (Daubechies 4)
#         coeficientes = pywt.wavedec(sinal, 'db4', level=3)

#         # Elimina os coeficientes de alta frequência (detalhes)
#         coeficientes_filtrados = coeficientes[:]
#         for i in range(1, len(coeficientes)):
#             coeficientes_filtrados[i] = np.zeros_like(coeficientes[i])

#         # Reconstrução do sinal suavizado
#         sinal_suavizado = pywt.waverec(coeficientes_filtrados, 'db4')

#         # Adiciona o sinal suavizado ao DataFrame
#         df['ws100_suavizado'] = sinal_suavizado[:len(df)]  # Garante que o tamanho seja compatível

#         # Converte o DataFrame para JSON
#         resultado = df.to_dict(orient='records')

#         return jsonify({
#             "mensagem": "Suavização com Wavelet realizada com sucesso!",
#             "dados_processados": resultado
#         }), 200

#     except Exception as e:
#         return jsonify({"erro": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)








##########################  TESTES  ###############################


# @app.route('/processar', methods=['POST'])
# def processar_dados():
#     try:

#         dados = request.get_json()
#         df = pd.DataFrame(dados)

#         speed = df['ws100']

#         df['ws100'] = speed.rolling(window=3).mean().fillna(0)

#         media = df.to_dict(orient='records')


#         print("Dados recebidos:", dados)
#         print("Media:", media)

#         # return (dados), 200
#         return jsonify(media), 200

#     except Exception as e:
#         # Retorna uma mensagem de erro em caso de falha
#         return jsonify({"erro": str(e)}), 500





# @app.route('/processar', methods=['POST'])
# def processar_dados():
#     try:

#         dados = request.get_json()
#         df = pd.DataFrame(dados)

#         speed = df['ws100']

#         df['ws100'] = speed.rolling(window=3).mean().fillna(0)

#         # media = df.to_dict(orient='records')

#         media = df.reset_index().to_dict(orient='records')  # Garante que o índice seja incluído
#         dados_formatados = [[index + 1, row['ws100']] for index, row in enumerate(media)]  # Formata como [x, y]
    
#         return jsonify(dados_formatados), 200

#         # print("Dados recebidos:", dados)
#         # print("Media:", media)

#         # return (dados), 200
#         # return jsonify(media), 200

#     except Exception as e:
#         # Retorna uma mensagem de erro em caso de falha
#         return jsonify({"erro": str(e)}), 500








# Rota para processar os dados enviados pelo CSVReader
# @app.route('/processar', methods=['GET', 'POST'])
# def processar_dados():
#     try:
#         # Obtém os dados enviados no corpo da requisição
#         dados = request.get_json()

#         # Aqui você pode processar os dados como quiser
#         # Por exemplo, calcular estatísticas ou salvar em um banco de dados
#         print("Dados recebidos:", dados)

#         # Retorna uma resposta de sucesso
#         return jsonify({"mensagem": "Dados processados com sucesso!", "dados_recebidos": dados}), 200
#     except Exception as e:
#         # Retorna uma mensagem de erro em caso de falha
#         return jsonify({"erro": str(e)}), 500

# Com GET e POST
# @app.route('/processar', methods=['GET', 'POST'])
# def processar_dados():
#     try:
#         if request.method == 'POST':
#             # Obtém os dados enviados no corpo da requisição
#             dados = request.get_json()
            

#             # Aqui você pode processar os dados como quiser
#             print("Dados recebidos:", dados)

#             # Retorna uma resposta de sucesso
#             #return jsonify({"mensagem": "Dados processados com sucesso!", "dados_recebidos": dados}), 200
#             return (dados), 200
#         elif request.method == 'GET':
#             # Retorna uma mensagem padrão para requisições GET
#             return jsonify({"mensagem": "Use POST para enviar dados.", "exemplo": {"chave": "valor"}}), 200

#     except Exception as e:
#         # Retorna uma mensagem de erro em caso de falha
#         return jsonify({"erro": str(e)}), 500

# Media Movel
# @app.route('/processar', methods=['GET', 'POST'])
# def processar_dados():
#     try:
#         if request.method == 'POST':
#             # Obtém os dados enviados no corpo da requisição
#             dados = request.get_json()

#             # Converte os dados em um DataFrame do Pandas
#             df = pd.DataFrame(dados)

#             # Verifica se a coluna de interesse existe
#             if 'valores' not in df.columns:
#                 return jsonify({"erro": "A coluna 'valores' não foi encontrada nos dados enviados."}), 400

#             # Aplica a suavização com média móvel (janela de 3 períodos, por exemplo)
#             df['suavizado'] = df['valores'].rolling(window=3).mean()

#             # Converte o DataFrame de volta para JSON
#             resultado = df.to_dict(orient='records')

#             # Retorna os dados suavizados
#             return jsonify({"mensagem": "Suavização realizada com sucesso!", "dados_suavizados": resultado}), 200

#         elif request.method == 'GET':
#             # Retorna uma mensagem padrão para requisições GET
#             return jsonify({"mensagem": "Use POST para enviar dados.", "exemplo": {"valores": [10, 20, 30, 40, 50]}}), 200

#     except Exception as e:
#         # Retorna uma mensagem de erro em caso de falha
#         return jsonify({"erro": str(e)}), 500

