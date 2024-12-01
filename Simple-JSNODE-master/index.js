const express = require('express');
const app = express();

const port = 3001;
const users = [
	{ id: 1, firstName: 'Jules', lastName: 'Baclet', role: 'admin' },
	{ id: 2, firstName: 'Enzo', lastName: 'Levoy', role: 'user' },
	{ id: 3, firstName: 'Bob', lastName: 'Chaos', role: 'moderator' },
	{ id: 4, firstName: 'Rayan', lastName: 'Iya', role: 'user' },
	{ id: 5, firstName: 'Charlie', lastName: 'Davis', role: 'admin' }
];
app.use(express.json());

/*app.get("/", (req, res) => {
    res.json({
        msg: "hello REST API"
        
    })
})
*/

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id); // Récupérer l'ID de l'utilisateur dans l'URL

    // Vérifier si l'ID est valide
    if (isNaN(id)) {
        return res.status(400).json({ msg: "ID invalide" });
    }

    // Trouver l'index de l'utilisateur avec l'ID
    const userIndex = users.findIndex((user) => user.id === id);

    // Vérifier si l'utilisateur existe
    if (userIndex < 0) {
        return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Si l'utilisateur est trouvé, renvoyer les informations de l'utilisateur
    res.json(users[userIndex]);
});

// POST : CRÉER un nouvel utilisateur, basé sur les données passées dans le corps(body) de la requête
app.post("/", (req, res) => {
	// récupérer toutes les données qui arrivent dans le corps de la requête (body)
	const { firstName, lastName } = req.body

	// récupérer l'ID du dernier utilisateur en fonction du nombre d'utilisateurs dans notre variable de tableau 'users'.
	const lastId = users[users.length - 1].id
	// ajouter un pour créer un utilisateur unique
	const newId = lastId + 1

	// créer le nouvel utilisateur avec les données du corps de la requête et l'ID calculé
	const newUser = {
		firstName,
		lastName,
		id: newId,
	}

	// ajouter le nouvel utilisateur à notre liste d'utilisateurs en utilisant la méthode 'push'
	users.push(newUser)
	// envoyer le code de statut 201 (créé) et les données du nouvel utilisateur afin de confirmer au client.
	res.status(201).json(newUser)
})

app.post("/", (req, res) => {
    console.log(req.body);
    
	res.json({
		msg: "ici le post !!!",
	})
})

app.post("/:id", (req, res) => { //Cela signifie que j'accepte un paramètre appelé 'id'
    /// etc
    })
    
    app.put("/users/:id", (req, res) => {
        // récupérer les données du corps de la requête
        const { firstName, lastName } = req.body;
        const id = parseInt(req.params.id); // Récupérer l'ID depuis l'URL
        
        // Vérifier si l'ID est valide
        if (isNaN(id)) {
            return res.status(400).json({ msg: "ID invalide" });
        }
    
        // Trouver l'utilisateur par ID
        const userIndex = users.findIndex((user) => user.id === id);
    
        // Vérifier si l'utilisateur existe
        if (userIndex < 0) {
            return res.status(404).json({ msg: "Utilisateur non trouvé" });
        }
    
        // Mettre à jour les données de l'utilisateur
        if (firstName) users[userIndex].firstName = firstName;
        if (lastName) users[userIndex].lastName = lastName;
    
        // Retourner la réponse avec l'utilisateur mis à jour
        res.json({
            msg: "Utilisateur mis à jour",
            user: users[userIndex],
        });
    });
    
   /* res.json({
        msg: "hello REST API ici le PUT"
    })
    */    


    app.delete("/users/:id", (req, res) => {
        const id = parseInt(req.params.id); // Récupérer l'ID de l'utilisateur dans l'URL
    
        // Vérifier si l'ID est valide
        if (isNaN(id)) {
            return res.status(400).json({ msg: "ID invalide" });
        }
    
        // Trouver l'index de l'utilisateur avec l'ID
        const userIndex = users.findIndex((user) => user.id === id);
    
        // Vérifier si l'utilisateur existe
        if (userIndex < 0) {
            return res.status(404).json({ msg: "Utilisateur non trouvé" });
        }
    
        // Supprimer l'utilisateur du tableau
        users.splice(userIndex, 1);
    
        // Réponse après suppression
        res.json({
            msg: "Utilisateur supprimé",
        });
    });
    
    /*
    res.json({
        msg: "hello REST API ici le DELETE"
    })
    */


app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});