const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // resolvers accept four arguments (in this order)
        // 1. parent - references the parent resolver in a series of nested resolvers
        // 2. args - an object of all values passed into a query
        // 3. context - useful if we need the same data to be accessed by all resolvers
        // 4. info - extra info on a operation's current state
        thoughts: async (parent, { username }) => {
            // check if the username exists and store it in params
            const params = username ? { username } : {};
            // filter by the params
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // find user by name
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        }
    }
}

module.exports = resolvers;