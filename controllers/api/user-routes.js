const router = require('express').Router();
const User = require('../../models/User');
const { awaitWithCatch } = require('../../utils/controllerUtils');

const invalidBodyMessage = 'Invalid user data in request body';

// =====================================================
// Get all Users
// =====================================================
router.get('/', async (req, res) => {
  // Request all Users
  const { result, code } = await awaitWithCatch(
    User.find()
    .populate('thoughts')
    .populate('friends')
    .select(['-__v'])
  );

  // Send results
  res.status(code).send(result);
});

// =====================================================
// Get User by Id
// =====================================================
router.get('/:userId', async (req, res) => {
  // Request single User by Id
  const { result, code } = await awaitWithCatch(User.find(
    {
      _id: req.params.userId
    }
  )
  .populate('thoughts')
  .populate('friends')
  .select(['-__v'])
  )

  // Send results
  res.status(code).send(result);
})

// =====================================================
// Update specific user by Id
// =====================================================
router.put('/:userId', async (req, res) => {

  // Check that at least one property is present, else return error
  const { username, email, thoughts } = req.body;

  if(!username && !email && !thoughts){
    res.status(500).json({ message: invalidBodyMessage });
  }

  // Build updater object
  const updater = {}

  if(username){ updater.username = username; }
  if(email){ updater.email = email; }
  if(thoughts){ updater.thoughts = thoughts; }

  // Attempt Update
  const { result, code } = await awaitWithCatch(User.findOneAndUpdate(
    { _id: req.params.userId },
    updater,
    {new: true}
  ))

  // Send results
  res.status(code).json(result);
})

// =====================================================
// Create User from POST body
// =====================================================
router.post('/', async (req, res) => {
  
  // Extract user data parameters and validate
  const { username, email } = req.body;
  
  if(!username || !email){
    res.status(400).json(
      { message: invalidBodyMessage }
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

// =====================================================
// Add User to Friend List
// =====================================================
router.post('/:userId/friends/:friendId', async (req, res) => {
  
  // Attempt User creation
  const userQueryResult = await awaitWithCatch(
    User.findOne({ _id: req.params.userId }
  ));

  // Send error response if query failed
  if(userQueryResult.code >= 300){
    res.status(userQueryResult.code).json(userQueryResult.result);
  }

  // Add friend Id to user's friends array
  const user = userQueryResult.result;

  user.friends.push(req.params.friendId);
  await user.save();

  // Send response
  res.status(201).json(user);
})

// =====================================================
// Delete single User by Id
// =====================================================
router.delete('/:userId', async (req, res) => {
  // Attempt User delete
  const userQueryResult = await awaitWithCatch(User.findOne(
    { _id: req.params.userId }
  ));

  if(userQueryResult.code >= 300){
    res.status(userQueryResult.code).json(userQueryResult.result);
  }

  const user = userQueryResult.result;

  await user.deleteOne();

  // Send response
  res.status(200).send();
})

// =====================================================
// Delete friend from User's friends list
// =====================================================
router.delete('/:userId/friends/:friendId', async (req, res) => {
  // Attempt User delete
  const userQueryResult = await awaitWithCatch(
    User.findOne({ _id: req.params.userId })
    .populate('friends')
  );

  // Return error message if error occurred
  if(userQueryResult.code >= 300){
    res.status(userQueryResult.code).json(userQueryResult.result);
  }

  // Pull friend Id from User's friend list
  const user = userQueryResult.result;

  user.friends.pull(req.params.friendId);
  await user.save()

  // Send response
  res.status(200).json(user);
})

module.exports = router;