<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<html>
<head>
    <title>Créer un client</title>
</head>
<body>
<h2>Formulaire de création d’un client</h2>


<%--@elvariable id="client" type="org.example.backend.Model"--%>
<form:form method="POST" modelAttribute="client" action="${pageContext.request.contextPath}/agent/create-client">
    <label>Nom :</label>
    <form:input path="nom" /><br/>

    <label>Prénom :</label>
    <form:input path="prenom" /><br/>

    <label>Email :</label>
    <form:input path="email" /><br/>

    <label>CIN :</label>
    <form:input path="cin" /><br/>

    <label>Téléphone :</label>
    <form:input path="telephone" /><br/>

    <label>Mot de passe :</label>
    <form:password path="motDePasse" /><br/>

    <input type="submit" value="Créer le client" />
</form:form>
</body>
</html>
