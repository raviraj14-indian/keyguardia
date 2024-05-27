// credentialController.js
const Credential = require("../models/credentialModel");
const { encrypt, decrypt } = require("../utils/encryptionHandler");
// const ObjectId = require("mongodb").ObjectId;

// Get all saved credentials for the logged-in user
exports.getAllCredentials = async (req, res) => {
  try {
    const data = await Credential.find({ userId: req.body.user._id });
    let credentials = [];
    data.forEach((item) => {
      const credential = decrypt({
        encryptedUsername: item.encryptedUsername,
        encryptedPassword: item.encryptedPassword,
        ivString: item.ivString,
      });
      credentials.push({
        ...credential,
        _id: item._id.toString(),
        serviceName: item.serviceName,
        serviceUrl: item.serviceUrl,
      });
    });
    res.status(200).json(credentials);
  } catch (error) {
    console.error("Get all credentials error:", error);
    res.status(500).json({ message: "Failed to get credentials" });
  }
};

// Add a new credential for the user
exports.addCredential = async (req, res) => {
  const { serviceName, serviceUrl, username, password, user } = req.body;
  console.log(serviceName, serviceUrl, username, password, user._id);
  try {
    const { encryptedUsername, encryptedPassword, ivString } = encrypt({
      username,
      password,
    });
    const newCredential = new Credential({
      // userId: userId.toString(),
      userId: user._id,
      serviceName,
      serviceUrl,
      encryptedUsername,
      encryptedPassword,
      ivString,
    });
    await newCredential.save();
    res.status(201).json({ message: "Credential added successfully" });
  } catch (error) {
    console.error("Add credential error:", error);
    res.status(500).json({ message: "Failed to add credential" });
  }
};

// Update an existing credential
exports.updateCredential = async (req, res) => {
  const { serviceName, serviceUrl, username, password } = req.body;
  const credentialId = req.params.id;
  const { encryptedUsername, encryptedPassword, ivString } = encrypt({
    username,
    password,
  });
  try {
    const updatedCredential = await Credential.findByIdAndUpdate(
      credentialId,
      {
        serviceName,
        serviceUrl,
        encryptedUsername,
        encryptedPassword,
      },
      { new: true }
    );
    if (!updatedCredential) {
      return res.status(404).json({ message: "Credential not found" });
    }
    res.status(200).json({ message: "Credential updated successfully" });
  } catch (error) {
    console.error("Update credential error:", error);
    res.status(500).json({ message: "Failed to update credential" });
  }
};

// Delete a credential
exports.deleteCredential = async (req, res) => {
  const credentialId = req.params.id;

  try {
    const deletedCredential = await Credential.findByIdAndDelete(credentialId);
    if (!deletedCredential) {
      return res.status(404).json({ message: "Credential not found" });
    }
    res.status(200).json({ message: "Credential deleted successfully" });
  } catch (error) {
    console.error("Delete credential error:", error);
    res.status(500).json({ message: "Failed to delete credential" });
  }
};

// Delete all saved credentials for the logged-in user
exports.purgeCredentials = async (req, res) => {
  console.log("Purging");
  console.log(req.body);
  try {
    await Credential.deleteMany({ userId: req.body.user._id });
    res.status(200).json({ message: "All credentials deleted successfully" });
  } catch (error) {
    console.error("Purge credentials error:", error);
    res.status(500).json({ message: "Failed to purge credentials" });
  }
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// const Credential = require("../models/credentialModel.js");

// // Controller methods for website credentials
// const createCredential = async (req, res) => {
//   try {
//     const { website, username, password } = req.body;
//     console.log(website, username, password);
//     const newCredential = await Credential.create({
//       userId: req.user._id, // Assuming authenticated user's ID is available in req.user
//       website,
//       username,
//       password,
//     });
//     if (!newCredential) {
//       return res
//         .status(404)
//         .json({ message: "Unable to Save Credantials", success: false });
//     }
//     res.status(201).json(newCredential);
//   } catch (error) {
//     res.status(500).json({
//       // message: "Internal server error"
//       error,
//       success: false,
//     });
//   }
// };

// const getAllCredentials = async (req, res) => {
//   try {
//     const credentials = await Credential.find({
//       userId: req.user._id,
//     });
//     res.json(credentials);
//     if (!credentials) {
//       return res
//         .status(404)
//         .json({ message: "No Credentials found", success: false });
//     }
//   } catch (error) {
//     res.status(500).json({
//       // message: "Internal server error"
//       error,
//       success: false,
//     });
//   }
// };

// const getCredentialById = async (req, res) => {
//   try {
//     const credential = await Credential.findOne({
//       _id: req.params.id,
//       userId: req.user._id,
//     });
//     if (!credential) {
//       return res
//         .status(404)
//         .json({ message: "Credential not found", success: false });
//     }
//     res.json(credential);
//   } catch (error) {
//     res.status(500).json({
//       // message: "Internal server error"
//       error,
//       success: false,
//     });
//   }
// };

// const updateCredential = async (req, res) => {
//   try {
//     const { website, username, password } = req.body;
//     const updatedCredential = await Credential.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user._id },
//       { website, username, password },
//       { new: true }
//     );
//     if (!updatedCredential) {
//       return res
//         .status(404)
//         .json({ message: "Credential not found", success: false });
//     }
//     res.json(updatedCredential);
//   } catch (error) {
//     res.status(500).json({
//       // message: "Internal server error"
//       error,
//       success: false,
//     });
//   }
// };

// const deleteCredential = async (req, res) => {
//   try {
//     const deletedCredential = await Credential.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user._id,
//     });
//     if (!deletedCredential) {
//       return res
//         .status(404)
//         .json({ message: "Credential not found", success: false });
//     }
//     res.json({ message: "Credential deleted successfully" });
//   } catch (error) {
//     res.status(500).json({
//       // message: "Internal server error"
//       error,
//       success: false,
//     });
//   }
// };

// const purgeAllCredentials = async (req, res) => {
//   try {
//     // Delete all website credentials associated with the authenticated user
//     await Credential.deleteMany({ userId: req.user._id });
//     res.json({ message: "All stored credentials purged successfully" });
//   } catch (error) {
//     res.status(500).json({
//       // message: "Internal server error"
//       error,
//       success: false,
//     });
//   }
// };

// module.exports = {
//   createCredential,
//   getAllCredentials,
//   getCredentialById,
//   updateCredential,
//   deleteCredential,
//   purgeAllCredentials,
// };
