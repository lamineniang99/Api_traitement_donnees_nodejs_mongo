const router = require('express').Router()

const {allUsers, getUserByUser_ID, deleteUserByUser_Id, addUser, updateUser, getUsersByGender, getNbDocument, getTotalSalary, getNbUserBySexe} = require("../controllers/UserControllers")

// Le end-point qui renvoie tous les users 
router.get("/api/users", allUsers)

// Le end-pont qui renvoie un user a travers son ID
router.get("/api/users/id/:id", getUserByUser_ID)

// Le endpoint qui renvoie les users de sexe masculin ou feminin 
router.get("api/users/genre", getUsersByGender)

// Le end-point qui permet de supprimer un user a travers son ID
router.delete("/api/users/:id", deleteUserByUser_Id)


//Le end-point qui permet d'ajouter un user 
router.post("/api/users/add", addUser)

// Le end-point qui permet de mettre a jour user a travers on id 

router.put("/api/users/:id", updateUser)


//Le end-point qui nous retourne la taille de notre jeu de donnée
router.get("/api/users/stats/total", getNbDocument)

// Le end-point qui nous renvoie la masse salarial 

router.get("/api/users/stats/sum", getTotalSalary)

// le end-point qui retourne le nombre d'utilisateur par sexe 
router.get('/api/users/stats/count', getNbUserBySexe)


module.exports = router
