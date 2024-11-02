const router = require('express').Router();
const User = require('../../models/User');
const { awaitWithCatch } = require('../../utils/controllerUtils');

// Request all User documents
router.get('/', async (req, res) => {
  const { result, code } = await awaitWithCatch(User.find({}));

  res.status(code).send(result);
})

// Create User from POST body
router.post('/', async (req, res) => {
  
  // Extract user data parameters and validate
  const { username, email } = req.body;
  
  if(!username || !email){
    res.status(400).json(
      { message: 'Invalid user data in POST request body'}
    )
  }

  // Attempt User creation
  const { result, code } = await awaitWithCatch(
    User.create(
      {
        username: username,
        email: email
      }
  ));

  // Send response
  res.status(code).json(result);
})

module.exports = router;