# Use a imagem oficial do Node.js como base
FROM node:14

# Instale o Vue CLI globalmente
RUN npm install -g @vue/cli

# Exponha a porta 8080 (opcional, dependendo das necessidades do seu projeto)
EXPOSE 8080

# Defina o diretório de trabalho padrão
WORKDIR /projeto

# Comando de entrada padrão para iniciar o Vue CLI
CMD ["vue", "--version"]

