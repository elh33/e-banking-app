<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<taglib>
    <taglib-uri>http://java.sun.com/jstl/core</taglib-uri>
    <taglib-location>/WEB-INF/tld/c.tld</taglib-location>
</taglib>

<html>
<head><title>Liste des clients</title></head>
<body>
<h2>Liste des clients</h2>

<table border="1">
    <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>CIN</th>
        <th>Email</th>
        <th>Adresse</th>
        <th>Profession</th>
    </tr>
    <c:forEach var="client" items="${clients}">
        <tr>
            <td>${client.id}</td>
            <td>${client.nom}</td>
            <td>${client.prenom}</td>
            <td>${client.cin}</td>
            <td>${client.email}</td>
            <td>${client.adresse}</td>
            <td>${client.profession}</td>
        </tr>
    </c:forEach>
</table>

</body>
</html>
