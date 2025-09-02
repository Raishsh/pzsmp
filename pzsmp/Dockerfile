# Estágio 1: Build da Aplicação com Maven
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Execução da Aplicação
FROM eclipse-temurin:17-jre-alpine 
WORKDIR /app
# Copia o .jar gerado no estágio de build
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]