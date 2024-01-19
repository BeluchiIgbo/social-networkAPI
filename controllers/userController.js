const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: `issue getting User` });
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res
          .status(404)
          .json({ message: `User not found with ID Number` });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: `User not found with ID` });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: `User not found with ID Number` });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: `User update invalid by ID` });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: `User cannot be created` });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res
          .status(404)
          .json({ message: `User not found with ID Number` });
      }
      res.json({ message: `User deleted` });
    } catch (error) {
      res.status(500).json({ message: `User cannot be deleted` });
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId || req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: `User not found with ID Number` });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: `Friend cannot be added to User` });
    }
  },

  async deleteFriend({params}, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: `User not found with ID Number` });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: `Friend cannot be removed from User` });
    }
  },
};