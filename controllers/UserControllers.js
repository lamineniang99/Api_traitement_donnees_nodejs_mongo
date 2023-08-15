
const userModel = require("../models/UserModel")



// La methode qui retourne tous les users 

module.exports.allUsers = async (req, res) =>{
    try{
        const users = await userModel.find()
        return res.status(200).send(users)
    }catch(err){
        console.log(err)
        return res.status(500).send("Une erreur s'est produite lors de la recuperation des données ")
    }
}


// La methode qui retourne un user a travers son id 

module.exports.getUserByUser_ID = async (req, res) => {
    try {
        const idu = parseInt(req.params.id);
        // userModel = new userModel()
        const user = await userModel.findOne({ User_ID: idu });

        if (!user) {
            return res.status(404).send("Utilisateur introuvable");
        }

        return res.status(200).send(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Une erreur s'est produite lors de la récupération des données " + err);
    }
};

// la methode qui retourne tous les users de sexe masculin ou feminin 

module.exports.getUsersByGender = async (req, res) =>{

    try{
        const gender = req.query.gender ; 
        const users = await userModel.find({Gender: gender})
        if(!users){
            return res.status(404).send("les utilisateurs de sexe "+gender+" sont introuvables ")
        }
        console.log(gender)
        return res.status(200).send(users)
    }catch(err){
        console.log(gender)
        res.status(500).send("Une erreur s'est produite lors de le recuperation des users de sexe "+gender+" "+err)
    }
}

// La methode qui supprime un user a travers son ID

module.exports.deleteUserByUser_Id = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleteUser = await userModel.deleteMany({ User_ID: id });
// Lorsque nous utilisez deleteOne, la méthode renvoie un objet contenant une propriété deletedCount,
// qui indique le nombre de documents supprimés. Nous devons vérifier si deleteUser.deletedCount est éga
//l à 0 pour déterminer si l'utilisateur n'a pas été trouvé.
        if (deleteUser.deletedCount === 0) {
            return res.status(404).send("Utilisateur introuvable");
        }

        const message = "Utilisateur supprimé avec succès !!!";
        return res.status(200).send({ message });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Une erreur s'est produite lors de la suppression de l'utilisateur " + err);
    }
};


// La methode qui permet d'ajouter un user 

module.exports.addUser = async (req, res)=>{
    const newUser = new userModel({
        User_ID: req.body.User_ID,
        Gender: req.body.Gender,
        Age: req.body.Age,
        EstimatedSalary: req.body.EstimatedSalary
    })
    try {
        const user = await newUser.save()
        return res.status(201).json(user)
    } catch(err){
        return res.status(400).json({message: err})
    }
}


// La methode qui permet de mettre a jour les données d'un user a travers son id

module.exports.updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const userUpdates = req.body;

  try {
    // Find the user in the database
    const updatedUser = await UserModel.findOneAndUpdate({ User_ID: id }, userUpdates, { new: true });


    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Respond with the updated user data
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur "});
  }
};


// Les requetes d'introgation analytique 

// La methode qui retourne le nombre de document dans notre jeu de donnée 
module.exports.getNbDocument = async (req, res) =>{
    try{
        const length = await userModel.countDocuments()
        res.json({
            message: "Le nombre total des users de notre base de donnée ",
            totalUsers: length,
          });
    }catch(err){
        console.log(err)
        return res.status(500).send("une errur s'est produite lors du comtage ")
    }
}

// la methode qui permet d'avoir la masse salariale de notre jeu de donnée 

module.exports.getTotalSalary = async (req, res) =>{
    const attribut = req.query.attribut

    try{
        const sum = await userModel.aggregate([
            {$group: {_id: null, total : {$sum : `$${attribut}`}}}
        ])

        if (sum.length === 0) {
            res.json({totalSum: 0})
        }else{
            res.json({
                message: "La masse salarial de notre base de donnée",
                totalSum: sum[0].total})
        }
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

// La methode qui retourne le nombres de users masculin et le nombre de user feminin 

module.exports.getNbUserBySexe = async (req, res) =>{
    const gender = req.query.gender

    try{
        const nb = await userModel.countDocuments({Gender: gender})
        res.json({
            message: "Le nombre de users de sexe "+gender ,
            nombre : nb
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}