// implement your API here
const express = require("express");

const HttpFunctions = require("./data/db");

const cors = require("cors");

const server = express();

server.use(cors());

server.use(express.json());

// server.get("/", (req, res) => {
//   res.send({ Hello: "from ya boi" });
// });

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    HttpFunctions.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});

server.get("/api/users", (req, res) => {
  HttpFunctions.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  HttpFunctions.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  HttpFunctions.remove(id)
    .then(deletedUser => {
      if (!deletedUser) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json(deletedUser);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user could not be removed"
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  const updatedUser = req.body;
  const { id } = req.params;
  const { name, bio } = updatedUser;

  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } else if (!id) {
    res.status(404).json({
      message: "The user with the specified ID does not exist."
    });
  } else {
    HttpFunctions.update(id, updatedUser)
      .then(() => {
        res.status(200).json(updatedUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: "The user information could not be modified."
        });
      });
  }
});

server.listen(5000, () =>
  console.log("Server listening on server http://localhost:5000")
);
